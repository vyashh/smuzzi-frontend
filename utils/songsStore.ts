import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types/song";

interface SongsState {
  isFetching: boolean;
  error: string | null;
  songs: Array<Song>;
  fetchSongs: () => Promise<void>;
  setSongs: (s: Array<Song>) => void;
  setStartPlay: () => Promise<void>;
  setEndPlay: () => Promise<void>;
  clear: () => void;
}

export const useSongsStore: UseBoundStore<StoreApi<SongsState>> =
  create<SongsState>()(
    persist<SongsState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        songs: [] as Array<Song>,
        setSongs: (s) => set({ songs: s }),
        clear: () => set({ songs: [], error: null }),
        fetchSongs: async () => {
          if (get().isFetching) return;

          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();
          console.log(
            `songstore() logging onto server: ${serverUrl} with ${accessToken}`
          );

          try {
            const { data } = await axios.get(`${serverUrl}/api/songs`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            set({
              songs: toSongs(data),
              isFetching: false,
            });
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        setStartPlay: async () => {
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
        setEndPlay: async () => {},
      }),
      {
        name: "songs-store-v2",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (s) => ({ songs: s.songs } as unknown as SongsState),
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          state.isFetching = false;
          state.error = null;
        },
      }
    )
  );
