import AppText from "@components/AppText";
import TopBar from "@components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import { globalStyles } from "constants/global";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { usePlaylistsStore } from "utils/playlistsStore";

const NewPlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const postPlaylist = usePlaylistsStore((s) => s.postPlaylist);

  const handleCreatePlaylist = async () => {
    await postPlaylist(playlistName);
  };

  return (
    <View style={[globalStyles.container]}>
      {/* <TopBar /> */}
      <View style={styles.container}>
        <AppText style={styles.text}>Create Playlist </AppText>
        <TextInput
          placeholder="Enter playlist name"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={playlistName}
          onChangeText={setPlaylistName}
        />
        <Pressable onPress={handleCreatePlaylist}>
          <Ionicons name="add-circle" size={64} color={Colors.primary} />
        </Pressable>
        <Pressable onPress={handleCreatePlaylist}>
          <AppText style={[styles.text, { marginTop: 20 }]}>Cancel</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default NewPlaylistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "space-between",
  },
  text: { fontWeight: "bold", color: "#fff", fontSize: 24 },
  input: {
    borderColor: "#555",
    padding: 12,
    marginTop: 20,
    width: "90%",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
