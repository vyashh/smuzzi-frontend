import { StyleSheet, TextInput, View } from "react-native";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const InputField = ({ placeholder, value, onChangeText }: InputFieldProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    color: "red",
  },
});
