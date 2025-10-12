import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";

interface CarouselViewProps {
  title?: string;
  artist?: string;
  coverUrl?: string;
}

const CarouselView = ({ title, artist, coverUrl }: CarouselViewProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.cover}
          source={{ uri: coverUrl || "https://placehold.co/600x600.png" }}
        />
      </View>
      <View style={styles.details}>
        <AppText style={styles.detailsTitle}>{title || "Title"}</AppText>
        <AppText>{artist || "Artist"}</AppText>
      </View>
    </View>
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: 100,
  },
  cover: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {},
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
