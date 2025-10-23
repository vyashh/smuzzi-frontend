import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from "react-native-track-player";

import SubTitle from "../SubTitle";
import QueueView from "./QueueView";
import { Colors } from "../../constants/colors";
import { DEFAULT_ARTWORK_URI } from "../../constants/global";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

const Queue = () => {
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

  const handleQueueChange = async (songIndex: number) => {
    const newQueue = queue.slice(songIndex);
    await TrackPlayer.setQueue(newQueue);
  };

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (e) => {
    if (e.type === Event.PlaybackActiveTrackChanged) {
      if (e.lastIndex != null) {
        await TrackPlayer.remove(e.lastIndex);
      }
      void getQueue();
      void getCurrentTrack();
    }
  });

  const renderItem = ({ item, getIndex, drag }: RenderItemParams<Track>) => {
    const idx = getIndex?.();
    const index =
      typeof idx === "number" ? idx : queue.findIndex((q) => q.id === item.id);
    return (
      <View style={{ padding: 12 }}>
        <QueueView
          index={index}
          artist={item.artist ?? ""}
          title={item.title ?? ""}
          cover={(item.artwork as string | undefined) ?? DEFAULT_ARTWORK_URI}
          playing={Boolean(nowPlaying && nowPlaying.id === item.id)}
          handleQueueChange={handleQueueChange}
          onLongPress={drag}
        />
      </View>
    );
  };

  useEffect(() => {
    // initial load
    getQueue();
    getCurrentTrack();
  }, []);

  return (
    <View style={styles.queueContainer}>
      <View style={styles.header}>
        <SubTitle>Queue</SubTitle>
      </View>

      <DraggableFlatList
        data={queue}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        activationDistance={10}
        onDragEnd={async ({ data, from, to }) => {
          setQueue(data);
          if (from !== to) {
            await TrackPlayer.move(from, to);
          }
        }}
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
