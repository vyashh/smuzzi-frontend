import { Image, StyleSheet, View } from "react-native";
import { Song } from "types/song";

interface PlaylistCoverProps {
  tracks: Array<Song>;
}

const PlaylistCover = ({ tracks }: PlaylistCoverProps) => {
  return (
    <View style={styles.container}>
      {tracks.map((song) => (
        <Image source={{ uri: song.coverUrl }} />
      ))}
    </View>
  );
};

export default PlaylistCover;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
});
