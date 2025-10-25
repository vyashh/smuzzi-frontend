import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { globalStyles, PlaylistType } from "../../../constants/global";
import { useEffect, useRef, useState } from "react";
import Player from "../../../components/Player";
import HeaderTitle from "../../../components/HeaderTitle";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import LibraryPlaylistView from "../../../components/LibraryPlaylistView";
import { router } from "expo-router";
import CreatePlaylist from "@components/CreatePlaylist";
import { usePlaylistsStore } from "utils/playlistsStore";
import OptionsSheetPlaylist, {
  OptionsSheetRef,
} from "@components/Options/OptionsSheetPlaylist";
import { Playlist } from "types/playlist";
import { useActiveTrack } from "react-native-track-player";
import Search from "@components/SearchBar";

function LibraryPage() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const fetchPlaylists = usePlaylistsStore((state) => state.fetchPlaylists);
  useState<Playlist | null>(null);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);

  const activeTrack = useActiveTrack();

  const optionsRef = useRef<OptionsSheetRef>(null);

  const handleOnpressShowPlaylist = (
    viewType: PlaylistType,
    title: string,
    playlistId?: number
  ) => {
    console.log("handleOnPressShowPlaylist()");
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

  const handleOnOpenOptions = (playlist: Playlist) => {
    console.log("open options for", playlist.id);
    optionsRef.current?.present({
      selectedOptionsPlaylist: playlist,
    });
  };

  useEffect(() => {
    fetchPlaylists();
    console.log(searchFocus);
  }, [fetchPlaylists, searchFocus]);

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <HeaderTitle>Library</HeaderTitle>
        <Pressable onPress={handleOnpressCreatePlaylist}>
          <CreatePlaylist />
        </Pressable>
        <Search
          setOnFocus={setSearchFocus}
          searchPlaylist={playlists}
          placeholder="Search Playlists"
          showSearchIcon={true}
        />
        {!searchFocus && (
          <View style={styles.playlists}>
            <LibraryPlaylistView
              handleOnPressPlaylist={() =>
                handleOnpressShowPlaylist("likes", "Likes")
              }
              title="My Likes"
              viewType="likes"
              options={false}
            />
            <LibraryPlaylistView
              title="All Tracks"
              viewType="allTracks"
              handleOnPressPlaylist={() =>
                handleOnpressShowPlaylist("allTracks", "All Tracks")
              }
              options={false}
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
                  onOpenOptions={() => handleOnOpenOptions(item)}
                />
              )}
            />
            <OptionsSheetPlaylist ref={optionsRef} />
          </View>
        )}
      </View>
      {activeTrack && <Player />}
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
