import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";
import axios from "axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // auth setup
      isLoggedIn: false,
      shouldCreateAccount: false,
      accessToken: "",
      username: "",
      password: "",

      // auth - handlers -- server selection
      serverSelected: false,
      serverUrl: "Enter server url",
      setServerUrl: (url) => set({ serverUrl: url }),
      selectServer: () => {
        set((state) => {
          return {
            ...state,
            serverSelected: true,
          };
        });
      },
      // auth - handlers -- defaults
      logIn: async () => {
        const { serverUrl } = get();
        try {
          return await axios
            .post(`${serverUrl}/api/login`, {
              username: "vyash",
              password: "password",
            })
            .then((res) => {
              set((state) => {
                return {
                  ...state,
                  isLoggedIn: true,
                  accessToken: res.data.access_token,
                };
              });
            });
        } catch (error) {
          console.log(error);
        }
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
            serverUrl: "",
            serverSelected: false,
          };
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
