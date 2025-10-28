import { Ionicons } from "@expo/vector-icons";
import { PlaylistType } from "constants/global";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

interface TopBarProps {
  showOptions?: boolean;
  onOptionsPress?: () => void;
  viewType?: PlaylistType;
}

const TopBar = ({
  showOptions = false,
  onOptionsPress,
  viewType,
}: TopBarProps) => {
  const handleOnPress = () => {
    // needed since navigating from home to a playlist bugs out
    // when you then navigate to library through the tab bar it will be on the playlist view
    // going back then brings you back to home instead of the view with all the playlists
    if (viewType == "playlist") {
      router.push("library");
    } else {
      router.back();
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleOnPress}>
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </Pressable>
      {showOptions && (
        <Pressable onPress={onOptionsPress}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </Pressable>
      )}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
});
