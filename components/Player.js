import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import AppText from "./AppText";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { Colors } from "../constants/colors";

const Player = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["8%", "100%"]);
  const [index, setIndex] = useState(0);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);

  const handleCollapseButton = () => {
    console.log(bottomSheetRef.current, index);
    // if (index === 0) {
    //   bottomSheetRef.current?.snapToIndex(1);
    // } else {
    //   bottomSheetRef.current?.snapToIndex(0);
    // }
  };

  const handleSheetView = (type) => {
    switch (type) {
      case "open":
        bottomSheetRef.current?.snapToIndex(1);
        break;
      case "close":
        bottomSheetRef.current?.snapToIndex(0);
      default:
        break;
    }
  };

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      handleStyle={{ display: "none" }}
      onChange={(index) => setIndex(index)}
      //   style={{ }}
    >
      <BottomSheetView style={styles.playerContainer}>
        {/* {index === 0 && ( */}
        <View styles={styles.miniPlayerContainer}>
          <View>
            <Image
              style={styles.miniPlayerCoverImage}
              source={{ uri: "https://placehold.co/600x600.png" }}
            />
            <View>
              <AppText>Title</AppText>
              <AppText>Artist</AppText>
            </View>
            <View>
              <AppText>Play Button</AppText>
            </View>
          </View>
        </View>
        {/* // )} */}
        {/* {index === 1 && (
          <View>
            <Text>Full </Text>
            <Text>Full </Text>
            <Text>Full </Text>
            <Button title="Close" onPress={() => handleSheetView("close")} />
          </View>
        )} */}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Player;

const styles = new StyleSheet.create({
  playerContainer: {
    backgroundColor: Colors.bg,

    height: "100%",
    borderTopColor: Colors.surface,
    borderWidth: 1,
    // padding,
  },
  miniPlayerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniPlayerCoverImage: {
    width: 50,
    height: 50,
  },
});
