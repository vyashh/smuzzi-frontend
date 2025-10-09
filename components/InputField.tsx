import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Colors } from "constants/colors";
import { StyleSheet, TextInput, View } from "react-native";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  useBottomSheetInput?: boolean;
}

const InputField = ({
  placeholder,
  value,
  onChangeText,
  useBottomSheetInput,
}: InputFieldProps) => {
  const TextInputComponentType = useBottomSheetInput
    ? BottomSheetTextInput
    : TextInput;

  return (
    <View style={styles.container}>
      <TextInputComponentType
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    // margin: 10,
  },
  input: {
    backgroundColor: Colors.surface,
    height: 40,
    paddingLeft: 8,
    color: Colors.text,
    borderRadius: 8,
  },
});
