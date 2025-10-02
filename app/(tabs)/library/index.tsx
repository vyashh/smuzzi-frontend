import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";
import {
  DEFAULT_ARTWORK_URI,
  globalStyles,
  PlaylistType,
} from "../../../constants/global";
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
import { router } from "expo-router";
import CreatePlaylist from "@components/CreatePlaylist";

function LibraryPage() {
  const fetchSongs = useSongsStore((state) => state.fetchSongs);

  const handleOnpressShowPlaylist = (viewType: PlaylistType, title: string) => {
    router.push({
      pathname: "/(tabs)/library/details",
      params: { viewType, title },
    });
  };

  const handleOnpressCreatePlaylist = () => {
    console.log("hey");
    router.push({
      pathname: "/(tabs)/library/new-playlist",
    });
  };

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <View style={globalStyles.container}>
      <HeaderTitle>Library</HeaderTitle>
      <Pressable onPress={handleOnpressCreatePlaylist}>
        <CreatePlaylist />
      </Pressable>
      <View style={styles.playlists}>
        <Pressable onPress={() => handleOnpressShowPlaylist("likes", "Likes")}>
          <LibraryPlaylistView title="My Likes" viewType="likes" />
        </Pressable>
        <Pressable
          onPress={() => handleOnpressShowPlaylist("allTracks", "All Tracks")}
        >
          <LibraryPlaylistView title="All Tracks" viewType="allTracks" />
        </Pressable>
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
