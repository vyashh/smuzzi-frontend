import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>ProfilePage </Text>
    </View>
  );
}

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  text: {
    color: Colors.text,
    fontSize: 42,
  },
});
