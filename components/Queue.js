import BottomSheet from "@gorhom/bottom-sheet";
import AppText from "./AppText";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { DEFAULT_ARTWORK_URI, globalStyles } from "../constants/global";
import TrackPlayer from "react-native-track-player";
import QueueView from "./QueueView";
import SubTitle from "./SubTitle";
import { useEffect, useState } from "react";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getQueue = async () => {
    await TrackPlayer.getQueue().then((queue) => {
      setQueue(queue);
    });
  };

  const getCurrentTrack = async () => {
    await TrackPlayer.getActiveTrack().then((track) => {
      setNowPlaying(track);
    });
  };

  useEffect(() => {
    getQueue();
    getCurrentTrack();
  }, [queue, getQueue, nowPlaying, getCurrentTrack]);

  return (
    <View style={[styles.queueContainer]}>
      <View style={styles.header}>
        <SubTitle>Queue</SubTitle>
      </View>
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ padding: 12 }}>
            {/* <Pressable onPress={() => loadPlay(index)}> */}
            <QueueView
              id={item.id}
              artist={item.artist}
              title={item.title}
              cover={item.artwork ? item.artwork : DEFAULT_ARTWORK_URI}
              playing={nowPlaying.id === item.id && true}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Queue;

const styles = StyleSheet.create({
  queueContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 12,
  },
  header: {
    paddingBottom: 10,
  },
});
