import { StyleSheet, Text } from "react-native";

const AppText = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.textColor, style]}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = new StyleSheet.create({
  textColor: {
    color: "#fff",
  },
});
