import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { formatSecondsToMinutes } from "../helpers/misc";
import AppText from "./AppText";

export default function PlayerProgressBar() {
  const { duration = 0, position = 0 } = useProgress(250);
  const value = duration > 0 ? position / duration : 0;

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  const onSlidingComplete = async (vals) => {
    const v = Array.isArray(vals) ? vals[0] : vals; // component can return array
    if (duration > 0) await TrackPlayer.seekTo(v * duration);
  };

  return (
    <View style={styles.container}>
      <Slider
        value={value}
        onSlidingComplete={onSlidingComplete}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#555"
        thumbTintColor="#fff"
        thumbStyle={{ width: 12, height: 12, borderRadius: 6 }}
      />
      <View style={styles.row}>
        <AppText>{trackElapsedTime}</AppText>
        <AppText>{trackRemainingTime}</AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  time: { color: "#bbb", fontSize: 12 },
});
