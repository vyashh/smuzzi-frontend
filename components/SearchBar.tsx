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
    }
  }, [searchValue, searchSongs, searchPlaylist, setOnFocus]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <BottomSheetModalProvider>
      <InputField
        style={styles.inputField}
        placeholder="What do you want to listen to?"
        value={searchValue}
        onChangeText={setSearchValue}
        setOnFocus={() => setOnFocus(true)}
      />
      {resultsText && <SubTitle>{resultsText}</SubTitle>}
      {searchValue && (
        <View>
          {searchSongs && (
            <FlatList
              data={searchResultsSongs}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.searchItem}
                  onPress={() => handleTrackSelection(item)}
                >
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
          {searchPlaylist && (
            <FlatList
              data={searchResultsPlaylists}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.searchItem}
                  onPress={() => console.log("item")}
                >
                  <LibraryPlaylistView
                    // active={songId === item.id}
                    viewType="playlist"
                    title={item.name}
                  />
                </Pressable>
              )}
            />
          )}
        </View>
      )}
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
});
