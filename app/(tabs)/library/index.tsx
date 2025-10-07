import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { globalStyles, PlaylistType } from "../../../constants/global";
import { useEffect, useRef, useState } from "react";
import Player from "../../../components/Player";
import HeaderTitle from "../../../components/HeaderTitle";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import LibraryPlaylistView from "@components/LibraryPlaylistView";
import { router } from "expo-router";
import CreatePlaylist from "@components/CreatePlaylist";
import { usePlaylistsStore } from "utils/playlistsStore";
import OptionSheet, { OptionsSheetRef } from "@components/OptionsSheet";

function LibraryPage() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const fetchPlaylists = usePlaylistsStore((state) => state.fetchPlaylists);

  const optionsRef = useRef<OptionsSheetRef>(null);
  const openOptions = () => optionsRef.current?.present();

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
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <HeaderTitle>Library</HeaderTitle>
        <Pressable onPress={handleOnpressCreatePlaylist}>
          <CreatePlaylist />
        </Pressable>
        <View style={styles.playlists}>
          <LibraryPlaylistView
            handleOnPressPlaylist={() =>
              handleOnpressShowPlaylist("likes", "Likes")
            }
            title="My Likes"
            viewType="likes"
          />
          <LibraryPlaylistView
            title="All Tracks"
            viewType="allTracks"
            handleOnPressPlaylist={() =>
              handleOnpressShowPlaylist("allTracks", "All Tracks")
            }
          />
          <FlatList
            style={{ flex: 1 }}
            data={playlists}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <LibraryPlaylistView
                title={item.name || "Playlist"}
                viewType="playlist"
                playlistId={item.id}
                handleOnPressPlaylist={() =>
                  handleOnpressShowPlaylist(
                    "playlist",
                    item.name || "Playlist",
                    item.id
                  )
                }
                onOpenOptions={openOptions}
              />
            )}
          />
          <OptionSheet ref={optionsRef} />
        </View>

        <Player />
      </View>
    </BottomSheetModalProvider>
  );
}

export default LibraryPage;

const styles = StyleSheet.create({
  playlists: {
    flex: 1,
    width: "100%",
    marginBottom: 80,
  },
});
