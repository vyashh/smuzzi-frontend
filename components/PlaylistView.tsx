import { Image, Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Colors } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PlaylistViewProps {
  title: string;
  artist: string;
  cover: string;
  onOpenOptions?: () => void;
  active?: boolean;
}

const PlaylistView = ({
  title,
  artist,
  cover,
  onOpenOptions,
  active,
}: PlaylistViewProps) => {
  console.log(active);
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
      <View style={[styles.details, { flex: 2 }]}>
        <AppText
          style={[styles.detailsTitle, { width: 250 }, active && styles.active]}
          numberOfLines={1}
        >
          {title}
        </AppText>
        <View>
          <AppText
            style={[{ width: 300 }, active && styles.active]}
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
          {onOpenOptions && (
            <Pressable
              onPress={(e) => {
                console.log("Options Pressed");
                e.stopPropagation();
                onOpenOptions?.();
              }}
              onPressIn={(e) => e.stopPropagation()}
              hitSlop={8}
              style={{ padding: 4 }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={16}
                color={Colors.text}
              />
            </Pressable>
          )}
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
  active: {
    color: Colors.primary,
  },
});
