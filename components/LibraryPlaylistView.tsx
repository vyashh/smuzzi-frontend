import { Image, StyleSheet, Text, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import { DEFAULT_ARTWORK_URI, LIKES_ICON_URI } from "constants/global";

interface LibraryPlaylistViewProps {
  // viewType:
}

const LibraryPlaylistView = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.cover} source={{ uri: LIKES_ICON_URI }} />
      </View>
      <View>
        <AppText
          style={[styles.detailsTitle, { width: "250" }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          My Likes
        </AppText>
      </View>
      <View>
        <View style={styles.actionButtons}>
          <Ionicons
            name="checkmark-circle-outline"
            size={16}
            color={Colors.text}
          />
          <Ionicons name="ellipsis-vertical" size={16} color={Colors.text} />
        </View>
      </View>
    </View>
  );
};

export default LibraryPlaylistView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    gap: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },

  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
    height: "auto",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 30,
  },
});
