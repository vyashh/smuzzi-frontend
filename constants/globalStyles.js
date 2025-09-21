import { StyleSheet } from "react-native";
import { Colors } from "./colors";

const globalStyles = new StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingLeft: 24,
    paddingTop: 100,
    backgroundColor: Colors.bg,
    flex: 1,
    color: "#fff",
  },
});

export { globalStyles };
