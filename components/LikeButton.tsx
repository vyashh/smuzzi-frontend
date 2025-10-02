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
  const { postLikedSong } = useLikeStore();
  const likedSongs = useLikeStore((s) => s.likedSongs);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const likedHandler = () => {
    postLikedSong(trackId);

    // console.log("liked: " + track);
  };

  const findLikedTrackStatus = () => {
    const foundIsLiked = likedSongs.find((song) => song.id === Number(trackId));
    if (foundIsLiked !== undefined) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    findLikedTrackStatus();
  }, [findLikedTrackStatus, isLiked, setIsLiked]);

  return (
    <Pressable onPress={likedHandler}>
      <Ionicons
        name={isLiked ? "heart-sharp" : "heart-outline"}
        size={32}
        color={Colors.primary}
      />
    </Pressable>
  );
};

export default LikeButton;
