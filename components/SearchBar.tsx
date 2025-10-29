import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import InputField from "./InputField";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SubTitle from "./SubTitle";
import { Song } from "types/song";
import PlaylistView from "./PlaylistView";
import { loadPlay } from "utils/trackPlayer";
import Player from "./Player";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useActiveTrack } from "react-native-track-player";
import { Playlist } from "types/playlist";
import LibraryPlaylistView from "./LibraryPlaylistView";
import AppText from "./AppText";
import { PlaylistType } from "constants/global";
import { router } from "expo-router";

interface SearchProps {
  resultsText?: string;
  resultsSongs?: Song[] | null;
  resultsPlaylists?: Playlist[] | null;
  isLoading?: boolean;
  onQueryChange?: (q: string) => void | undefined;
  searchSongs?: Song[] | null;
  searchPlaylist?: Playlist[] | null;
  setOnFocus: Dispatch<SetStateAction<boolean>>;
  placeholder?: string;
  showSearchIcon?: boolean;
}

const Search = ({
  resultsText,
  resultsSongs,
  searchSongs,
  searchPlaylist,
  setOnFocus,
  placeholder,
  showSearchIcon = false,
  onQueryChange,
}: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResultsSongs, setSearchResultsSongs] = useState<Song[]>([]);
  const [searchResultsPlaylists, setSearchResultsPlaylists] = useState<
    Playlist[]
  >([]);
  const [songId, setSongId] = useState<number>();

  const activeTrack = useActiveTrack();

  const handleTrackSelection = async (item: Song) => {
    const songIndex = searchSongs?.findIndex((song) => song.id === item.id);

    if (songIndex && songIndex < 0) return;

    searchSongs &&
      (await loadPlay({
        songIndex,
        list: searchSongs,
        context_id: "search",
        context_type: "unknown",
      }));

    setSongId(item.id);
  };

  const onChange = (text: string) => {
    setSearchValue(text);
    setOnFocus(text.trim().length > 0);
    onQueryChange?.(text);
  };

  const filterPlaylist = (value: string) => {
    const query = value.trim();
    if (!query.trim() || !searchPlaylist?.length) return [];
    const res = searchPlaylist.filter((p) => {
      const fields = [p.name ?? "", p.description ?? ""];
      return fields.some((f) => f.toLowerCase().includes(query));
    });
    console.log("[SearchBar] playlists filter:", {
      query: query,
      before: searchPlaylist.length,
      after: res.length,
    });
    return res;
  };

  const handleOnpressShowPlaylist = (
    viewType: PlaylistType,
    title: string,
    playlistId?: number
  ) => {
    console.log("handleOnPressShowPlaylist()");
    router.push({
      pathname: "/(tabs)/library/details",
      params: { viewType, title, playlistId },
    });
  };

  useEffect(() => {}, []);

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          { flex: 1, paddingTop: 0, paddingBottom: 5 },
          !searchValue && { flex: 0 },
        ]}
      >
        <InputField
          placeholder={placeholder}
          value={searchValue}
          onChangeText={(value) => {
            if (searchPlaylist) {
              setSearchResultsPlaylists(filterPlaylist(value));
            }
            onChange(value);
          }}
          showSearchIcon={showSearchIcon}
        />
        {resultsText && (
          <SubTitle style={styles.subtitle}>{resultsText}</SubTitle>
        )}
        {searchValue !== "" && (
          <View style={{ flex: 1, width: "100%" }}>
            {searchPlaylist && (
              <FlatList
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                data={searchResultsPlaylists ?? []}
                keyExtractor={(item) => String(item.id)}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => console.log("open playlist", item.id)}
                  >
                    <LibraryPlaylistView
                      title={item.name || "Playlist"}
                      viewType="playlist"
                      options={false}
                      playlistId={item.id}
                      handleOnPressPlaylist={() => {
                        handleOnpressShowPlaylist(
                          "playlist",
                          item.name || "Playlist",
                          item.id
                        );
                        setSearchValue("");
                        setOnFocus(false);
                      }}
                    />
                  </Pressable>
                )}
              />
            )}

            {searchSongs && (
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingTop: 8,
                  paddingBottom: 80,
                  backgroundColor: Colors.bg,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                data={resultsSongs ?? []}
                keyExtractor={(item) => String(item.id)}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleTrackSelection(item)}>
                    <PlaylistView
                      active={songId === item.id}
                      artist={item.artist ?? ""}
                      cover={item.coverUrl ?? ""}
                      title={item.title ?? item.filename}
                    />
                  </Pressable>
                )}
              />
            )}
          </View>
        )}
        {searchResultsPlaylists.length === 0 && resultsSongs?.length === 0 && (
          <View
            style={{
              flex: 1,
            }}
          >
            <AppText
              style={{
                textAlign: "center",
              }}
            >
              Nothing matched your search.
            </AppText>
          </View>
        )}
      </View>

      {activeTrack && <Player />}
    </BottomSheetModalProvider>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  subtitle: {
    marginTop: 10,
  },
  searchItem: {
    paddingVertical: 12,
  },
  playlists: {
    flex: 1,
    width: "100%",
    marginBottom: 80,
  },
});
