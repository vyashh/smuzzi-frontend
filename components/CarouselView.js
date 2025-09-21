import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";

const CarouselView = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.cover}
          source={{ uri: "https://placehold.co/600x600.png" }}
        />
      </View>
      <View style={styles.details}>
        <AppText style={styles.detailsTitle}>Title</AppText>
        <AppText>Artist</AppText>
      </View>
    </View>
  );
};

export default CarouselView;

const styles = new StyleSheet.create({
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
