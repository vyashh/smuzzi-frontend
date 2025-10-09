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
import SingleOption from "./SingleOption";

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
          <SingleOption iconName="add" text="Add to playlist" />
          <SingleOption iconName="pencil" text="Edit track details" />
          <SingleOption
            iconName="trash"
            text="Delete track from library"
            iconColor={"red"}
          />
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
  option: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});
