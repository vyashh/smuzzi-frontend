import { Colors } from "constants/colors";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface AppTextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const AppText = ({ children, style, ...props }: AppTextProps) => {
  return (
    <Text {...props} style={[styles.textColor, style]}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  textColor: {
    color: Colors.text,
    fontFamily: "Inter",
  },
});
