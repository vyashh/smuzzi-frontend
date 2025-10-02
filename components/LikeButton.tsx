import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { Pressable } from "react-native";
import { Song } from "types/song";

interface LikeButtonProps {
  trackId: string;
}

const likedHandler = (track: any) => {
  console.log("liked: " + track);
};

const LikeButton = ({ trackId }: LikeButtonProps) => {
  return (
    <Pressable onPress={() => likedHandler(trackId)}>
      <Ionicons name="heart-outline" size={32} color={Colors.primary} />
    </Pressable>
  );
};

export default LikeButton;
