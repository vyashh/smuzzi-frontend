import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import AppText from "./AppText";
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
      keyExtractor={(_, i) => `col-${i}`}
      showsHorizontalScrollIndicator={true}
      numColumns={3}
      renderItem={(tile) => {
        const song = tile.item;
        return (
          <View style={styles.container}>
            <View>
              <Image style={styles.cover} source={{ uri: song["cover_url"] }} />
            </View>
            <View style={styles.details}>
              <AppText style={styles.detailsTitle}>
                {song.title || "Title"}
              </AppText>
              <AppText>{song.artist || "Artist"}</AppText>
            </View>
          </View>
        );
      }}
    />
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
