import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/globalStyles";
import CarouselView from "../../components/CarouselView";
import { useSongsStore } from "../../utils/songsStore";
import { useEffect } from "react";
import { useAuthStore } from "../../utils/authStore";
import AppText from "../../components/AppText";
import PlaylistView from "../../components/PlaylistView";

function LibraryPage() {
  const { serverUrl, accessToken } = useAuthStore();
  const { songs, isFetching } = useSongsStore();
  const fetchSongs = useSongsStore((state) => state.fetchSongs);

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>Library </Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <PlaylistView
              artist={item.artist}
              title={item.title}
              cover={item.cover_url}
              duration={item.duration}
            />
          </View>
        )}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
      />
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
