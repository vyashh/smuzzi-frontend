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
        <View style={styles.container}>
          <View>
            <Image
              style={styles.cover}
              source={{ uri: "https://placehold.co/600x600.png" }}
            />
          </View>
          <View style={styles.details}>
            <AppText
              style={[styles.detailsTitle, { width: "200" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Title
            </AppText>
            <View>
              <AppText>Artist</AppText>
            </View>
          </View>
          <View style={styles.controls}>
            <AppText>Play</AppText>
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
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {},
  detailsTitle: {
    fontWeight: "bold",
    width: "100%",
    height: "auto",
  },
  controls: {},
});
