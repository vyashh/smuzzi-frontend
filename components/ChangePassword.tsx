import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Colors } from "constants/colors";
import AppText from "./AppText";

export type ChangePasswordSheetRef = {
  present: () => void;
  dismiss: () => void;
};

const ChangePassword = forwardRef<ChangePasswordSheetRef>((_, ref) => {
  const modalRef = useRef<ChangePasswordSheetRef>(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      modalRef.current?.present();
    },
    dismiss: () => {
      modalRef.current?.dismiss();
    },
  }));

  useEffect(() => {}, []);
  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["40%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      enableDynamicSizing
      enablePanDownToClose
      handleStyle={{ display: "none" }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <BottomSheetView style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <AppText>Hoi</AppText>
          </View>
        </BottomSheetView>
      </KeyboardAvoidingView>
      <ChangePassword ref={modalRef} />
    </BottomSheetModal>
  );
});

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    padding: 10,
  },
  option: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});
