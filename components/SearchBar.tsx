import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import { Song } from "types/song";
import PlaylistView from "./PlaylistView";
import { loadPlay } from "utils/trackPlayer";
import Player from "./Player";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useActiveTrack } from "react-native-track-player";

interface SearchProps {
  resultsText?: string;
  searchList: Song[] | null;
}

const Search = ({ resultsText, searchList }: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Song[] | undefined>(
    undefined
  );
  const [songId, setSongId] = useState<number>();

  const activeTrack = useActiveTrack();

  const handleTrackSelection = async (item: Song) => {
    const songIndex = searchList?.findIndex((song) => song.id === item.id);

    if (songIndex && songIndex < 0) return;

    searchList &&
      (await loadPlay({
        songIndex,
        list: searchList,
        context_id: "search",
        context_type: "unknown",
      }));

    setSongId(item.id);
  };

  useEffect(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      return;
    }

    const id = setTimeout(() => {
      const res = searchList?.filter((song: Song) => {
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
  }, [searchValue, searchList]);

  return (
    <BottomSheetModalProvider>
      <InputField
        style={styles.inputField}
        placeholder="What do you want to listen to?"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      {resultsText && <SubTitle>{resultsText}</SubTitle>}
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
