import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import SearchBar from "@components/SearchBar";
import { useSongsStore } from "utils/songsStore";
import { useState } from "react";

const SearchPage = () => {
  const { songs } = useSongsStore();
  const [query, setQuery] = useState("");

  return (
    <View style={globalStyles.container}>
      <SearchBar
        setOnFocus={() => null}
        searchSongs={songs}
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
