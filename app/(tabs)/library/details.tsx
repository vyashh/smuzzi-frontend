import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AppText from "@components/AppText";
import { globalStyles, PlaylistType } from "constants/global";
import HeaderTitle from "@components/HeaderTitle";
import { Colors } from "constants/colors";

import { loadPlay } from "utils/trackPlayer";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Player from "@components/Player";
import { Ionicons } from "@expo/vector-icons";
import { useSongsStore } from "utils/songsStore";
import { useAuthStore } from "utils/authStore";
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Song } from "types/song";
import PlaylistView from "@components/PlaylistView";
import { useLikeStore } from "utils/likesStore";

const playlist = () => {
  const { viewType, title } = useLocalSearchParams<{
    viewType: PlaylistType;
    title: string;
  }>();
  const { songs, isFetching } = useSongsStore();
  const fetchSongs = useSongsStore((s) => s.fetchSongs);
  const isSongsFetching = useSongsStore((s) => s.isFetching);

  const { likedSongs } = useLikeStore();
  const fetchLikes = useLikeStore((state) => state.fetchLikes);
  const isLikesFetching = useLikeStore((s) => s.isFetching);

  const refreshing =
    viewType === "likes" ? isSongsFetching || isLikesFetching : isSongsFetching;

  const handleRefresh = () => {
    switch (viewType) {
      case "allTracks":
        console.log("details.tsx fetchSongs()");
        fetchSongs();
        break;
      case "likes":
        console.log("details.tsx fetchLikes()");
        fetchLikes();
        break;
      case "playlist":
        console.log("details.tsx playlist refresh");
        break;
      default:
        break;
    }
  };

  const displayedSongs = useMemo(() => {
    switch (viewType) {
      case "likes":
        return likedSongs;
      case "allTracks":
      case "playlist":
      default:
        return songs;
    }
  }, [viewType, songs, likedSongs]);

  useEffect(() => {
    fetchSongs();
    if (viewType === "likes") fetchLikes();
  }, [fetchSongs, fetchLikes, viewType]);

  return (
    <View style={[globalStyles.container, { paddingTop: 0 }]}>
      <HeaderTitle>{title}</HeaderTitle>
      <AppText style={styles.tracks}>{displayedSongs.length} Tracks</AppText>
      <View style={styles.quickActions}>
        <View style={styles.quickActionsButton}>
          <View style={styles.quickActionsButtonContainer}>
            <View style={styles.quickActionsButtonContainerIcon}>
              <Ionicons name="play-outline" size={24} color={Colors.primary} />
            </View>
            <AppText style={styles.quickActionsButtonText}>Play</AppText>
          </View>
        </View>
        <Pressable onPress={() => loadPlay({ shuffled: true })}>
          <View style={styles.quickActionsButton}>
            <View style={styles.quickActionsButtonContainer}>
              <View style={styles.quickActionsButtonContainerIcon}>
                <Ionicons name="shuffle" size={24} color={Colors.primary} />
              </View>
              <AppText style={styles.quickActionsButtonText}>Shuffle</AppText>
            </View>
          </View>
        </Pressable>
      </View>
      <FlatList<Song>
        data={displayedSongs}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item: Song) => String(item.id)}
        renderItem={({ item, index }) => (
          <View style={{ padding: 12 }}>
            <Pressable
              onPress={() => {
                loadPlay({ songIndex: index, viewType });
              }}
            >
              <PlaylistView
                artist={item.artist}
                title={item.title}
                cover={item.coverUrl}
              />
            </Pressable>
          </View>
        )}
        // ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
      <BottomSheetModalProvider>
        <Player />
      </BottomSheetModalProvider>
    </View>
  );
};

export default playlist;

const styles = StyleSheet.create({
  container: {},
  text: {
    color: Colors.text,
    fontSize: 42,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionsButton: {
    // borderBlockColor: "red",
    paddingHorizontal: 45,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    marginBottom: 10,
  },
  quickActionsButtonContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quickActionsButtonText: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  quickActionsButtonContainerIcon: {
    paddingRight: 10,
  },
  tracks: {
    marginVertical: 10,
  },
});
