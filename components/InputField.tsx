import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Colors } from "constants/colors";
import { Dispatch, SetStateAction } from "react";
import { StyleProp, TextStyle } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

interface InputFieldProps {
  style?: StyleProp<TextStyle>;
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
  style,
}: InputFieldProps) => {
  const TextInputComponentType = useBottomSheetInput
    ? BottomSheetTextInput
    : TextInput;

  return (
    <TextInputComponentType
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={Colors.textMuted}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.surface,
    height: 40,
    paddingLeft: 8,
    color: Colors.text,
    borderRadius: 8,
  },
});
