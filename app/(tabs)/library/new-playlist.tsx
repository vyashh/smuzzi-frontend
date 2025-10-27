import AppText from "@components/AppText";
import Button from "@components/Buttons/Button";
import TopBar from "@components/TopBar";
import { Colors } from "constants/colors";
import { globalStyles } from "constants/global";
import { router } from "expo-router";
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
import { useAppToast } from "utils/toast";

const NewPlaylistPage = () => {
  const { error } = usePlaylistsStore();
  const { successToast, errorToast, infoToast } = useAppToast();
  const [playlistName, setPlaylistName] = useState<string>("");
  const postPlaylist = usePlaylistsStore((s) => s.postPlaylist);

  const handleCreatePlaylist = async () => {
    if (playlistName.length <= 0) {
      return infoToast("You're more creative than that!");
    }
    try {
      postPlaylist(playlistName);
    } catch {
      error && errorToast(error);
    } finally {
      successToast(`Playlist created: ${playlistName}`);
      router.back();
    }
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
            <AppText>Give your playlist a name </AppText>
            <TextInput
              placeholder="My Playlist"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={playlistName}
              onChangeText={setPlaylistName}
              returnKeyType="done"
              onSubmitEditing={handleCreatePlaylist}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Button
              title="Create Playlist"
              pressHandler={handleCreatePlaylist}
            />
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
