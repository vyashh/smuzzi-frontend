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
  const isLiked = useLikeStore((s) =>
    s.likedSongs.some((song) => String(song.id) === String(trackId))
  );
  const postLikedSong = useLikeStore((s) => s.postLikedSong);

  const likedHandler = () => {
    postLikedSong(trackId);
  };

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
