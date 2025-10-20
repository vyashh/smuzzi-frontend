// components/Queue.tsx
// Converted to TypeScript. Uses Track from RNTP instead of Song because getQueue()/getActiveTrack() return Track. [TSBP §2]
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";

import SubTitle from "./SubTitle";
import QueueView from "./QueueView";
import { Colors } from "../constants/colors";
import { DEFAULT_ARTWORK_URI } from "../constants/global";

const Queue: React.FC = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);

  const getQueue = async (): Promise<void> => {
    const q = await TrackPlayer.getQueue();
    setQueue(q);
  };

  const getCurrentTrack = async (): Promise<void> => {
    const track = await TrackPlayer.getActiveTrack();
    setNowPlaying(track!);
  };

  useEffect(() => {
    // initial load
    void getQueue();
    void getCurrentTrack();
  }, []);

  return (
    <View style={styles.queueContainer}>
      <View style={styles.header}>
        <SubTitle>Queue</SubTitle>
      </View>

      <FlatList<Track>
        data={queue}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <QueueView
              id={String(item.id)}
              artist={item.artist ?? ""}
              title={item.title ?? ""}
              cover={
                (item.artwork as string | undefined) ?? DEFAULT_ARTWORK_URI
              }
              playing={Boolean(nowPlaying && nowPlaying.id === item.id)}
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
