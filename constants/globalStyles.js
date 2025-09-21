import { StyleSheet } from "react-native";
import { Colors } from "./colors";

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

export { globalStyles };
