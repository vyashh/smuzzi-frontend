import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, Pressable, View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import AppText from "./AppText";
import { Colors } from "../constants/colors";
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  useActiveTrack,
} from "react-native-track-player";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Player = () => {
  const bottomSheetRef = useRef(null);

  const MINI_HEIGHT = 80;
  const snapPoints = useMemo(() => [MINI_HEIGHT, "100%"], []);

  const animatedIndex = useSharedValue(0);
  const animatedPosition = useSharedValue(0);

  // get active track here
  const activeTrack = useActiveTrack();
  const [meta, setMeta] = useState({
    title: activeTrack?.title || "Title",
    artist: activeTrack?.artist || "Artist",
    artworkUri: activeTrack?.artwork,
    albumTitle: activeTrack?.album,
  });

  const useTrackPlayerEvents =
    ([Event.AudioCommonMetadataReceived, Event.AudioMetadataReceived],
    async (e) => {
      if (e.type === Event.AudioCommonMetadataReceived && e.metadata) {
        const next = {
          title: e.metadata.title ?? meta.title,
          artist: e.metadata.artist ?? meta.artist,
          albumTitle: e.metadata.albumTitle ?? meta.albumTitle,
          artworkUri: e.metadata.artworkUri ?? meta.artworkUri,
        };
        setMeta(next);

        // Update lock screen / notification *without* touching the queue
        try {
          await TrackPlayer.updateNowPlayingMetadata({
            title: next.title,
            artist: next.artist,
            albumTitle: next.albumTitle,
            artwork: next.artworkUri,
          });
        } catch {}
      }
    });

  // MINI player fades out
  const miniStyle = useAnimatedStyle(() => {
    const p = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );
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
    };
  });

  // fading dingen
  const fullStyle = useAnimatedStyle(() => {
    const p = interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity: p,
      transform: [
        { scale: interpolate(p, [0, 1], [0.96, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  const open = () => bottomSheetRef.current?.snapToIndex(1);
  const close = () => bottomSheetRef.current?.snapToIndex(0);

  useEffect(() => {
    if (!activeTrack) return;
    setMeta({
      title: activeTrack.title ?? "Title",
      artist: activeTrack.artist ?? "Artist",
      albumTitle: activeTrack.album,
      artworkUri: activeTrack.artwork,
    });
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
        {/* mini player view */}
        <Animated.View style={[styles.miniPlayerContainer, miniStyle]}>
          <Pressable style={styles.row} onPress={open}>
            <Image style={styles.cover} source={{ uri: meta.artworkUri }} />
            <View style={styles.details}>
              <AppText
                style={styles.detailsTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {meta.title}
              </AppText>
              <AppText numberOfLines={1}>{meta.artist}</AppText>
            </View>
            <View style={styles.controls}>
              <AppText>Play</AppText>
            </View>
          </Pressable>
        </Animated.View>
        {/* full player view */}
        <SafeAreaProvider>
          <SafeAreaView>
            <Animated.View style={[styles.fullPlayer, fullStyle]}>
              <View style={styles.fullHeader}>
                <Pressable onPress={close}>
                  <AppText>Close</AppText>
                </Pressable>
              </View>

              <View style={styles.fullBody}>
                <Image
                  style={styles.fullCover}
                  source={{ uri: meta.artworkUri }}
                />
                <AppText style={styles.fullTitle}>{meta.title}</AppText>
                <AppText style={styles.fullArtist}>{meta.artist}</AppText>

                {/* timeline / controls here */}
                <View style={{ height: 24 }} />
                <AppText>⏮ ⏯ ⏭</AppText>
              </View>
            </Animated.View>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Player;

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: Colors.bg,
    height: "100%",
    borderTopColor: Colors.surface,
    borderTopWidth: 1,
    paddingBottom: 8,
  },
  miniPlayerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
  },
  controls: {
    marginLeft: 8,
  },
  fullPlayer: {
    flex: 1,
    paddingTop: 88, // keeps space so mini doesn't overlap during drag
    alignItems: "center",
  },
  fullHeader: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fullBody: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  fullCover: {
    width: 260,
    height: 260,
    borderRadius: 12,
    marginBottom: 16,
  },
  fullTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  fullArtist: {
    opacity: 0.7,
    marginTop: 2,
  },
});
