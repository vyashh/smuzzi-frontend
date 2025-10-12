import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types/song";

interface LikesState {
  isFetching: boolean;
  error: string | null;
  fetchHome: () => Promise<void>;
  setStartPlay: () => Promise<void>;
  setEndPlay: () => Promise<void>;
}

export const useLikeStore: UseBoundStore<StoreApi<LikesState>> =
  create<LikesState>()(
    persist<LikesState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        fetchHome: async () => {
          if (get().isFetching) return;

          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            const { data } = await axios.get(`${serverUrl}/api/home`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            set({
              isFetching: false,
            });
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        setStartPlay: async () => {},
        setEndPlay: async () => {},
      }),
      { name: "home-store-v1", storage: createJSONStorage(() => AsyncStorage) }
    )
  );
