import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

export const useAuthStore = create(
  persist(
    (set) => ({
      // auth setup
      isLoggedIn: false,
      shouldCreateAccount: false,
      authToken: "",

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
      logIn: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
          };
        });
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
