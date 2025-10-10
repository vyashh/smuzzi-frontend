import { ViewStyle } from "react-native";
import { Image, StyleProp, StyleSheet, View } from "react-native";
import { Song } from "types/song";

interface PlaylistCoverProps {
  tracks: Array<Song>;
  style?: StyleProp<ViewStyle>;
}

const PlaylistCover = ({ tracks, style }: PlaylistCoverProps) => {
  console.log(tracks.length);
  return (
    <View style={[styles.container, style]}>
      {tracks.map((song) => (
        <Image
          key={song.id}
          style={styles.tile}
          resizeMode="cover"
          source={{ uri: song.coverUrl }}
        />
      ))}
    </View>
  );
};

export default PlaylistCover;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    flexDirection: "row",
    overflow: "hidden",
  },
  tile: {
    flex: 1,
    height: "100%",
  },
});
