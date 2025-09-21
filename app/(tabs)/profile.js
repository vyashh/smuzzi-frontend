import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/globalStyles";

function ProfilePage() {
  return (
    <View style={globalStyles.container}>
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
