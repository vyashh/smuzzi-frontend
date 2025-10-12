import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { FlatList } from "react-native-gesture-handler";
import { Song } from "types/song";
import { useEffect } from "react";

interface CarouselViewProps {
  data: Song[];
}

const CarouselView = ({ data }: CarouselViewProps) => {
  useEffect(() => console.log("props CarouselView():", data));
  return (
    <FlatList
      data={data}
      keyExtractor={(song: Song) => String(song.id)}
      renderItem={(tile) => {
        return <AppText>{tile.item.artist}</AppText>;
      }}
    ></FlatList>
  );
};

// <View>
//   <Image style={styles.cover} source={{ uri: coverUrl }} />
// </View>
// <View style={styles.details}>
//   <AppText style={styles.detailsTitle}>{title || "Title"}</AppText>
//   <AppText>{artist || "Artist"}</AppText>
// </View>
export default CarouselView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: 100,
  },
  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {},
  detailsTitle: {
    // fontSize: 18,
    fontWeight: "bold",
  },
});
