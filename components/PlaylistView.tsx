import { Image, Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Colors } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PlaylistViewProps {
  title: string;
  artist: string;
  cover: string;
}

const PlaylistView = ({ title, artist, cover }: PlaylistViewProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
      <View style={[styles.details, { flex: 2 }]}>
        <AppText
          style={[styles.detailsTitle, { width: "250" }]}
          numberOfLines={1}
        >
          {title}
        </AppText>
        <View>
          <AppText
            style={{ width: 300 }}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {artist}
          </AppText>
        </View>
      </View>
      <Pressable>
        <View
          style={{
            flex: 3,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ellipsis-vertical" size={16} color={Colors.text} />
        </View>
      </Pressable>
    </View>
  );
};

export default PlaylistView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
