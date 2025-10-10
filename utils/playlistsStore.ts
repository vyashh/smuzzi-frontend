import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types/song";
import { Playlist, toPlaylists } from "types/playlist";

interface PlaylistsStore {
  isFetching: boolean;
  error: string | null;
  playlists: ReadonlyArray<Playlist>;
  playlistTracks: ReadonlyArray<Song> | null;
  fetchPlaylists: () => Promise<void>;
  fetchPlaylistTracks: (playlistId: number) => Promise<void>;
  postPlaylist: (playlistName: string) => Promise<Playlist>;
  patchPlaylist: (
    playlistId: number,
    payload: { name?: string; description?: string | null }
  ) => Promise<void>;
  postSongToPlaylist: (
    songId: number,
    indexOfPlaylists: Array<number>
  ) => Promise<void>;
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
        playlistTracks: null,
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
        postPlaylist: async (playlistName) => {
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            await axios.post(
              `${serverUrl}/api/playlists`,
              { name: playlistName },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            set({ isFetching: false });
            await get().fetchPlaylists();
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        fetchPlaylistTracks: async (playlistId) => {
          if (get().isFetching) return;

          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            const { data } = await axios.get(
              `${serverUrl}/api/playlists/${playlistId}/tracks`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            set({
              playlistTracks: toSongs(data),
              isFetching: false,
            });
          } catch (error: any) {
            set({ error: error, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        patchPlaylist: async (playlistId, payload) => {
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            await axios.patch(
              `${serverUrl}/api/playlists/${playlistId}`,
              payload,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            set({ isFetching: false });
            await get().fetchPlaylists();
          } catch (error: any) {
            const msg =
              error?.response?.data?.detail ??
              (typeof error?.message === "string"
                ? error.message
                : String(error));
            set({ error: msg, isFetching: false });
          } finally {
            set({ isFetching: false });
          }
        },
        postSongToPlaylist: async (
          songId: number,
          indexOfPlaylists: Array<number>
        ) => {
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();

          try {
            indexOfPlaylists.map(async (playlistId) => {
              await axios.post(
                `${serverUrl}/api/playlists/${playlistId}/tracks`,
                { song_id: songId },
                { headers: { Authorization: `Bearer ${accessToken}` } }
              );
            });
            set({ isFetching: false });
            await get().fetchPlaylists();
          } catch (error: any) {
            const msg =
              error?.response?.data?.detail ??
              (typeof error?.message === "string"
                ? error.message
                : String(error));
            set({ error: msg, isFetching: false });
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
