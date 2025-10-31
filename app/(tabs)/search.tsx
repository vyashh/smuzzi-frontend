import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import SearchBar from "@components/SearchBar";
import { useSongsStore } from "utils/songsStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useSearchStore } from "utils/searchStore";
import AppText from "@components/AppText";
import PlaylistView from "@components/PlaylistView";
import { Ionicons } from "@expo/vector-icons";
import { useAppToast } from "utils/toast";
import { useActiveTrack } from "react-native-track-player";
import { Song } from "types/song";
import LoaderKitView from "react-native-loader-kit";
import { loadPlay } from "utils/trackPlayer";

const SearchPage = () => {
  const { searches, fetchSearches, removeSearch, addSearch, isFetching } =
    useSearchStore();
  const { songs } = useSongsStore();
  const refreshSongs = useSongsStore((s: any) => s.refreshSongs ?? null);
  const searchSongsFn = useSongsStore((s: any) => s.searchSongs ?? null);
  const { errorToast, successToast } = useAppToast();
  const activeTrack = useActiveTrack();
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const runSearch = (q: string) => {
    const query = q.trim();
    if (searchSongsFn) return searchSongsFn(query);
    if (refreshSongs) return refreshSongs({ q: query });
    return useSongsStore.getState().fetchSongs();
  };

  const debouncedRunSearch = useMemo(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const fn = (q: string) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => runSearch(q), 300);
    };
    (fn as any).cancel = () => t && clearTimeout(t);
    return fn;
  }, [runSearch]);

  const handleTrackSelection = async (songIndex: number) => {
    console.log("handleTrackSelection", songIndex);
    await loadPlay({
      songIndex,
      list: songs,
      context_id: "search",
      context_type: "unknown",
    });
  };

  const handleDelete = async (searchId: number) => {
    try {
      await removeSearch(searchId);
      successToast("Removed item from recent searches.");
    } catch (error) {
      errorToast("Failed to remove search item.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (searchSongsFn) {
          searchSongsFn("");
        }
      };
    }, [searchSongsFn])
  );

  useEffect(() => {
    fetchSearches();
  }, [fetchSearches]);

  return (
    <View style={globalStyles.container}>
      <SearchBar
        setOnFocus={setSearchFocus}
        searchSongs={songs}
        onQueryChange={debouncedRunSearch}
        resultsSongs={songs}
        resultsText="Recent searches"
        placeholder="What do you want to listen to?"
        showSearchIcon
      />
      {searches && !searchFocus && (
        <FlatList
          data={searches}
          keyExtractor={(item, index) =>
            String(item.id ?? item.songId ?? item.song?.id ?? index)
          }
          renderItem={({ item }) => {
            const song = item.song;

            return (
              song && (
                <Pressable
                  style={styles.recentSearches}
                  onPress={() => {
                    const idx = songs.findIndex(
                      (s: Song) => String(s.id) === String(song.id)
                    );
                    if (idx !== -1) return handleTrackSelection(idx);
                    loadPlay({
                      songIndex: 0,
                      list: [song],
                      context_id: "search",
                      context_type: "unknown",
                    }).catch(() => errorToast("Could not play that track."));
                  }}
                >
                  <PlaylistView
                    artist={song.artist}
                    title={song.title}
                    cover={song.coverUrl}
                    active={parseInt(activeTrack?.id) === song.id}
                  />
                  <Pressable onPress={() => handleDelete(item.id)}>
                    {isFetching ? (
                      <LoaderKitView
                        style={{ width: 30, height: 30 }}
                        name={"BallScale"}
                        animationSpeedMultiplier={1}
                        color={Colors.primary}
                      />
                    ) : (
                      <Ionicons
                        name={"close-outline"}
                        size={20}
                        color={Colors.text}
                      />
                    )}
                  </Pressable>
                </Pressable>
              )
            );
          }}
        />
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  text: {
    color: Colors.text,
    fontSize: 42,
  },
  recentSearches: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
