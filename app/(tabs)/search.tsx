import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import SearchBar from "@components/SearchBar";
import { useSongsStore } from "utils/songsStore";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Song } from "types/song";
import { useFocusEffect } from "expo-router";

const SearchPage = () => {
  const { songs, isFetching } = useSongsStore();
  const refreshSongs = useSongsStore((s: any) => s.refreshSongs ?? null);
  const searchSongsFn = useSongsStore((s: any) => s.searchSongs ?? null);

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

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (searchSongsFn) {
          searchSongsFn("");
        }
      };
    }, [searchSongsFn])
  );

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
});
