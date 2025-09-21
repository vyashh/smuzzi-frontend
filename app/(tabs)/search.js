import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function SearchPage() {
  return (
    <View style={styles.container}>
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
