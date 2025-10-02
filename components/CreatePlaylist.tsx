import { Button, StyleSheet, Text, View } from "react-native";
import AppText from "./AppText";
import App from "App";
import { globalStyles } from "constants/global";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";

const CreatePlaylist = () => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>Create Playlist</Text>
      <Ionicons
        style={styles.icon}
        name="add-circle-outline"
        size={24}
        color={Colors.primary}
      />
    </View>
  );
};

export default CreatePlaylist;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 12,
  },
  text: {
    fontWeight: "bold",
    color: Colors.text,
  },
  icon: {
    marginLeft: 8,
  },
});
