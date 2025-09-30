import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AppText from "@components/AppText";
import { globalStyles } from "constants/global";
import HeaderTitle from "@components/HeaderTitle";
import { Colors } from "constants/colors";

import { loadPlay } from "utils/trackPlayer";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Player from "@components/Player";
import { Ionicons } from "@expo/vector-icons";
import { useSongsStore } from "utils/songsStore";
import { useAuthStore } from "utils/authStore";
import { useEffect } from "react";

const playlist = () => {
  const { songs, isFetching } = useSongsStore();
  const { serverUrl, accessToken } = useAuthStore();
  const fetchSongs = useSongsStore((state) => state.fetchSongs);

  useEffect(() => {
    fetchSongs();
  }, [songs, fetchSongs]);

  return (
    <View style={globalStyles.container}>
      {/* <HeaderTitle>Library</HeaderTitle> */}
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
      {/* <FlatList
          data={songs}
          refreshing={isFetching}
          onRefresh={fetchSongs}
          keyExtractor={(item: number) => item.id}
          renderItem={({ item, index }) => (
            <View style={{ padding: 12 }}>
              <Pressable onPress={() => loadPlay({ songIndex: index })}>
                <PlaylistView
                  artist={item.artist}
                  title={item.title}
                  cover={item.coverUrl}
                />
              </Pressable>
            </View>
          )}
          ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
        /> */}
      <BottomSheetModalProvider>
        <Player />
      </BottomSheetModalProvider>
    </View>
  );
};

export default playlist;

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
