import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Colors } from "constants/colors";

interface ButtonProps {
  children: React.ReactNode;
  style?: object;
}

const Button = ({ children, style }: ButtonProps) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.text}>{children}</AppText>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 32,
    alignItems: "center",
    backgroundColor: Colors.primaryDarker,
  },
  text: {
    fontWeight: "bold",
  },
});
