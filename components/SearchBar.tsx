import { StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import SubTitle from "./SubTitle";
import { useSongsStore } from "utils/songsStore";
import { Song } from "types/song";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { songs } = useSongsStore();
  const [searchResults, setSearchResults] = useState<Song[]>([]);

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
      console.log(res);
    }, 200);

    return () => clearTimeout(id);
  }, [searchValue, songs]);

  return (
    <View>
      <InputField
        style={styles.inputField}
        placeholder="What do you want to listen to?"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <SubTitle>Recent Searches</SubTitle>
    </View>
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
});
