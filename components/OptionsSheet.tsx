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
import AppText from "./AppText";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "constants/colors";
import { Playlist } from "types/playlist";
import { Ionicons } from "@expo/vector-icons";
import InputField from "./InputField";
import { EDIT_ARTWORK_URI, OptionType } from "constants/global";
import { usePlaylistsStore } from "utils/playlistsStore";

export type OptionsSheetRef = {
  present: (props: OptionSheetProps) => void;
  dismiss: () => void;
};

interface OptionSheetProps {
  selectedOptionsPlaylist: Playlist | null;
  type: OptionType;
}
const OptionSheet = forwardRef<OptionsSheetRef>((_, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [sheetProps, setSheetProps] = useState<OptionSheetProps | null>(null);
  const { deletePlaylist } = usePlaylistsStore();
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");

  useImperativeHandle(ref, () => ({
    present: (props: OptionSheetProps) => {
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

  const handleChange = () => {};

  const handleCancel = () => {
    modalRef.current?.dismiss();
  };

  useEffect(() => {
    if (sheetProps) {
      setPlaylistName(sheetProps.selectedOptionsPlaylist?.name ?? "");
      setPlaylistDescription(
        sheetProps.selectedOptionsPlaylist?.description ?? ""
      );
    }
  }, [sheetProps, setPlaylistName, setPlaylistDescription]);
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
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.topActionButtons}>
          <Pressable onPress={handleCancel}>
            <Text style={styles.deleteButton}>Cancel</Text>
          </Pressable>
          <AppText style={{ fontWeight: "bold" }}>Edit details</AppText>
          <Text style={styles.saveButton}>Save</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Image style={styles.artwork} source={{ uri: EDIT_ARTWORK_URI }} />
          </View>
          <View style={styles.contentInputFields}>
            <InputField
              placeholder="Playlist name"
              value={playlistName}
              onChangeText={setPlaylistName}
            />
            <InputField
              placeholder="Playlist description"
              value={playlistDescription}
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
    </BottomSheetModal>
  );
});

export default OptionSheet;

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
