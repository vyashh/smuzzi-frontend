import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/colors";

const QueueView = ({ title, artist, cover, id }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
      <View style={[styles.details]}>
        <AppText
          style={[styles.detailsTitle, { width: "250" }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {title}
        </AppText>
        <View>
          <AppText
            style={{ width: "250" }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {artist}
          </AppText>
        </View>
      </View>
      <View>
        <Ionicons name="menu-outline" size={32} color={Colors.textMuted} />
      </View>
    </View>
  );
};

export default QueueView;

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {
    justifyContent: "center",
  },
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
    height: "auto",
  },
});
