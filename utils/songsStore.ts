import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types/song";
import { ContextType } from "types/playback";

export interface PlayStart {
  track_id: number;
  context_type?: ContextType;
  context_id?: string | null;
  source_label?: string | null;
  position_start_sec: number;
  device?: string | null;
}

export interface PlayEndPayload {
  event_id?: number;
  position_end_sec?: number;
}

interface SongsState {
  isFetching: boolean;
  error: string | null;
  songs: Array<Song>;
  currentPlayEventId: number | null;
  fetchSongs: () => Promise<void>;
  setSongs: (s: Array<Song>) => void;
  clear: () => void;
  setStartPlay: (payload: PlayStart) => Promise<number>;
  setEndPlay: (payload?: PlayEndPayload) => Promise<void>;
}

export const useSongsStore: UseBoundStore<StoreApi<SongsState>> =
  create<SongsState>()(
    persist<SongsState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        songs: [] as Array<Song>,
        currentPlayEventId: null,
        setSongs: (s) => set({ songs: s }),
        clear: () => set({ songs: [], error: null, currentPlayEventId: null }),
        fetchSongs: async () => {
          if (get().isFetching) return;
          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            const { data } = await axios.get(`${serverUrl}/api/songs`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            set({ songs: toSongs(data) });
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
          } finally {
            set({ isFetching: false });
          }
        },
        setStartPlay: async (payload: PlayStart) => {
          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            const { data } = await axios.post(
              `${serverUrl}/api/play/start`,
              payload,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const eventId: number = data?.event_id;
            set({ currentPlayEventId: eventId });
            return eventId;
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
            throw err;
          }
        },
        setEndPlay: async (maybePayload?: PlayEndPayload) => {
          const eventId = maybePayload?.event_id ?? get().currentPlayEventId;
          if (!eventId) return;
          const payload = {
            event_id: eventId,
            position_end_sec: maybePayload?.position_end_sec ?? 0,
          };
          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            await axios.post(`${serverUrl}/api/play/end`, payload, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
          } finally {
            set({ currentPlayEventId: null });
          }
        },
      }),
      {
        name: "songs-store-v2",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (s) => ({ songs: s.songs } as unknown as SongsState),
        onRehydrateStorage: () => (state) => {
          if (!state) return;
          state.isFetching = false;
          state.error = null;
          state.currentPlayEventId = null;
        },
      }
    )
  );
