import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import SearchBar from "@components/SearchBar";
import { useSongsStore } from "utils/songsStore";

const SearchPage = () => {
  const { songs } = useSongsStore();
  return (
    <View style={globalStyles.container}>
      <SearchBar
        setOnFocus={() => null}
        searchSongs={songs}
        resultsText="Recent searches"
        placeholder="What do you want to listen to?"
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
