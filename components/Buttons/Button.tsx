import { Pressable, StyleSheet } from "react-native";
import AppText from "../AppText";
import { Colors } from "constants/colors";

interface ButtonProps {
  style?: object;
  title: string;
  disabled?: boolean;
  pressHandler: () => void;
}

const Button = ({
  style,
  title,
  pressHandler,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={pressHandler}
      style={({ pressed }) => [
        styles.container,
        disabled
          ? styles.disabled
          : {
              backgroundColor: pressed
                ? Colors.primaryDarkerDarker
                : Colors.primaryDarker,
            },
        style,
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
  disabled: {
    backgroundColor: Colors.surface,
    opacity: 0.6,
  },
  text: {
    fontWeight: "bold",
  },
});
