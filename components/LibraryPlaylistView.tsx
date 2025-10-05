import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import {
  ALL_TRACKS_ICON_URI,
  DEFAULT_ARTWORK_URI,
  LIKES_ICON_URI,
  PlaylistType,
} from "constants/global";
import { use } from "react";
import { usePlaylistsStore } from "utils/playlistsStore";
import PopupMenu from "./PopupMenu";

interface LibraryPlaylistViewProps {
  viewType: PlaylistType;
  title: string;
  playlistId?: number;
  handleOnPressPlaylist?: () => void;
}

const LibraryPlaylistView = ({
  viewType,
  title,
  playlistId,
  handleOnPressPlaylist,
}: LibraryPlaylistViewProps) => {
  const ICON_BY_VIEW = {
    likes: LIKES_ICON_URI,
    allTracks: ALL_TRACKS_ICON_URI,
    playlist: DEFAULT_ARTWORK_URI,
    default: DEFAULT_ARTWORK_URI,
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.containerContent}
        onPress={handleOnPressPlaylist}
      >
        <View>
          <Image
            style={styles.cover}
            source={{ uri: ICON_BY_VIEW[viewType] ?? ICON_BY_VIEW.default }}
          />
        </View>
        <View>
          <AppText
            style={[styles.detailsTitle, { width: "250" }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {title}
          </AppText>
        </View>
      </Pressable>
      <View>
        <Pressable>
          <View style={styles.actionButtons}>
            <Ionicons
              name="cloud-download-outline"
              size={16}
              color={Colors.neutral}
            />
            <PopupMenu>
              <Ionicons
                name="ellipsis-vertical"
                size={16}
                color={Colors.text}
              />
            </PopupMenu>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default LibraryPlaylistView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 10,
    marginVertical: 5,
  },
  containerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
    height: "auto",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
});
