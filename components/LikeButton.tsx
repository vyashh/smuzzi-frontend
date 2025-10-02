import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { Pressable } from "react-native";
import { Song } from "types/song";
import { useEffect, useState } from "react";
import { useLikeStore } from "utils/likesStore";

interface LikeButtonProps {
  trackId: number;
}

const LikeButton = ({ trackId }: LikeButtonProps) => {
  const likedSongs = useLikeStore((s) => s.likedSongs);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const likedHandler = (trackId: number) => {
    // console.log();
    // console.log("liked: " + track);
  };

  const findLikeTrackStatus = () => {
    const foundIsLiked = likedSongs.find((song) => song.id === Number(trackId));
    if (foundIsLiked !== undefined) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    findLikeTrackStatus();
  }, [findLikeTrackStatus, isLiked, setIsLiked]);

  return (
    <Pressable onPress={() => likedHandler(trackId)}>
      <Ionicons
        name={isLiked ? "heart-sharp" : "heart-outline"}
        size={32}
        color={Colors.primary}
      />
    </Pressable>
  );
};

export default LikeButton;
