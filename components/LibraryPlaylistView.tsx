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
import PopupMenu from "./PopupMenu";
import { useEffect, useRef } from "react";
import PlaylistCover from "./PlaylistCover";
import { usePlaylistsStore } from "utils/playlistsStore";

interface LibraryPlaylistViewProps {
  viewType: PlaylistType;
  title: string;
  playlistId?: number;
  handleOnPressPlaylist?: () => void;
  onOpenOptions?: () => void;
}

const LibraryPlaylistView = ({
  viewType,
  title,
  playlistId,
  handleOnPressPlaylist,
  onOpenOptions,
}: LibraryPlaylistViewProps) => {
  const ICON_BY_VIEW = {
    likes: LIKES_ICON_URI,
    allTracks: ALL_TRACKS_ICON_URI,
    playlist: DEFAULT_ARTWORK_URI,
    default: DEFAULT_ARTWORK_URI,
  };
  const menuTouchRef = useRef(false);
  const fetchPlaylistTracks = usePlaylistsStore((s) => s.fetchPlaylistTracks);
  const playlistTracks = usePlaylistsStore((s) => s.playlistTracks);

  useEffect(() => {
    if (playlistId !== undefined && fetchPlaylistTracks) {
      fetchPlaylistTracks(playlistId);
    }
  }, [playlistId, fetchPlaylistTracks]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (menuTouchRef.current) return;
        handleOnPressPlaylist?.();
      }}
    >
      <View style={styles.containerContent}>
        <View>
          {/* <Image
            style={styles.cover}
            source={{ uri: ICON_BY_VIEW[viewType] ?? ICON_BY_VIEW.default }}
          /> */}
          <PlaylistCover style={styles.cover} tracks={playlistTracks ?? []} />
        </View>
        <View>
          <AppText
            style={[styles.detailsTitle, { width: 250 }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {title}
          </AppText>
        </View>
      </View>
      <View pointerEvents="box-none">
        <View
          style={styles.actionButtons}
          onTouchStart={() => {
            menuTouchRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => (menuTouchRef.current = false), 0);
          }}
        >
          <Ionicons
            name="cloud-download-outline"
            size={16}
            color={Colors.neutral}
          />
          <Pressable
            onPress={(e) => {
              console.log("Options Pressed");
              e.stopPropagation();
              onOpenOptions?.();
            }}
            onPressIn={(e) => e.stopPropagation()}
            hitSlop={8}
            style={{ padding: 4 }}
          >
            <Ionicons name="ellipsis-vertical" size={16} color={Colors.text} />
          </Pressable>
        </View>
      </View>
    </Pressable>
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
    borderRadius: 8,
  },
  containerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
