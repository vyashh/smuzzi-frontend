import {
  FlatList,
  RefreshControl,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { globalStyles, HomeTile } from "../../constants/global";
import CarouselView from "../../components/CarouselView";
import HeaderTitle from "../../components/HeaderTitle";
import Player from "../../components/Player";
import { useActiveTrack } from "react-native-track-player";
import { useHomePlaybackStore } from "utils/homePlaybackStore";
import { useCallback, useEffect, useState } from "react";
import AppText from "@components/AppText";
import { Song } from "types/song";
import Card from "@components/Card";
import { loadPlay } from "utils/trackPlayer";
import { useSongsStore } from "utils/songsStore";

function Home() {
  const userName = "Vyash";
  const activeTrack = useActiveTrack();

  const { songs } = useSongsStore();

  const fetchHome = useHomePlaybackStore((state) => state.fetchHome);
  const isFetching = useHomePlaybackStore((state) => state.isFetching);
  const tiles = useHomePlaybackStore((state) => state.tiles);

  const handlePlay = (songIndex: number) => {
    loadPlay({
      songIndex: songIndex,
      list: songs ?? [],
      context_id: "home",
      context_type: "library",
    });
  };

  const renderTile = useCallback((tile: HomeTile) => {
    switch (tile.type) {
      case "recently_played":
        return <CarouselView data={tile.items} />;
      case "continue_listening":
        return <Card handleTrackPress={handlePlay} data={tile.items} />;
      case "favorites_hub":
        return <Card handleTrackPress={handlePlay} data={tile.items} />;
      case "most_listened_last_week":
        return <Card handleTrackPress={handlePlay} data={tile.items} />;
      case "newly_added":
        return <Card handleTrackPress={handlePlay} data={tile.items} />;

      default: {
        return null;
      }
    }
  }, []);

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  return (
    <ScrollView
      style={globalStyles.container}
      nestedScrollEnabled
      directionalLockEnabled
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={fetchHome} />
      }
    >
      <StatusBar barStyle="default" />
      <View>
        <HeaderTitle>Hi {userName}!</HeaderTitle>
      </View>
      {/* <HeaderTitle type="subheader">Recently played</HeaderTitle> */}
      {tiles?.map((tile, index) => {
        return (
          <View key={index}>
            <HeaderTitle type="subheader" style={styles.viewContainer}>
              {tile.title}
            </HeaderTitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {renderTile(tile)}
            </ScrollView>
          </View>
        );
      })}

      {/* {activeTrack && <Player />} */}
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  viewContainer: {
    marginTop: 35,
  },
  recentlyPlayed: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
});
