import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";
import { DEFAULT_ARTWORK_URI, globalStyles } from "../../../constants/global";
import { useSongsStore } from "../../../utils/songsStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../utils/authStore";
import AppText from "../../../components/AppText";
import PlaylistView from "../../../components/PlaylistView";
import Player from "../../../components/Player";
import HeaderTitle from "../../../components/HeaderTitle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { loadPlay } from "utils/trackPlayer";
import LibraryPlaylistView from "@components/LibraryPlaylistView";

function LibraryPage() {
  const { songs, isFetching } = useSongsStore();
  const { serverUrl, accessToken } = useAuthStore();
  const fetchSongs = useSongsStore((state) => state.fetchSongs);

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <View style={globalStyles.container}>
      <HeaderTitle>Library</HeaderTitle>
      <View style={styles.playlists}>
        <LibraryPlaylistView title="My Likes" viewType="likes" />
        <LibraryPlaylistView title="All Tracks" viewType="allTracks" />
        <LibraryPlaylistView title="Random playlist name" viewType="playlist" />
        <LibraryPlaylistView
          title="Another random Playlist name"
          viewType="playlist"
        />
        <LibraryPlaylistView title="Driving shit boi" viewType="playlist" />
        <LibraryPlaylistView title="ay" viewType="playlist" />
      </View>

      <BottomSheetModalProvider>
        <Player />
      </BottomSheetModalProvider>
    </View>
  );
}

export default LibraryPage;

const styles = StyleSheet.create({
  playlists: {
    height: 60,
    width: "100%",
  },
});
