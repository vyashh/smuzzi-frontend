import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import { useSongsStore } from "utils/songsStore";
import { Song } from "types/song";
import PlaylistView from "./PlaylistView";
import { loadPlay } from "utils/trackPlayer";
import Player from "./Player";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useActiveTrack } from "react-native-track-player";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { songs } = useSongsStore();
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [songId, setSongId] = useState<number>();

  const activeTrack = useActiveTrack();

  const handleTrackSelection = async (item: Song) => {
    const songIndex = songs.findIndex((song) => song.id === item.id);

    if (songIndex < 0) return;

    await loadPlay({
      songIndex,
      list: songs,
      context_id: "search",
      context_type: "unknown",
    });

    setSongId(item.id);
  };

  useEffect(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      return;
    }

    const id = setTimeout(() => {
      const res = songs.filter((song: Song) => {
        const fields = [
          song.title ?? "",
          song.artist ?? "",
          song.filename ?? "",
        ];
        return fields.some((fields) => fields.toLowerCase().includes(q));
      });

      setSearchResults(res);
    }, 200);
    return () => clearTimeout(id);
  }, [searchValue, songs]);

  return (
    <BottomSheetModalProvider>
      <InputField
        style={styles.inputField}
        placeholder="What do you want to listen to?"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <SubTitle>Recent Searches</SubTitle>
      <FlatList
        data={searchResults}
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
