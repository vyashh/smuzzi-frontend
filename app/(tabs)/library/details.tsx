import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AppText from "@components/AppText";
import { globalStyles, PlaylistType } from "constants/global";
import HeaderTitle from "@components/HeaderTitle";
import { Colors } from "constants/colors";

import { loadPlay } from "utils/trackPlayer";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Player from "@components/Player";
import { Ionicons } from "@expo/vector-icons";
import { useSongsStore } from "utils/songsStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Song } from "types/song";
import PlaylistView from "@components/PlaylistView";
import { useLikeStore } from "utils/likesStore";
import TopBar from "@components/TopBar";
import { usePlaylistsStore } from "utils/playlistsStore";
import { useActiveTrack } from "react-native-track-player";
import OptionsSheetPlaylist, {
  OptionsSheetTrackRef,
} from "@components/Options/OptionsSheetTrack";
import PlaylistActionButtons from "@components/Buttons/PlaylistActionButtons";
import OptionSheetTrack from "@components/Options/OptionsSheetTrack";
import Search from "@components/SearchBar";
import Loader from "@components/Loader";

const playlist = () => {
  const { viewType, title, playlistId } = useLocalSearchParams<{
    viewType: PlaylistType;
    title: string;
    playlistId?: any;
  }>();
  const pid = playlistId != null ? Number(playlistId) : undefined; // ← ensure number

  const optionsRef = useRef<OptionsSheetTrackRef>(null);

  const { songs, isFetching, hasMore, fetchMoreSongs, total } = useSongsStore();
  const fetchSongs = useSongsStore((s) => s.fetchSongs);
  const isSongsFetching = useSongsStore((s) => s.isFetching);

  const { likedSongs } = useLikeStore();
  const fetchLikes = useLikeStore((state) => state.fetchLikes);
  const isLikesFetching = useLikeStore((s) => s.isFetching);

  const fetchPlaylistTracks = usePlaylistsStore((s) => s.fetchPlaylistTracks);
  const playlistTracks = usePlaylistsStore((s) =>
    pid != null ? s.playlistTracksById[pid] : undefined
  );

  const refreshing =
    viewType === "likes" ? isSongsFetching || isLikesFetching : isSongsFetching;

  const activeTrack = useActiveTrack();

  const handleRefresh = () => {
    switch (viewType) {
      case "allTracks":
        console.log("details.tsx fetchSongs()");
        fetchSongs();
        break;
      case "likes":
        console.log("details.tsx fetchLikes()");
        fetchLikes();
        break;
      case "playlist":
        console.log("details.tsx playlist refresh");
        break;

      default:
        break;
    }
  };

  const displayedSongs = useMemo(() => {
    switch (viewType) {
      case "likes":
        return likedSongs;
      case "playlist":
        return playlistTracks;
      case "allTracks":
      default:
        return songs;
    }
  }, [viewType, songs, likedSongs, playlistTracks]);

  const handleOnOpenOptions = (track: Song) => {
    console.log("open options for", track.id);
    optionsRef.current?.present({
      selectedOptionsTrack: track,
    });
  };

  useEffect(() => {
    fetchSongs();
    if (viewType === "likes") fetchLikes();
    if (viewType === "playlist" && pid != null && !playlistTracks) {
      fetchPlaylistTracks(pid);
    }
    console.log(total);
  }, [
    fetchSongs,
    fetchLikes,
    fetchPlaylistTracks,
    viewType,
    pid,
    playlistTracks,
  ]);
  return (
    <BottomSheetModalProvider>
      <View style={[globalStyles.container]}>
        <TopBar showOptions={viewType === "playlist"} />
        <HeaderTitle>{title}</HeaderTitle>
        <View style={styles.trackDetails}>
          <AppText style={styles.tracks}>
            {total ? total : "No tracks in playlist"}
          </AppText>
          <AppText> Tracks</AppText>
        </View>
        <PlaylistActionButtons displayedSongs={displayedSongs} />
        <FlatList<Song>
          data={displayedSongs}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          keyExtractor={(item: Song) => String(item.id)}
          onEndReachedThreshold={0.4}
          onEndReached={() => hasMore && fetchMoreSongs()}
          ListFooterComponent={
            isFetching && songs.length > 0 ? <Loader /> : null
          }
          renderItem={({ item, index }) => (
            <View style={{ paddingVertical: 12 }}>
              <Pressable
                onPress={() =>
                  loadPlay({
                    songIndex: index,
                    list: displayedSongs ?? [],
                    context_id: viewType,
                    context_type: "library",
                  })
                }
              >
                <PlaylistView
                  artist={item.artist}
                  title={item.title}
                  cover={item.coverUrl}
                  onOpenOptions={() => handleOnOpenOptions(item)}
                />
              </Pressable>
            </View>
          )}
        />
        <OptionSheetTrack ref={optionsRef} />

        {activeTrack && <Player />}
      </View>
    </BottomSheetModalProvider>
  );
};

export default playlist;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontSize: 42,
  },
  trackDetails: { flexDirection: "row", alignItems: "center" },
  tracks: {
    marginVertical: 10,
  },
});
