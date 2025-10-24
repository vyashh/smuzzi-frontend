import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Asset } from "expo-asset";
import { Song } from "types/song";

const globalStyles = StyleSheet.create({
  container: {
    paddingTop: 75,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

// icons
const DEFAULT_ARTWORK_URI = Asset.fromModule(
  require("../assets/placeholder-artwork.png")
).uri;

const LIKES_ICON_URI = Asset.fromModule(
  require("../assets/likes-icon.png")
).uri;

const EDIT_ARTWORK_URI = Asset.fromModule(
  require("../assets/artwork_edit.png")
).uri;

const ALL_TRACKS_ICON_URI = Asset.fromModule(
  require("../assets/all-tracks-icon.png")
).uri;

const NO_RESULTS_URI = Asset.fromModule(
  require("../assets/no_results.png")
).uri;

const DEFAULT_AVATAR = Asset.fromModule(
  require("../assets/default_avatar.png")
).uri;

// types
type PlaylistType = "playlist" | "likes" | "allTracks";
type OptionType = "playlist" | "track";
type HeaderType = "header" | "subheader";
type HomeTile =
  | { type: "recently_played"; title: string; items: Song[] }
  | { type: "most_listened_last_week"; title: string; items: Song[] }
  | { type: "continue_listening"; title: string; items: Song[] }
  | { type: "favorites_hub"; title: string; summary?: Song; items: Song[] }
  | { type: "newly_added"; title: string; items: Song[] };

export {
  globalStyles,
  DEFAULT_ARTWORK_URI,
  LIKES_ICON_URI,
  ALL_TRACKS_ICON_URI,
  EDIT_ARTWORK_URI,
  NO_RESULTS_URI,
  DEFAULT_AVATAR,
  PlaylistType,
  OptionType,
  HeaderType,
  HomeTile,
};
