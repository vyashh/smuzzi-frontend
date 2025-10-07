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
import TopBar from "@components/TopBar";
import { usePlaylistsStore } from "utils/playlistsStore";
import { useActiveTrack } from "react-native-track-player";

const playlist = () => {
  const { viewType, title, playlistId } = useLocalSearchParams<{
    viewType: PlaylistType;
    title: string;
    playlistId?: any;
  }>();

  const { songs, isFetching } = useSongsStore();
  const fetchSongs = useSongsStore((s) => s.fetchSongs);
  const isSongsFetching = useSongsStore((s) => s.isFetching);

  const { likedSongs } = useLikeStore();
  const fetchLikes = useLikeStore((state) => state.fetchLikes);
  const isLikesFetching = useLikeStore((s) => s.isFetching);

  const fetchPlaylistTracks = usePlaylistsStore((s) => s.fetchPlaylistTracks);
  const playlistTracks = usePlaylistsStore((s) => s.playlistTracks);

  const refreshing =
    viewType === "likes" ? isSongsFetching || isLikesFetching : isSongsFetching;

  const activeTrack = useActiveTrack();

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
      case "playlist":
        return playlistTracks;
      case "allTracks":
      default:
        return songs;
    }
  }, [viewType, songs, likedSongs, playlistTracks]);

  useEffect(() => {
    fetchSongs();
    if (viewType === "likes") fetchLikes();
    if (viewType === "playlist" && playlistId) fetchPlaylistTracks(playlistId);
  }, [fetchSongs, fetchLikes, fetchPlaylistTracks, viewType, playlistId]);

  return (
    <View style={[globalStyles.container]}>
      <TopBar />
      <HeaderTitle>{title}</HeaderTitle>
      <View style={styles.trackDetails}>
        <AppText style={styles.tracks}>
          {displayedSongs?.length
            ? displayedSongs.length
            : "No tracks in playlist"}
        </AppText>
        <AppText> Tracks</AppText>
      </View>
      <View style={styles.quickActions}>
        <View style={styles.quickActionsButton}>
          <Pressable
            onPress={() =>
              loadPlay({
                list: displayedSongs ?? [],
                songIndex: 0,
                shuffled: false,
              })
            }
          >
            <View style={styles.quickActionsButtonContainer}>
              <View style={styles.quickActionsButtonContainerIcon}>
                <Ionicons
                  name="play-outline"
                  size={24}
                  color={Colors.primary}
                />
              </View>
              <AppText style={styles.quickActionsButtonText}>Play</AppText>
            </View>
          </Pressable>
        </View>
        <View style={styles.quickActionsButton}>
          <Pressable
            onPress={() =>
              loadPlay({
                list: displayedSongs ?? [],
                shuffled: true,
                shuffleMode: "randomStart",
              })
            }
          >
            <View style={styles.quickActionsButtonContainer}>
              <View style={styles.quickActionsButtonContainerIcon}>
                <Ionicons name="shuffle" size={24} color={Colors.primary} />
              </View>
              <AppText style={styles.quickActionsButtonText}>Shuffle</AppText>
            </View>
          </Pressable>
        </View>
      </View>
      <FlatList<Song>
        data={displayedSongs}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item: Song) => String(item.id)}
        renderItem={({ item, index }) => (
          <View style={{ padding: 12 }}>
            <Pressable
              onPress={() =>
                loadPlay({ songIndex: index, list: displayedSongs ?? [] })
              }
            >
              <PlaylistView
                artist={item.artist}
                title={item.title}
                cover={item.coverUrl}
              />
            </Pressable>
          </View>
        )}
      />
      <BottomSheetModalProvider>
        {activeTrack && <Player />}
      </BottomSheetModalProvider>
    </View>
  );
};

export default playlist;

const styles = StyleSheet.create({
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
  trackDetails: { flexDirection: "row", alignItems: "center" },
  tracks: {
    marginVertical: 10,
  },
});
