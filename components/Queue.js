import BottomSheet from "@gorhom/bottom-sheet";
import AppText from "./AppText";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { globalStyles } from "../constants/globalStyles";

const Queue = ({ children }) => {
  return (
    <View style={[style.queueContainer]}>
      <Text>Hi</Text>
    </View>
  );
};

export default Queue;

const style = StyleSheet.create({
  queueContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.bg,
  },
});
