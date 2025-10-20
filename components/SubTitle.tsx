import { StyleSheet, TextStyle } from "react-native";
import AppText from "./AppText";
import { StyleProp } from "react-native";

interface SubTitleProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const SubTitle = ({ children, style, ...props }: SubTitleProps) => {
  return (
    <AppText {...props} style={[styles.text, style]}>
      {children}
    </AppText>
  );
};

export default SubTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
