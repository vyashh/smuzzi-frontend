import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { HomeTile } from "constants/global";

interface LikesState {
  isFetching: boolean;
  error: string | null;
  tiles: ReadonlyArray<HomeTile> | null;
  fetchHome: () => Promise<void>;
  setStartPlay: () => Promise<void>;
  setEndPlay: () => Promise<void>;
}

export const useHomePlaybackStore: UseBoundStore<StoreApi<LikesState>> =
  create<LikesState>()(
    persist<LikesState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        tiles: null,
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
              tiles: data["tiles"],
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
