import { ViewStyle } from "react-native";
import { Image, StyleProp, StyleSheet, View } from "react-native";
import { Song } from "types/song";

interface PlaylistCoverProps {
  tracks: Song[];
  style?: StyleProp<ViewStyle>;
}

const PlaylistCover = ({ tracks, style }: PlaylistCoverProps) => {
  const items = tracks.slice(0, 4);
  const isGrid4 = items.length === 4;

  return (
    <View style={[styles.container, isGrid4 && styles.gridContainer, style]}>
      {items.map((song) => (
        <Image
          key={song.id}
          source={{ uri: song.coverUrl }}
          resizeMode="cover"
          style={isGrid4 ? styles.gridTile : styles.rowTile}
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
  gridContainer: {
    flexWrap: "wrap", // enables 2 rows
  },
  // For 4 tracks → 2x2
  gridTile: {
    width: "50%",
    height: "50%",
  },
  // For 1–3 tracks → current behavior (row split)
  rowTile: {
    flex: 1,
    height: "100%",
  },
});
