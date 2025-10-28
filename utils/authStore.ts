import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { toUser, User } from "types/user";

export interface AuthStoreState {
  isFetching: boolean;
  isLoggedIn: boolean;
  accessToken: string;
  username: string;
  password: string;
  user: User | null;

  serverSelected: boolean;
  serverUrl: string;

  setServerUrl: (url: string) => void;
  selectServer: () => void;

  signUp: () => Promise<void>;
  logIn: () => Promise<void>;
  logOut: () => void;

  getUserData: () => Promise<void>;

  setUserPassword: (newPassword: string) => Promise<void>;

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
        isFetching: false,
        isLoggedIn: false,
        accessToken: "",
        username: "vyash",
        user: null,
        password: "HsLeiden2025!",

        serverSelected: false,
        serverUrl: "Enter server url",

        setServerUrl: (url) => set({ serverUrl: url }),
        selectServer: () =>
          set((state) => ({ ...state, serverSelected: true })),

        error: null,

        signUp: async () => {
          console.log("signUp AuthStore();");
          const { serverUrl, username, password, logIn, getUserData } = get();
          set({ isFetching: true, error: null });

          try {
            await axios.post(`${serverUrl}/api/register`, {
              username,
              password,
            });

            await logIn();

            await getUserData();
          } catch (e: unknown) {
            const message =
              e instanceof AxiosError
                ? e.message
                : e instanceof Error
                ? e.message
                : "Sign up failed";
            set({ isLoggedIn: false, error: `signupError: ${message}` });
            console.log(`signupError: ${message}`);
          } finally {
            set({ isFetching: false });
          }
        },

        logIn: async () => {
          const { serverUrl, username, password } = get();
          set({ isFetching: true, error: null });

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
            set({
              isLoggedIn: false,
              isFetching: false,
              error: `loginError: ${message}`,
            });
            console.log(`loginError: ${message}`);
            throw new Error(message);
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
        setUserPassword: async (newPassword: string) => {
          set({ isFetching: true, error: null });

          const { serverUrl, accessToken, password } = get();

          const req = { current_password: password, new_password: newPassword };

          console.log(req);

          try {
            await axios.patch(`${serverUrl}/api/users/me/password`, req, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            set({
              isFetching: false,
              error: null,
              password: newPassword,
            });
            set({ isFetching: false, error: null });
          } catch (e: unknown) {
            const message =
              e instanceof AxiosError
                ? e.message
                : e instanceof Error
                ? e.message
                : "Failed to update password. Please try again.";
            set({
              isFetching: false,
              error: `Failed to set password: ${message}`,
            });
            console.log(`setUserPassword(): ${message}`);
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
