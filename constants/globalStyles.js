import { StyleSheet } from "react-native";
import { Colors } from "./colors";
import { Asset } from "expo-asset";

const globalStyles = new StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 100,
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

const DEFAULT_ARTWORK_URI = Asset.fromModule(
  require("../assets/placeholder-artwork.png")
).uri;

export { globalStyles, DEFAULT_ARTWORK_URI };
