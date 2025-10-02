import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types/song";

interface LikesState {
  isFetching: boolean;
  error: string | null;
  likedSongs: ReadonlyArray<Song>;
  fetchLikes: () => Promise<void>;
  postLikedSong: (trackId: number) => Promise<void>;
  setSongs: (s: ReadonlyArray<Song>) => void;
}

export const useLikeStore: UseBoundStore<StoreApi<LikesState>> =
  create<LikesState>()(
    persist<LikesState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        likedSongs: [] as ReadonlyArray<Song>,
        setSongs: (s) => set({ likedSongs: s }),
        fetchLikes: async () => {
          if (get().isFetching) return;

          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            const { data } = await axios.get(`${serverUrl}/api/songs/liked`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            set({
              likedSongs: toSongs(data),
              isFetching: false,
            });
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        postLikedSong: async (trackId) => {
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            await axios
              .post(`${serverUrl}/api/songs/${trackId}/like`, null, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then(() => get().fetchLikes());
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : String(error),
            });
          } finally {
            set({ isFetching: false });
          }
        },
      }),
      { name: "likes-store-v2", storage: createJSONStorage(() => AsyncStorage) }
    )
  );
