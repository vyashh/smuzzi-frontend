import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";

const PlaylistView = ({ title, artist, cover, duration }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
      <View style={styles.details}>
        <AppText
          style={[styles.detailsTitle, { width: "200" }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </AppText>
        <View>
          <AppText>
            {artist} · {duration}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default PlaylistView;

const styles = new StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {},
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
    height: "auto",
  },
});
