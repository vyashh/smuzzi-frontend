import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import SearchBar from "@components/SearchBar";
import { useSongsStore } from "utils/songsStore";
import { useCallback, useEffect, useMemo } from "react";
import { useFocusEffect } from "expo-router";
import { useSearchStore } from "utils/searchStore";
import AppText from "@components/AppText";
import PlaylistView from "@components/PlaylistView";
import { Ionicons } from "@expo/vector-icons";
import { useAppToast } from "utils/toast";

const SearchPage = () => {
  const { songs } = useSongsStore();
  const { searches, fetchSearches, removeSearch, addSearch } = useSearchStore();
  const refreshSongs = useSongsStore((s: any) => s.refreshSongs ?? null);
  const searchSongsFn = useSongsStore((s: any) => s.searchSongs ?? null);
  const { errorToast, successToast } = useAppToast();

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

  const handleDelete = async (searchId: number) => {
    try {
      const { error } = useSearchStore.getState();

      if (error) {
        errorToast("Failed to remove item from recent searches.");
      }
      successToast("Removed item from recent searches.");
      await removeSearch(searchId);
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
        setOnFocus={() => null}
        searchSongs={songs}
        onQueryChange={debouncedRunSearch}
        resultsSongs={songs}
        resultsText="Recent searches"
        placeholder="What do you want to listen to?"
        showSearchIcon
      />
      {searches && (
        <FlatList
          data={searches}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            const song = item.song;
            console.log(song);
            return (
              song && (
                <View style={styles.recentSearches}>
                  <PlaylistView
                    artist={song.artist}
                    title={song.title}
                    cover={song.coverUrl}
                  />
                  <Pressable onPress={() => handleDelete(item.id)}>
                    <Ionicons
                      // style={styles.icon}
                      name={"close-outline"}
                      size={20}
                      color={Colors.primary}
                    />
                  </Pressable>
                </View>
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
