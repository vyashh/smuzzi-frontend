import { View } from "react-native-reanimated/lib/typescript/Animated";
import AppText from "./AppText";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

const OptionSheet = () => {
  return (
    <BottomSheetModal>
      <BottomSheetView>
        <AppText>Option Sheet</AppText>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default OptionSheet;
