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
  FlatList,
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
import PlaylistView from "@components/PlaylistView";

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
  const { playlists } = usePlaylistsStore();
  const { deletePlaylist } = usePlaylistsStore();
  const [playlistId, setPlaylistId] = useState<number>();
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");
  const [showPlaylists, setShowPlaylists] = useState<boolean>();
  const { patchPlaylist } = usePlaylistsStore();

  useImperativeHandle(ref, () => ({
    present: (props: OptionsSheetTrackProps) => {
      setSheetProps(props);
      modalRef.current?.present();
    },
    dismiss: () => modalRef.current?.dismiss(),
  }));

  const handleDelete = () => {
    if (sheetProps?.selectedOptionsTrack?.id !== undefined) {
      console.log("playlist delete");
      deletePlaylist(sheetProps.selectedOptionsTrack.id).then(() =>
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

  const handleAddToPlaylist = () => {
    setShowPlaylists(true);
    console.log(showPlaylists);
  };

  const handleCancel = () => {
    modalRef.current?.dismiss();
  };

  useEffect(() => {
    if (sheetProps) {
      setPlaylistName(sheetProps.selectedOptionsTrack?.title ?? "");
      setPlaylistId(sheetProps.selectedOptionsTrack?.id ?? undefined);
    }
  }, [sheetProps, setPlaylistName, setPlaylistDescription, setPlaylistId]);
  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["40%"]}
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
          <PlaylistView
            artist={sheetProps?.selectedOptionsTrack?.artist}
            cover={sheetProps?.selectedOptionsTrack?.coverUrl}
            title={sheetProps?.selectedOptionsTrack?.title}
          />
          {!showPlaylists && (
            <View>
              <SingleOption
                iconName="heart"
                text="Add to likes"
                iconColor={Colors.primary}
              />
              <SingleOption
                onPress={handleAddToPlaylist}
                iconName="add-circle-outline"
                text="Add to playlist"
              />
              <SingleOption iconName="pencil" text="Edit track details" />
              <SingleOption
                iconName="trash"
                text="Delete track from library"
                iconColor={"red"}
              />
            </View>
          )}

          {showPlaylists && (
            <FlatList
              style={{ flex: 1 }}
              data={playlists}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SingleOption text={item.name} iconName="radio-button-off" />
              )}
            />
          )}
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
