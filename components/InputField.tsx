import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Colors } from "constants/colors";
import { useEffect, useState } from "react";
import { Pressable, StyleProp, TextStyle } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

interface InputFieldProps {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  useBottomSheetInput?: boolean;
  showSearchIcon?: boolean;
  isPassword?: boolean;
}

const InputField = ({
  placeholder,
  value,
  onChangeText,
  useBottomSheetInput,
  style,
  showSearchIcon = false,
  isPassword = false,
}: InputFieldProps) => {
  const TextInputComponentType = useBottomSheetInput
    ? BottomSheetTextInput
    : TextInput;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearSearchValue = () => {
    onChangeText && onChangeText("");
  };

  useEffect(() => {});

  return (
    <View style={[styles.container, style]}>
      <TextInputComponentType
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        spellCheck={false}
        autoCorrect={false}
        secureTextEntry={isPassword && !showPassword}
        textContentType={isPassword ? "password" : "none"}
        autoCapitalize={"none"}
      />
      {isPassword ? (
        <Pressable onPress={handleShowPassword}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={16}
            color={Colors.neutral}
          />
        </Pressable>
      ) : (
        value &&
        value.length >= 0 && (
          <Pressable onPress={clearSearchValue}>
            <Ionicons name="close-outline" size={16} color={Colors.neutral} />
          </Pressable>
        )
      )}
      {showSearchIcon && value?.length === 0 && (
        <Pressable onPress={clearSearchValue}>
          <Ionicons name="search-outline" size={16} color={Colors.neutral} />
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
    // height: 25,zxc
    // fontSize: 25,
  },
});
