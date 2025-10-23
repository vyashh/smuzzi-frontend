import { Image, Pressable, StyleSheet, View } from "react-native";
import AppText from "../AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/colors";
import TrackPlayer from "react-native-track-player";

interface QueueViewProps {
  index: number;
  title: string;
  artist: string;
  cover: string;
  playing: boolean;
  handleQueueChange: (songIndex: number) => void;
  onLongPress?: () => void;
}

const QueueView = ({
  index,
  title,
  artist,
  cover,
  playing = false,
  handleQueueChange,
  onLongPress,
}: QueueViewProps) => {
  const handleTrackSelection = async () => {
    const activeIndex = await TrackPlayer.getActiveTrackIndex(); // v3
    if (activeIndex === index) return;
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    handleQueueChange(index);
  };

  return (
    <Pressable
      style={[styles.container]}
      onPress={handleTrackSelection}
      onLongPress={onLongPress}
    >
      <View>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
      <View style={[styles.details]}>
        <AppText
          style={[
            styles.detailsTitle,
            { width: 250 },
            playing && styles.activeTrack,
          ]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {title}
        </AppText>
        <View>
          <AppText
            style={[{ width: 250 }, playing && styles.activeTrack]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {artist}
          </AppText>
        </View>
      </View>
      <View>
        {!playing && (
          <Ionicons name="menu-outline" size={32} color={Colors.textMuted} />
        )}
      </View>
    </Pressable>
  );
};

export default QueueView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {
    justifyContent: "center",
  },
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
    height: "auto",
  },
  activeTrack: {
    color: Colors.primary,
  },
});
