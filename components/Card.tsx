import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import { Song } from "types/song";
import AppText from "./AppText";
import { DEFAULT_ARTWORK_URI } from "constants/global";
import { Colors } from "constants/colors";

interface CardProps {
  data: Song[];
  handleTrackPress?: (songIndex: number) => void;
}

const Card = ({ data, handleTrackPress }: CardProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(song, i) =>
        String(song["track_id"] ?? song.id ?? i) + ":" + i
      }
      numColumns={20}
      renderItem={(tile) => {
        const song = tile.item;
        return (
          <Pressable
            onPress={() => handleTrackPress?.(song["track_id"])}
            style={styles.container}
          >
            <Image
              style={styles.image}
              source={{ uri: song["cover_url"] || DEFAULT_ARTWORK_URI }}
              resizeMode="cover"
            />
            <AppText
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {song.title || "Title"}
            </AppText>
            <AppText
              style={styles.artist}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {song.artist || "Artist"}
            </AppText>
          </Pressable>
        );
      }}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // height: 150,
    width: 100,
    marginRight: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  artist: {
    fontWeight: "bold",
    fontSize: 12,
    opacity: 0.5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
