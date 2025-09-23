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
    try {
      // clear any previous queue
      await TrackPlayer.reset();

      // add selected song
      await TrackPlayer.add({
        id: String(song.id),
        url: `${serverUrl}/api/stream/${song.id}`,
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        artwork: song.cover_url || undefined,
      });

      await TrackPlayer.play();
      console.log("Playing:", song.title);
    } catch (err) {
      console.error("Playback error:", err);
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
