import React from "react";
import { Image, Pressable, View, StyleSheet } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppText from "./AppText";
import { Colors } from "../constants/colors";
import { Song } from "types/song";
import { PlaybackState } from "react-native-track-player";
import { ViewStyle } from "react-native";

interface PlayerMiniProps {
  meta: any;
  playerState: PlaybackState;
  onTogglePlay: () => void;
  onOpen: () => void;
  animatedStyle?: AnimatedStyle<ViewStyle>;
}

const PlayerMini = ({
  meta,
  playerState,
  onTogglePlay,
  onOpen,
  animatedStyle,
}: PlayerMiniProps) => {
  return (
    <Animated.View style={[styles.miniPlayerContainer, animatedStyle]}>
      <Pressable style={styles.row} onPress={onOpen}>
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
        <View>
          <Pressable style={styles.controls} onPress={onTogglePlay}>
            {playerState.state === "playing" ? (
              <Ionicons name="pause" size={32} color={Colors.primary} />
            ) : (
              <Ionicons name="play" size={32} color={Colors.primary} />
            )}
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default PlayerMini;

const styles = StyleSheet.create({
  miniPlayerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 8,
    paddingVertical: 16,
    zIndex: 2, // default; animatedStyle will override as needed
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
});
