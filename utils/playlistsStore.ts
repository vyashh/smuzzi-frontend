import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types";
import { Playlist, toPlaylists } from "types/playlist";

interface PlaylistsStore {
  isFetching: boolean;
  error: string | null;
  playlists: ReadonlyArray<Playlist>;
  fetchPlaylists: () => Promise<void>;
  postPlaylist: (playlist: Playlist) => Promise<void>;
  deletePlaylist: (playlistId: number) => Promise<void>;
  setPlaylists: (p: ReadonlyArray<Playlist>) => void;
}

export const usePlaylistsStore: UseBoundStore<StoreApi<PlaylistsStore>> =
  create<PlaylistsStore>()(
    persist<PlaylistsStore>(
      (set, get) => ({
        isFetching: false,
        error: null,
        playlists: [] as ReadonlyArray<Playlist>,
        setPlaylists: (p) => set({ playlists: p }),
        fetchPlaylists: async () => {
          if (get().isFetching) return;

          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            const { data } = await axios.get(`${serverUrl}/api/playlists`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            set({
              playlists: toPlaylists(data),
              isFetching: false,
            });
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        postPlaylist: async (playlist) => {
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            await axios.post(`${serverUrl}/api/playlists`, playlist, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            set({ isFetching: false });
            await get().fetchPlaylists();
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        deletePlaylist: async (playlistId) => {
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            await axios.delete(`${serverUrl}/api/playlists/${playlistId}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            set({ isFetching: false });
            await get().fetchPlaylists();
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
      }),
      { name: "likes-store-v2", storage: createJSONStorage(() => AsyncStorage) }
    )
  );
