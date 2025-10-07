import { forwardRef, useImperativeHandle, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AppText from "./AppText";

export type OptionsSheetRef = { present: () => void; dismiss: () => void };

const OptionSheet = forwardRef<OptionsSheetRef>((_, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => modalRef.current?.present(),
    dismiss: () => modalRef.current?.dismiss(),
  }));

  return (
    <BottomSheetModal ref={modalRef} snapPoints={["35%"]}>
      <BottomSheetView>
        <AppText>Option Sheet</AppText>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default OptionSheet;
