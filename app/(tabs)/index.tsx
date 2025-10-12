import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Link } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { globalStyles } from "../../constants/global";
import AppText from "../../components/AppText";
import CarouselView from "../../components/CarouselView";
import HeaderTitle from "../../components/HeaderTitle";
import { useCallback, useMemo, useRef } from "react";
import Player from "../../components/Player";
import { useActiveTrack } from "react-native-track-player";

function Home() {
  const userName = "Vyash";
  const activeTrack = useActiveTrack();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="default" />
      <View>
        <HeaderTitle style={{ fontSize: 50, marginBottom: 30 }}>
          Hi {userName}!
        </HeaderTitle>
      </View>
      <HeaderTitle>Quick Picks</HeaderTitle>

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
      <HeaderTitle style={{ marginTop: 40 }}>Recently added</HeaderTitle>
      {activeTrack && <Player />}
    </View>
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
