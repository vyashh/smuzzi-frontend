import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { globalStyles } from "../../constants/global";
import CarouselView from "../../components/CarouselView";
import HeaderTitle from "../../components/HeaderTitle";
import Player from "../../components/Player";
import { useActiveTrack } from "react-native-track-player";
import { useHomePlaybackStore } from "utils/homePlaybackStore";
import { useEffect } from "react";

function Home() {
  const userName = "Vyash";
  const activeTrack = useActiveTrack();

  const fetchHome = useHomePlaybackStore((state) => state.fetchHome);
  const tiles = useHomePlaybackStore((state) => state.tiles);

  useEffect(() => {
    fetchHome();

    tiles && console.log(tiles);
  }, [fetchHome]);

  return (
    <ScrollView style={globalStyles.container}>
      <StatusBar barStyle="default" />
      <View>
        <HeaderTitle style={{ marginBottom: 30 }}>Hi {userName}!</HeaderTitle>
      </View>
      <HeaderTitle type="subheader">Recently played</HeaderTitle>

      <View style={styles.quickPicksContainer}>
        <View>
          <CarouselView />
          <CarouselView />
          <CarouselView />
          <CarouselView />
        </View>
        <View>
          <CarouselView />
          <CarouselView />
          <CarouselView />
          <CarouselView />
        </View>
        <View>
          <CarouselView />
          <CarouselView />
          <CarouselView />
          <CarouselView />
        </View>
      </View>
      <HeaderTitle type="subheader" style={{ marginTop: 40 }}>
        Most listened last week
      </HeaderTitle>
      <HeaderTitle type="subheader" style={{ marginTop: 40 }}>
        Continue listening
      </HeaderTitle>
      <HeaderTitle type="subheader" style={{ marginTop: 40 }}>
        Favorites
      </HeaderTitle>
      <HeaderTitle type="subheader" style={{ marginTop: 40 }}>
        Newly added
      </HeaderTitle>
      {activeTrack && <Player />}
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  quickPicksContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
});
