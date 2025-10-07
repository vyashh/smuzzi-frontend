import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AppText from "./AppText";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "constants/colors";
import { Playlist } from "types/playlist";
import { Ionicons } from "@expo/vector-icons";
import InputField from "./InputField";

export type OptionsSheetRef = {
  present: (props: OptionSheetProps) => void;
  dismiss: () => void;
};

interface OptionSheetProps {
  selectedOptionsPlaylist: Playlist | null;
}
const OptionSheet = forwardRef<OptionsSheetRef>((_, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [sheetProps, setSheetProps] = useState<OptionSheetProps | null>(null);

  useImperativeHandle(ref, () => ({
    present: (props: OptionSheetProps) => {
      setSheetProps(props);
      modalRef.current?.present();
    },
    dismiss: () => modalRef.current?.dismiss(),
  }));

  useEffect(() => {
    console.log("Options Sheet Props:", sheetProps);
  }, [sheetProps]);
  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["35%"]}
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
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.topActionButtons}>
          <Text style={styles.deleteButton}>Cancel</Text>
          <AppText style={{ fontWeight: "bold" }}>Edit details</AppText>
          <Text style={styles.saveButton}>Save</Text>
        </View>
        <View>
          <InputField
            placeholder="Playlist name"
            value={sheetProps?.selectedOptionsPlaylist?.name}
          />
        </View>
        <View style={styles.bottomActionButtons}>
          <Ionicons
            style={{ marginRight: 8 }}
            name="trash-bin"
            size={18}
            color={Colors.danger}
          />
          <AppText>Delete playlist</AppText>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default OptionSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    padding: 10,
  },
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
  bottomActionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
