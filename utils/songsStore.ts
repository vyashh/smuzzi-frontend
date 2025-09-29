import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthStore } from "./authStore";
import { toSongs } from "types/song";

export const useSongsStore = create(
  persist(
    (set, get) => ({
      isFetching: true,
      error: "",
      songs: [],
      fetchSongs: async () => {
        const { serverUrl, accessToken } = useAuthStore.getState();
        console.log(`logging onto server: ${serverUrl} with ${accessToken}`);

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
        } catch (error) {
          set({ error: error, isFetching: false });
        }
      },
    }),
    {
      name: "songs-store-v2",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
