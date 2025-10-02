import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

const TopBar = () => {
  const handleOnPress = () => {
    router.back();
  };
  return (
    <Pressable style={{ marginBottom: 20 }} onPress={handleOnPress}>
      <Ionicons name="chevron-back-outline" size={24} color="white" />
    </Pressable>
  );
};

export default TopBar;
