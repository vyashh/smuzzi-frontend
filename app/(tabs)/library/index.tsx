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
import { usePlaylistsStore } from "utils/playlistsStore";

function LibraryPage() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const fetchPlaylists = usePlaylistsStore((state) => state.fetchPlaylists);

  const handleOnpressShowPlaylist = (
    viewType: PlaylistType,
    title: string,
    playlistId?: number
  ) => {
    router.push({
      pathname: "/(tabs)/library/details",
      params: { viewType, title, playlistId },
    });
  };

  const handleOnpressCreatePlaylist = () => {
    router.push({
      pathname: "/(tabs)/library/new-playlist",
    });
  };

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

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
        <FlatList
          style={{ flex: 1 }}
          data={playlists}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              onPress={() =>
                handleOnpressShowPlaylist(
                  "playlist",
                  item.name || "Playlist",
                  item.id
                )
              }
            >
              <LibraryPlaylistView
                title={item.name || "Playlist"}
                viewType="playlist"
                playlistId={item.id}
              />
            </Pressable>
          )}
        />
        {/* {playlists.map((playlist) => (
          <Pressable
            key={playlist.id}
            onPress={() =>
              handleOnpressShowPlaylist(
                "playlist",
                playlist.name || "Playlist",
                playlist.id
              )
            }
          >
            <LibraryPlaylistView
              title={playlist.name || "Playlist"}
              viewType="playlist"
              playlistId={playlist.id}
            />
          </Pressable>
        ))} */}
        {/* Static Playlists for UI purposes */}
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
    flex: 1,
    width: "100%",
  },
});
