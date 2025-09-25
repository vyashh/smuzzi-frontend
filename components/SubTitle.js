import { StyleSheet } from "react-native";
import AppText from "./AppText";

const SubTitle = ({ children, style, ...props }) => {
  return (
    <AppText {...props} style={[styles.text, style]}>
      {children}
    </AppText>
  );
};

export default SubTitle;

const styles = new StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
