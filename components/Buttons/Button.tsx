import { Pressable, StyleSheet } from "react-native";
import AppText from "../AppText";
import { Colors } from "constants/colors";

interface ButtonProps {
  style?: object;
  title: string;
  pressHandler: () => void;
}

const Button = ({ style, title, pressHandler }: ButtonProps) => {
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? Colors.primaryDarkerDarker
            : Colors.primaryDarker,
        },
        styles.container,
      ]}
    >
      <AppText style={styles.text}>{title}</AppText>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
