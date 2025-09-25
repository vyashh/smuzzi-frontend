import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/globalStyles";
import { useSongsStore } from "../../utils/songsStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../utils/authStore";
import AppText from "../../components/AppText";
import PlaylistView from "../../components/PlaylistView";
import Player from "../../components/Player";
import HeaderTitle from "../../components/HeaderTitle";
import TrackPlayer from "react-native-track-player";
import Ionicons from "@expo/vector-icons/Ionicons";
import { shuffle } from "../../helpers/misc";
import { Asset } from "expo-asset";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function LibraryPage() {
  const { songs, isFetching } = useSongsStore();
  const { serverUrl, accessToken } = useAuthStore();
  const fetchSongs = useSongsStore((state) => state.fetchSongs);
  const DEFAULT_ARTWORK_URI = Asset.fromModule(
    require("../../assets/placeholder-artwork.png")
  ).uri;

  const loadPlay = async (index) => {
    const song = songs[index];

    console.log(song);
    await TrackPlayer.reset();

    try {
      // instant stream original quality
      await TrackPlayer.add({
        id: String(song.id),
        url: `${serverUrl}/api/stream/${song.id}`, // progressive original
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        artwork: song.cover_url || undefined,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await TrackPlayer.play();
      console.log("playing original quality");
    } catch (e) {
      console.log("Progressive failed, retrying with HLS fallback", e);
      await TrackPlayer.reset();
      // hls fallback aac 160k bitrate in the backend
      await TrackPlayer.add({
        id: String(song.id),
        url: `${serverUrl}/api/stream/${song.id}/index.m3u8`, // master
        type: "hls",
        contentType: "application/x-mpegURL",
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        artwork: song.cover_url || undefined,
        headers: { Authorization: `Bearer ${accessToken}` }, // for master only; variants/segments use token
      });
      await TrackPlayer.play();
      console.log("playing aac quality");
    }
  };

  const loadShuffle = async () => {
    await TrackPlayer.stop();

    const shuffledSongs = shuffle(songs);

    shuffledSongs.forEach(async (song) => {
      try {
        // instant stream original quality
        await TrackPlayer.add({
          id: String(song.id),
          url: `${serverUrl}/api/stream/${song.id}`, // progressive original
          title: song.title || "Unknown Title",
          artist: song.artist || "Unknown Artist",
          artwork: song.cover_url || undefined,
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch (e) {
        console.log("Progressive failed, retrying with HLS fallback", e);
        await TrackPlayer.reset();
        // hls fallback aac 160k bitrate in the backend
        await TrackPlayer.add({
          id: String(song.id),
          url: `${serverUrl}/api/stream/${song.id}/index.m3u8`, // master
          type: "hls",
          contentType: "application/x-mpegURL",
          title: song.title || "Unknown Title",
          artist: song.artist || "Unknown Artist",
          artwork: song.cover_url || undefined,
          headers: { Authorization: `Bearer ${accessToken}` }, // for master only; variants/segments use token
        });
      }
    });
    await TrackPlayer.play();
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <View style={globalStyles.container}>
      <HeaderTitle>Library </HeaderTitle>
      <AppText style={styles.tracks}>{songs.length} Tracks</AppText>
      <View style={styles.quickActions}>
        <View style={styles.quickActionsButton}>
          <View style={styles.quickActionsButtonContainer}>
            <View style={styles.quickActionsButtonContainerIcon}>
              <Ionicons name="play-outline" size={24} color={Colors.primary} />
            </View>
            <AppText style={styles.quickActionsButtonText}>Play</AppText>
          </View>
        </View>
        <Pressable onPress={loadShuffle}>
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
      <FlatList
        data={songs}
        refreshing={isFetching}
        onRefresh={fetchSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ padding: 12 }}>
            <Pressable onPress={() => loadPlay(index)}>
              <PlaylistView
                artist={item.artist}
                title={item.title}
                cover={item.cover_url ? item.cover_url : DEFAULT_ARTWORK_URI}
              />
            </Pressable>
          </View>
        )}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
      <BottomSheetModalProvider>
        <Player />
      </BottomSheetModalProvider>
    </View>
  );
}

export default LibraryPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
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
