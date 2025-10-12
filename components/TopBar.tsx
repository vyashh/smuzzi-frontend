import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

interface TopBarProps {
  showOptions?: boolean;
  onOptionsPress?: () => void;
}

const TopBar = ({ showOptions = false, onOptionsPress }: TopBarProps) => {
  const handleOnPress = () => {
    router.back();
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
