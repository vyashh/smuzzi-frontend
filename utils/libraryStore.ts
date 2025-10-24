import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { HomeTile } from "constants/global";

interface LibraryState {
  isFetching: boolean;
  error: string | null;
  status: { message: string; added: number } | null;
  fetchLibrary: () => Promise<void>;
}

export const useLibraryStore: UseBoundStore<StoreApi<LibraryState>> =
  create<LibraryState>()(
    persist<LibraryState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        status: null,
        fetchLibrary: async () => {
          if (get().isFetching) return;

          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            const { data } = await axios.post(
              `${serverUrl}/api/folders/1/rescan`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            set({
              status: { message: data?.message, added: data?.added },
              isFetching: false,
            });
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({
              isFetching: false,
              status: { message: "", added: 0 },
            });
          }
        },
      }),
      {
        name: "library-store-v1",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );
