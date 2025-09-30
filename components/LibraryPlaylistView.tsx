import { Image, StyleSheet, Text, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import {
  ALL_TRACKS_ICON_URI,
  DEFAULT_ARTWORK_URI,
  LIKES_ICON_URI,
  PlaylistType,
} from "constants/global";

interface LibraryPlaylistViewProps {
  viewType: PlaylistType;
  title: string;
}

const LibraryPlaylistView = ({ viewType, title }: LibraryPlaylistViewProps) => {
  const ICON_BY_VIEW = {
    likes: LIKES_ICON_URI,
    allTracks: ALL_TRACKS_ICON_URI,
    playlist: DEFAULT_ARTWORK_URI,
    default: DEFAULT_ARTWORK_URI,
  };

  return (
    <View style={styles.container}>
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
      <View>
        <View style={styles.actionButtons}>
          <Ionicons
            name="cloud-download-outline"
            size={16}
            color={Colors.neutral}
          />
          <Ionicons name="ellipsis-vertical" size={16} color={Colors.text} />
        </View>
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
  },
});
