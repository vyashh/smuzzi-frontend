import { StyleSheet, Text } from "react-native";
import AppText from "./AppText";

const HeaderTitle = ({ children, style, ...props }) => {
  return (
    <AppText {...props} style={[styles.text, style]}>
      {children}
    </AppText>
  );
};

export default HeaderTitle;

const styles = new StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
