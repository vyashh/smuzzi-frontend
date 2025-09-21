import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";

const CarouselView = ({ title, artist, cover }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
      <View style={styles.details}>
        <AppText style={styles.detailsTitle}>{title}</AppText>
        <AppText>{artist}</AppText>
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
