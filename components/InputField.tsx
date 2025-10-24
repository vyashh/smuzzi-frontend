import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Colors } from "constants/colors";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleProp, TextStyle } from "react-native";
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

  const clearSearchValue = () => {
    onChangeText && onChangeText("");
  };

  return (
    <View style={styles.container}>
      <TextInputComponentType
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
      {value && value?.length >= 0 ? (
        <Pressable onPress={clearSearchValue}>
          <Ionicons name="close-outline" size={24} color={Colors.neutral} />
        </Pressable>
      ) : (
        <Pressable onPress={() => console.log("clear searchValue")}>
          <Ionicons name="search-outline" size={24} color={Colors.neutral} />
        </Pressable>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: Colors.text,
  },
});
