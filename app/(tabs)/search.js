import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";

function SearchPage() {
  return (
    <View style={globalStyles.container}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>SearchPage </Text>
    </View>
  );
}

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
