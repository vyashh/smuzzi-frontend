import BottomSheet from "@gorhom/bottom-sheet";
import AppText from "./AppText";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { DEFAULT_ARTWORK_URI, globalStyles } from "../constants/globalStyles";
import TrackPlayer from "react-native-track-player";
import QueueView from "./QueueView";
import SubTitle from "./SubTitle";
import { useEffect, useState } from "react";

const Queue = () => {
  const [queue, setQueue] = useState([]);

  const getQueue = async () => {
    TrackPlayer.getQueue().then((queue) => {
      setQueue(queue);
    });
  };

  useEffect(() => {
    getQueue();
  }, [queue, getQueue]);

  return (
    <View style={[style.queueContainer]}>
      <SubTitle>Queue</SubTitle>
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ padding: 12 }}>
            {/* <Pressable onPress={() => loadPlay(index)}> */}
            <QueueView
              artist={item.artist}
              title={item.title}
              cover={item.artwork ? item.artwork : DEFAULT_ARTWORK_URI}
            />
            {/* </Pressable> */}
          </View>
        )}
      />
    </View>
  );
};

export default Queue;

const style = StyleSheet.create({
  queueContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.bg,
    paddingHorizontal: 12,
  },
});
