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
import BottomSheetTopActionButtons from "@components/Buttons/BottomSheetTopActionButton";

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

  // add to playlist
  const [showPlaylists, setShowPlaylists] = useState<boolean>();
  const [addToPlaylists, setAddToPlaylists] = useState<Array<number>>();

  useImperativeHandle(ref, () => ({
    present: (props: OptionsSheetTrackProps) => {
      setSheetProps(props);
      setShowPlaylists(false);
      modalRef.current?.present();
    },
    dismiss: () => {
      setShowPlaylists(false);
      modalRef.current?.dismiss();
    },
  }));

  const handleAddToPlaylist = (playlist: Playlist) => {
    setAddToPlaylists((prev) =>
      prev ? [...prev, playlist.id] : [playlist.id]
    );

    console.log(
      "Should add song: ",
      sheetProps?.selectedOptionsTrack?.id,
      " to playlist: ",
      playlist.name,
      " array ",
      addToPlaylists
    );
  };

  useEffect(() => {}, []);
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
          {showPlaylists && (
            <View style={{ marginBottom: 20 }}>
              <BottomSheetTopActionButtons
                text="Add to playlist"
                ref={modalRef}
                handleChange={() => console.log(addToPlaylists)}
              />
            </View>
          )}
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
                onPress={() => setShowPlaylists(true)}
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
                <SingleOption
                  text={item.name}
                  iconName="radio-button-off"
                  onPress={() => handleAddToPlaylist(item)}
                />
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
