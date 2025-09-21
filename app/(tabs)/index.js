import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Link } from "expo-router";

function Home() {
  const userName = "Vyash";
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>Hello </Text>
      <Link href="/library">
        <Text style={styles.text}>Go To Library</Text>
      </Link>
    </View>
  );
}

export default Home;

const styles = new StyleSheet.create({
  container: {
    marginTop: 100,
  },
  text: {
    color: Colors.text,
    fontSize: 42,
  },
});
