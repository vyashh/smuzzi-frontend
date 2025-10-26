import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { toUser, User } from "types/user";

export interface AuthStoreState {
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  accessToken: string;
  username: string;
  password: string;
  user: User | null;

  serverSelected: boolean;
  serverUrl: string;

  setServerUrl: (url: string) => void;
  selectServer: () => void;

  logIn: () => Promise<void>;
  logOut: () => void;

  getUserData: () => Promise<void>;

  error: string | null;
}

type AuthPersisted = Pick<
  AuthStoreState,
  "isLoggedIn" | "accessToken" | "serverUrl" | "serverSelected" | "user"
>;

export const useAuthStore: UseBoundStore<StoreApi<AuthStoreState>> =
  create<AuthStoreState>()(
    persist(
      (set, get) => ({
        isLoggedIn: false,
        shouldCreateAccount: false,
        accessToken: "",
        username: "vyash",
        user: null,
        password: "password",

        serverSelected: false,
        serverUrl: "Enter server url",

        setServerUrl: (url) => set({ serverUrl: url }),
        selectServer: () =>
          set((state) => ({ ...state, serverSelected: true })),

        error: null,

        logIn: async () => {
          const { serverUrl, username, password } = get();
          try {
            const { data } = await axios.post(`${serverUrl}/api/login`, {
              username,
              password,
            });
            set((state) => ({
              ...state,
              isLoggedIn: true,
              accessToken: data?.access_token ?? "",
              error: null,
            }));
          } catch (e: unknown) {
            const message =
              e instanceof AxiosError
                ? e.message
                : e instanceof Error
                ? e.message
                : "Login failed";
            set({ isLoggedIn: false, error: `loginError: ${message}` });
            console.log(`loginError: ${message}`);
          }
        },

        logOut: () =>
          set((state) => ({
            ...state,
            isLoggedIn: false,
            accessToken: "",
            serverUrl: "",
            serverSelected: false,
          })),
        getUserData: async () => {
          const { serverUrl, accessToken } = get();
          try {
            const { data } = await axios.get(`${serverUrl}/api/users/me`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            set((state) => ({
              ...state,
              user: toUser(data),
              error: null,
            }));
          } catch (e: unknown) {
            const message =
              e instanceof AxiosError
                ? e.message
                : e instanceof Error
                ? e.message
                : "Login failed";
            set((s) => ({ ...s, error: `getUserDataError: ${message}` }));
            console.log(`getUserDataError: ${message}`);
          }
        },
      }),

      {
        name: "auth-store-v1",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state): AuthPersisted => ({
          isLoggedIn: state.isLoggedIn,
          accessToken: state.accessToken,
          serverUrl: state.serverUrl,
          serverSelected: state.serverSelected,
          user: state.user,
        }),
      }
    )
  );
