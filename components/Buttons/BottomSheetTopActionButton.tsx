import AppText from "@components/AppText";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Colors } from "constants/colors";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface BottomSheetTopActionButtons {
  ref: React.RefObject<BottomSheetModal | null>;
  handleChange: () => void;
  text: string;
}

const BottomSheetTopActionButtons = ({
  ref,
  handleChange,
  text,
}: BottomSheetTopActionButtons) => {
  const handleCancel = () => {
    ref.current?.dismiss();
  };

  return (
    <View>
      <View style={styles.topActionButtons}>
        <Pressable onPress={handleCancel}>
          <AppText style={styles.deleteButton}>Cancel</AppText>
        </Pressable>
        <AppText style={{ fontWeight: "bold" }}>{text}</AppText>
        <Pressable onPress={handleChange}>
          <AppText style={styles.saveButton}>Save</AppText>
        </Pressable>
      </View>
    </View>
  );
};

export default BottomSheetTopActionButtons;

const styles = StyleSheet.create({
  topActionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    color: Colors.danger,
    fontWeight: "bold",
  },
  saveButton: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
