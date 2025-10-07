import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Asset } from "expo-asset";

const globalStyles = StyleSheet.create({
  container: {
    paddingTop: 100,
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

// types
type PlaylistType = "playlist" | "likes" | "allTracks";

export {
  globalStyles,
  DEFAULT_ARTWORK_URI,
  LIKES_ICON_URI,
  ALL_TRACKS_ICON_URI,
  EDIT_ARTWORK_URI,
  PlaylistType,
};
