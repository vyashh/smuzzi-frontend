import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Song } from "types/song";
import { useEffect } from "react";
import { Dimensions } from "react-native";

interface CarouselViewProps {
  data: Song[];
}

const NUM_COLS = 3;
const GAP = 12;
const SCREEN_W = Dimensions.get("window").width;
const ITEM_W = Math.floor((SCREEN_W - GAP * (NUM_COLS + 1)) / NUM_COLS);

const CarouselView = ({ data }: CarouselViewProps) => {
  useEffect(() => console.log("props CarouselView():", data));
  return (
    <FlatList
      data={data}
      keyExtractor={(s) => String(s.id)} // prefer stable key [TSBP §Keys]
      numColumns={NUM_COLS}
      contentContainerStyle={{ padding: GAP, rowGap: GAP }}
      columnWrapperStyle={{ columnGap: GAP }}
      renderItem={(tile) => {
        const song = tile.item;
        return (
          <View style={[styles.container, { width: ITEM_W }]}>
            {" "}
            <View>
              <Image style={styles.cover} source={{ uri: song["cover_url"] }} />
            </View>
            <View style={styles.details}>
              <AppText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.detailsTitle}
              >
                {song.title || "Title"}
              </AppText>
              <AppText numberOfLines={1} ellipsizeMode="tail">
                {song.artist || "Artist"}
              </AppText>
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
    marginRight: 65,
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
