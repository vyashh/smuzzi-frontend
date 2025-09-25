import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useDerivedValue,
} from "react-native-reanimated";
import { Colors } from "../constants/colors";
import TrackPlayer, {
  useActiveTrack,
  usePlaybackState,
} from "react-native-track-player";
import { Asset } from "expo-asset";

import PlayerMini from "./PlayerMini";
import PlayerFull from "./PlayerFull";

const Player = () => {
  const bottomSheetRef = useRef(null);
  const playerState = usePlaybackState();

  const MINI_HEIGHT = 80;
  const snapPoints = useMemo(() => [MINI_HEIGHT, "100%"], []);

  const animatedIndex = useSharedValue(0);
  const animatedPosition = useSharedValue(0);

  const [showQueue, setShowQueue] = useState(false); // still available if you need it
  const DEFAULT_ARTWORK_URI = Asset.fromModule(
    require("../assets/placeholder-artwork.png")
  ).uri;

  // active track & meta
  const activeTrack = useActiveTrack();
  const [meta, setMeta] = useState({
    title: activeTrack?.title || "Title",
    artist: activeTrack?.artist || "Artist",
    artworkUri: activeTrack?.artwork || DEFAULT_ARTWORK_URI,
    albumTitle: activeTrack?.album || "",
  });

  // animate progress between mini (0) and full (1)
  const progress = useSharedValue(0);
  useDerivedValue(() => {
    progress.value = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );
  });

  // Animated styles for the two views
  const miniStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      opacity: 1 - p,
      transform: [
        {
          translateY: interpolate(
            p,
            [0, 1],
            [0, -MINI_HEIGHT / 2],
            Extrapolation.CLAMP
          ),
        },
      ],
      zIndex: interpolate(p, [0, 1], [2, 0], Extrapolation.CLAMP),
    };
  });

  const fullStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      opacity: p,
      transform: [
        { scale: interpolate(p, [0, 1], [0.96, 1], Extrapolation.CLAMP) },
      ],
      zIndex: interpolate(p, [0, 1], [-1, 2], Extrapolation.CLAMP),
      elevation: interpolate(p, [0, 1], [0, 8], Extrapolation.CLAMP),
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return { opacity: interpolate(p, [0, 1], [0.6, 0.1], Extrapolation.CLAMP) };
  });

  // controls
  const open = () => bottomSheetRef.current?.snapToIndex(1);
  const close = () => bottomSheetRef.current?.snapToIndex(0);

  const handlePlayState = () => {
    if (playerState.state === "playing") {
      TrackPlayer.pause();
    } else if (playerState.state === "paused") {
      TrackPlayer.play();
    }
  };

  const changeSong = (action) => {
    if (action === "prev") {
      TrackPlayer.skipToPrevious();
    } else {
      TrackPlayer.skipToNext();
    }
  };

  useEffect(() => {
    if (!activeTrack) return;
    setMeta({
      title: activeTrack.title ?? "Title",
      artist: activeTrack.artist ?? "Artist",
      albumTitle: activeTrack.album ?? "",
      artworkUri: activeTrack.artwork ?? DEFAULT_ARTWORK_URI,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack?.id]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      handleStyle={{ display: "none" }}
      animatedIndex={animatedIndex}
      animatedPosition={animatedPosition}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={styles.playerContainer}>
        {/* Mini Player */}
        <PlayerMini
          meta={meta}
          playerState={playerState}
          onTogglePlay={handlePlayState}
          onOpen={open}
          animatedStyle={miniStyle}
        />

        {/* Full Player */}
        <PlayerFull
          meta={meta}
          playerState={playerState}
          onTogglePlay={handlePlayState}
          onChangeSong={changeSong}
          onClose={close}
          animatedStyles={{ fullStyle, backdropStyle }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Player;

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: Colors.bg,
    height: "100%",
  },
});
