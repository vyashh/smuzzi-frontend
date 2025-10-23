import { StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import InputField from "./InputField";
import { useState } from "react";
import SubTitle from "./SubTitle";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>();
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
