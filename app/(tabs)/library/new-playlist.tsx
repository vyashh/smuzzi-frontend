import AppText from "@components/AppText";
import Button from "@components/Button";
import TopBar from "@components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import { globalStyles } from "constants/global";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { usePlaylistsStore } from "utils/playlistsStore";

const NewPlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const postPlaylist = usePlaylistsStore((s) => s.postPlaylist);

  const handleCreatePlaylist = async () => {
    await postPlaylist(playlistName);
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <TopBar />
          <View style={styles.container}>
            <AppText style={styles.text}>Give your playlist a name </AppText>
            <TextInput
              placeholder="My Playlist"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={playlistName}
              onChangeText={setPlaylistName}
              returnKeyType="done"
              onSubmitEditing={handleCreatePlaylist}
              autoFocus
            />

            <Button>Create</Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewPlaylistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 18 },
  input: {
    borderColor: Colors.primary,
    borderBottomWidth: 1,
    padding: 12,
    marginVertical: 100,
    width: "90%",
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
  },
});
