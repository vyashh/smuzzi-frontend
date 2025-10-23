import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
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
import Queue from "./Queue/Queue";
import { DEFAULT_ARTWORK_URI } from "../constants/global";
import { useSongsStore } from "utils/songsStore";
import { registerTrackChangeStart } from "utils/trackPlayer";

const Player = () => {
  const bottomSheetRef = useRef(null);
  const playerState = usePlaybackState();

  const getPositionSec = async (): Promise<number> => {
    try {
      const { position } = await TrackPlayer.getProgress();
      return Math.max(0, Math.floor(position ?? 0));
    } catch {
      return 0;
    }
  };

  const { setEndPlay } = useSongsStore();

  const MINI_HEIGHT = 80;
  const snapPoints = useMemo(() => [MINI_HEIGHT, "100%"], []);

  const animatedIndex = useSharedValue(0);
  const animatedPosition = useSharedValue(0);

  // queue handling
  const queueModalRef = useRef(null);
  const queueSnapPoints = useMemo(() => ["85%", "85%"], []);

  const openQueue = () => queueModalRef.current?.present();
  const closeQueue = () => queueModalRef.current?.dismiss();

  // active track & meta
  const activeTrack = useActiveTrack();
  const [meta, setMeta] = useState({
    id: activeTrack?.id || null,
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

  const handlePlayState = async () => {
    if (playerState.state === "playing") {
      const position_end_sec = await getPositionSec();
      await setEndPlay({ position_end_sec });

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
      id: activeTrack.id ?? null,
      title: activeTrack.title ?? "Title",
      artist: activeTrack.artist ?? "Artist",
      albumTitle: activeTrack.album ?? "",
      artworkUri: activeTrack.artwork ?? DEFAULT_ARTWORK_URI,
    });
  }, [activeTrack?.id]);

  useEffect(() => {
    const unsubscribe = registerTrackChangeStart();
    return unsubscribe;
  }, []);
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
          onOpenQueue={openQueue}
          onTogglePlay={handlePlayState}
          onChangeSong={changeSong}
          onClose={close}
          animatedStyles={{ fullStyle, backdropStyle }}
        />
        <BottomSheetModal
          ref={queueModalRef}
          snapPoints={queueSnapPoints}
          enablePanDownToClose
          handleStyle={{ backgroundColor: Colors.bg }}
          handleIndicatorStyle={{ backgroundColor: Colors.text }}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={1}
              disappearsOnIndex={-1}
              pressBehavior="close"
              style={[props.style, styles.queueModalContainer]}
            />
          )}
        >
          <BottomSheetView style={{ flex: 1, height: "100%" }}>
            <Queue onClose={closeQueue} />
          </BottomSheetView>
        </BottomSheetModal>
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
  queueModalContainer: {
    backgroundColor: Colors.primaryDark,
  },
});
