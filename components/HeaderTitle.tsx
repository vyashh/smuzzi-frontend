import { StyleProp, StyleSheet, TextStyle } from "react-native";
import AppText from "./AppText";
import React from "react";
import { HeaderType } from "constants/global";

interface HeaderTitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  type?: HeaderType;
}

const HeaderTitle = ({ children, style, type, ...props }: HeaderTitleProps) => {
  return (
    <AppText {...props} style={[styles.text, style]}>
      {children}
    </AppText>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
