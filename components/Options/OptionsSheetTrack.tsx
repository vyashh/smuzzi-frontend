import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AppText from "../AppText";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "constants/colors";
import { Playlist } from "types/playlist";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../InputField";
import { EDIT_ARTWORK_URI, OptionType } from "constants/global";
import { usePlaylistsStore } from "utils/playlistsStore";
import { Song } from "types/song";

export type OptionsSheetTrackRef = {
  present: (props: OptionsSheetTrackProps) => void;
  dismiss: () => void;
};

interface OptionsSheetTrackProps {
  selectedOptionsTrack: Song | null;
}
const OptionsSheetTrack = forwardRef<OptionsSheetTrackRef>((_, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [sheetProps, setSheetProps] = useState<OptionsSheetTrackProps | null>(
    null
  );
  const { deletePlaylist } = usePlaylistsStore();
  const [playlistId, setPlaylistId] = useState<number>();
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");
  const { patchPlaylist } = usePlaylistsStore();

  useImperativeHandle(ref, () => ({
    present: (props: OptionsSheetTrackProps) => {
      setSheetProps(props);
      modalRef.current?.present();
    },
    dismiss: () => modalRef.current?.dismiss(),
  }));

  const handleDelete = () => {
    if (
      sheetProps?.type === "playlist" &&
      sheetProps?.selectedOptionsPlaylist?.id !== undefined
    ) {
      console.log("playlist delete");
      deletePlaylist(sheetProps.selectedOptionsPlaylist.id).then(() =>
        modalRef.current?.dismiss()
      );
    }
  };

  const handleChange = () => {
    if (playlistId !== undefined) {
      patchPlaylist(playlistId, {
        name: playlistName,
        description: playlistDescription,
      }).then(() => handleCancel());
    }
  };

  const handleCancel = () => {
    modalRef.current?.dismiss();
  };

  useEffect(() => {
    if (sheetProps) {
      setPlaylistName(sheetProps.selectedOptionsPlaylist?.name ?? "");
      setPlaylistDescription(
        sheetProps.selectedOptionsPlaylist?.description ?? ""
      );
      setPlaylistId(sheetProps.selectedOptionsPlaylist?.id ?? undefined);
    }
  }, [sheetProps, setPlaylistName, setPlaylistDescription, setPlaylistId]);
  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["35%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      enableDynamicSizing
      enablePanDownToClose
      handleStyle={{ display: "none" }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.topActionButtons}>
            <Pressable onPress={handleCancel}>
              <Text style={styles.deleteButton}>Cancel</Text>
            </Pressable>
            <AppText style={{ fontWeight: "bold" }}>Edit details</AppText>
            <Pressable onPress={handleChange}>
              <Text style={styles.saveButton}>Save</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <View>
              <Image
                style={styles.artwork}
                source={{ uri: EDIT_ARTWORK_URI }}
              />
            </View>
            <View style={styles.contentInputFields}>
              <InputField
                placeholder="Playlist name"
                value={playlistName}
                onChangeText={setPlaylistName}
                useBottomSheetInput
              />
              <InputField
                placeholder="Playlist description"
                value={playlistDescription}
                onChangeText={setPlaylistDescription}
                useBottomSheetInput
              />
            </View>
          </View>
          <Pressable style={styles.bottomActionButtons} onPress={handleDelete}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="trash-bin"
              size={18}
              color={Colors.danger}
            />
            <AppText>Delete playlist</AppText>
          </Pressable>
        </BottomSheetView>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
});

export default OptionsSheetTrack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    padding: 10,
  },
  topActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    color: Colors.danger,
    fontWeight: "bold",
  },
  saveButton: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  bottomActionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    marginVertical: 20,
    flexDirection: "row",
  },
  contentInputFields: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  artwork: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
