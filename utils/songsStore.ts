import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { Song, toSongs } from "types/song";
import { ContextType } from "types/playback";
import { extractItemsAndCursor } from "helpers/misc";

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

  nextCursor: number | null;
  hasMore: boolean;
  pageSize: number;
  lastQuery: string;
  sort: "created_desc" | "created_asc" | "title_asc";
  total: number | null;

  fetchSongs: () => Promise<void>;
  setSongs: (s: Array<Song>) => void;
  clear: () => void;
  setStartPlay: (payload: PlayStart) => Promise<number>;
  setEndPlay: (payload?: PlayEndPayload) => Promise<void>;

  fetchMoreSongs: () => Promise<void>;
}

export const useSongsStore: UseBoundStore<StoreApi<SongsState>> =
  create<SongsState>()(
    persist<SongsState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        songs: [] as Array<Song>,
        currentPlayEventId: null,
        nextCursor: null,
        hasMore: true,
        pageSize: 100,
        lastQuery: "",
        sort: "created_desc",
        total: null,
        setSongs: (s) => set({ songs: s }),
        clear: () =>
          set({
            songs: [],
            error: null,
            currentPlayEventId: null,
            nextCursor: null,
            hasMore: true,
            lastQuery: "",
            sort: "created_desc",
          }),
        fetchSongs: async () => {
          if (get().isFetching) return;
          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            const { pageSize, lastQuery, sort } = get();
            const { data } = await axios.get(`${serverUrl}/api/songs`, {
              params: {
                limit: pageSize,
                q: lastQuery || undefined,
                sort,
                include_total: true,
              },
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const { items, nextCursor, total } = extractItemsAndCursor(data);
            set({
              songs: toSongs(items),
              nextCursor,
              total,
              hasMore: Boolean(nextCursor),
            });
            console.log(nextCursor);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message });
          } finally {
            set({ isFetching: false });
          }
        },
        fetchMoreSongs: async () => {
          const { isFetching, hasMore, nextCursor, pageSize, lastQuery, sort } =
            get();
          if (isFetching || !hasMore) return;

          set({ isFetching: true, error: null });
          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            const { data } = await axios.get(`${serverUrl}/api/songs`, {
              params: {
                limit: pageSize,
                cursor: nextCursor,
                q: lastQuery || undefined,
                sort,
              },
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const { items, nextCursor: nc } = extractItemsAndCursor(data);
            set({
              songs: [...get().songs, ...toSongs(items)],
              nextCursor: nc,
              hasMore: Boolean(nc),
            });
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
        name: "songs-store-v3",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (s) =>
          ({
            songs: s.songs.slice(0, 200),
            pageSize: s.pageSize,
            sort: s.sort,
            lastQuery: s.lastQuery,
          } as unknown as SongsState),

        onRehydrateStorage: () => (state) => {
          if (!state) return;
          if (state.isFetching === undefined) state.isFetching = false;
          if (state.error === undefined) state.error = null;
          if (state.currentPlayEventId === undefined)
            state.currentPlayEventId = null;
          if (state.nextCursor === undefined) state.nextCursor = null;
          if (state.hasMore === undefined) state.hasMore = true;
          if (state.pageSize === undefined) state.pageSize = 100;
          if (state.lastQuery === undefined) state.lastQuery = "";
          if (state.sort === undefined) state.sort = "created_desc";
          if (state.total === undefined) state.total = null;
        },
      }
    )
  );
