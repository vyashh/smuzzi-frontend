import React from "react";
import {
  Image,
  Pressable,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "./AppText";
import PlayerProgressBar from "./PlayerProgressBar";
import LikeButton from "./LikeButton";
import { Colors } from "../constants/colors";
import Queue from "./Queue/Queue";

const PlayerFull = ({
  meta,
  playerState,
  onTogglePlay,
  onChangeSong,
  onClose,
  animatedStyles,
  onOpenQueue,
}) => {
  const { fullStyle, backdropStyle } = animatedStyles;
  return (
    <ImageBackground
      source={{ uri: meta.artworkUri }}
      resizeMethod="cover"
      style={styles.backgroundImage}
      blurRadius={15}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)", "rgba(0,0,0,1)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <Animated.View
        pointerEvents="none"
        style={[styles.backDrop, backdropStyle]}
      />
      <SafeAreaProvider>
        <SafeAreaView>
          <Animated.View style={[styles.fullPlayer, fullStyle]}>
            <View style={styles.fullHeader}>
              <Ionicons
                name="ellipsis-horizontal"
                size={28}
                color={Colors.text}
              />
              <Pressable onPress={onClose}>
                <Ionicons
                  name="chevron-down-outline"
                  size={28}
                  color={Colors.text}
                />
              </Pressable>
            </View>

            <View style={styles.fullBody}>
              <Image
                style={styles.fullCover}
                source={{ uri: meta.artworkUri }}
              />
              <View style={styles.artistDetailsContainer}>
                <View style={styles.artistDetails}>
                  <AppText style={styles.fullTitle}>{meta.title}</AppText>
                  <AppText style={styles.fullArtist}>{meta.artist}</AppText>
                </View>
                <LikeButton trackId={meta.id} />
              </View>

              <View style={styles.progressBar}>
                <PlayerProgressBar />
              </View>

              <View style={styles.fullButtons}>
                <View>
                  <Ionicons name="shuffle" size={24} color={Colors.text} />
                </View>

                <View>
                  <Pressable onPress={() => onChangeSong("prev")}>
                    <Ionicons
                      name="play-skip-back"
                      size={24}
                      color={Colors.text}
                    />
                  </Pressable>
                </View>

                <Pressable onPress={onTogglePlay}>
                  {playerState.state === "playing" ? (
                    <Ionicons
                      name="pause-circle"
                      size={96}
                      color={Colors.text}
                    />
                  ) : (
                    <Ionicons
                      name="play-circle"
                      size={96}
                      color={Colors.text}
                    />
                  )}
                </Pressable>

                <View>
                  <Pressable onPress={() => onChangeSong("next")}>
                    <Ionicons
                      name="play-skip-forward"
                      size={24}
                      color={Colors.text}
                    />
                  </Pressable>
                </View>

                <View>
                  <Pressable onPress={onOpenQueue}>
                    <Ionicons
                      name="list-outline"
                      size={24}
                      color={Colors.text}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default PlayerFull;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  fullPlayer: {
    flex: 1,
    paddingTop: 88,
    alignItems: "center",
    height: "100%",
  },
  fullHeader: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fullBody: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  fullCover: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  artistDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  artistDetails: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  fullTitle: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "700",
  },
  fullArtist: {
    marginTop: 2,
  },
  fullButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
  },
  progressBar: {
    marginTop: 10,
  },
});
