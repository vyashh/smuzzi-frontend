import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppText from "./AppText";
import { Song } from "types/song";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { DEFAULT_ARTWORK_URI } from "constants/global";
import { useActiveTrack } from "react-native-track-player";
import { Colors } from "constants/colors";

interface CarouselViewProps {
  data: Song[];
  handleTrackPress?: (songIndex: number) => void;
}

const NUM_COLS = 3;
const GAP = 12;
const SCREEN_W = Dimensions.get("window").width;
const ITEM_W = Math.floor((SCREEN_W - GAP * (NUM_COLS + 1)) / NUM_COLS);

const CarouselView = ({ data, handleTrackPress }: CarouselViewProps) => {
  const activeTrack = useActiveTrack();
  const [isPlaying, setIsPlaying] = useState<number>();

  return (
    <FlatList
      data={data}
      keyExtractor={(s) => String(s.id)} // prefer stable key [TSBP §Keys]
      numColumns={NUM_COLS}
      contentContainerStyle={{ padding: GAP, rowGap: GAP }}
      columnWrapperStyle={{ columnGap: GAP }}
      renderItem={(tile) => {
        const song = tile.item;
        const coverUrl = song?.["cover_url"] || DEFAULT_ARTWORK_URI;
        const activeId = String(activeTrack?.id ?? activeTrack?.mediaId ?? "");
        const songId = String(song?.["track_id"] ?? song?.id ?? "");
        const isActive = activeId === songId;

        return (
          <Pressable
            onPress={() => handleTrackPress?.(song?.["track_id"])}
            style={[styles.container, { width: ITEM_W }]}
          >
            <View style={[isActive && styles.activeTrackBorder]}>
              <Image style={styles.cover} source={{ uri: coverUrl }} />
            </View>
            <View style={styles.details}>
              <AppText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.detailsTitle,
                  isActive && styles.activeTrackText,
                ]}
              >
                {song.title || "Title"}
              </AppText>
              <AppText
                style={[
                  styles.detailsTitle,
                  isActive && styles.activeTrackText,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {song.artist || "Artist"}
              </AppText>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: 50,
  },
  cover: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {},
  detailsTitle: {
    fontWeight: "bold",
  },
  activeTrackBorder: {
    borderColor: Colors.primary,
    borderLeftWidth: 3,
    borderRadius: 8,
  },
  activeTrackText: {
    color: Colors.primary,
  },
});
