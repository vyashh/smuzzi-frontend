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
import { useEffect } from "react";
import { useAuthStore } from "../../utils/authStore";
import AppText from "../../components/AppText";
import PlaylistView from "../../components/PlaylistView";
import Player from "../../components/Player";
import HeaderTitle from "../../components/HeaderTitle";
import TrackPlayer from "react-native-track-player";

function LibraryPage() {
  const { songs, isFetching } = useSongsStore();
  const { serverUrl, accessToken } = useAuthStore();
  const fetchSongs = useSongsStore((state) => state.fetchSongs);

  const loadQueue = async (song) => {
    await TrackPlayer.reset();

    try {
      // 1) Progressive (instant, scrubbable, zero disk)
      await TrackPlayer.add({
        id: String(song.id),
        url: `${serverUrl}/api/stream/${song.id}`, // progressive original
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        artwork: song.cover_url || undefined,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await TrackPlayer.play();
    } catch (e) {
      console.log("Progressive failed, retrying with HLS fallback", e);
      await TrackPlayer.reset();
      // 2) HLS fallback (ephemeral)
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
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <View style={globalStyles.container}>
      <HeaderTitle>Library </HeaderTitle>
      <AppText>{songs.length} Songs</AppText>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <Pressable onPress={() => loadQueue(item)}>
              <PlaylistView
                artist={item.artist}
                title={item.title}
                cover={item.cover_url}
                // duration={item.duration}
              />
            </Pressable>
          </View>
        )}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
      <Player />
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
});
