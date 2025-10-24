import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import InputField from "./InputField";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
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
import { globalStyles } from "constants/global";

interface SearchProps {
  resultsText?: string;
  searchSongs?: Song[] | null;
  searchPlaylist?: Playlist[] | null;
  setOnFocus: Dispatch<SetStateAction<boolean>>;
}

const Search = ({
  resultsText,
  searchSongs,
  searchPlaylist,
  setOnFocus,
}: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResultsSongs, setSearchResultsSongs] = useState<
    Song[] | undefined
  >(undefined);
  const [searchResultsPlaylists, setSearchResultsPlaylists] = useState<
    Playlist[] | undefined
  >(undefined);
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
  };

  const handleSearch = useCallback(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) {
      setSearchResultsSongs([]);
      return;
    }

    if (searchSongs) {
      const res = searchSongs
        ? searchSongs?.filter((song: Song) => {
            const fields = [
              song.title ?? "",
              song.artist ?? "",
              song.filename ?? "",
            ];
            return fields.some((fields) => fields.toLowerCase().includes(q));
          })
        : [];
      setSearchResultsSongs(res);
    } else if (searchPlaylist) {
      const res = searchPlaylist
        ? searchPlaylist?.filter((playlist: Playlist) => {
            const fields = [playlist.name ?? "", playlist.description ?? ""];
            return fields.some((fields) => fields.toLowerCase().includes(q));
          })
        : [];
      setSearchResultsPlaylists(res);
      console.log(res);
    }
  }, [searchValue, searchSongs, searchPlaylist, setOnFocus]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <BottomSheetModalProvider>
      <View style={[{ flex: 1, paddingTop: 0 }, !searchValue && { flex: 0 }]}>
        <InputField
          style={styles.inputField}
          placeholder="What do you want to listen to?"
          value={searchValue}
          onChangeText={onChange}
        />
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
                data={searchResultsSongs ?? []}
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
  inputField: {
    height: 50,
    marginBottom: 20,
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
