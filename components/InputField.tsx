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
  setOnFocus?: Dispatch<SetStateAction<boolean>>;
}

const InputField = ({
  placeholder,
  value,
  onChangeText,
  useBottomSheetInput,
  style,
  setOnFocus,
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
      onChangeText={(text) => {
        onChangeText?.(text);
        setOnFocus?.(text.trim().length > 0);
      }}
      onFocus={() => setOnFocus?.(true)}
      onBlur={() => setOnFocus?.(false)}
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
