import { create, StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";

import type { ApiSearch, Search } from "types/search";
import { toSearch, toSearchs } from "types/search";

interface SearchState {
  isFetching: boolean;
  error: string | null;
  searches: Search[] | null;

  fetchSearches: (limit?: number) => Promise<void>;
  addSearch: (songId: number) => Promise<void>;
  removeSearch: (recentId: number) => Promise<void>;
}

export const useSearchStore: UseBoundStore<StoreApi<SearchState>> =
  create<SearchState>()(
    persist<SearchState>(
      (set, get) => ({
        isFetching: false,
        error: null,
        searches: null,

        fetchSearches: async (limit = 50) => {
          if (get().isFetching) return;
          set({ isFetching: true, error: null });

          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            const { data } = await axios.get<{ items: ApiSearch[] }>(
              `${serverUrl}/api/recent-searches`,
              {
                params: { limit },
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            set({
              searches: toSearchs(data?.items ?? []),
              isFetching: false,
            });
          } catch (err: any) {
            set({
              error:
                err?.response?.data?.detail ??
                err?.message ??
                "Failed to fetch recent searches",
              isFetching: false,
            });
          } finally {
            set({ isFetching: false });
          }
        },

        addSearch: async (songId: number) => {
          const { serverUrl, accessToken } = useAuthStore.getState();
          try {
            const { data } = await axios.post<ApiSearch>(
              `${serverUrl}/api/recent-searches`,
              { song_id: songId },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            const created = toSearch(data);
            set((state) => {
              const current = state.searches ?? [];
              // check duplicates
              const withoutDup = current.filter(
                (x) => x.songId !== created.songId
              );
              return { searches: [created, ...withoutDup] };
            });
          } catch (err: any) {
            set({
              error:
                err?.response?.data?.detail ??
                err?.message ??
                "Failed to add recent search",
            });
          } finally {
            await get().fetchSearches();
          }
        },

        removeSearch: async (recentId: number) => {
          const { serverUrl, accessToken } = useAuthStore.getState();

          const prev = get().searches ?? [];
          set({ searches: prev.filter((x) => x.id !== recentId) });

          try {
            await axios.delete(`${serverUrl}/api/recent-searches/${recentId}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
          } catch (err: any) {
            set({
              searches: prev,
              error:
                err?.response?.data?.detail ??
                err?.message ??
                "Failed to delete recent search",
            });
          }
        },
      }),
      {
        name: "search-store-v1",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );
