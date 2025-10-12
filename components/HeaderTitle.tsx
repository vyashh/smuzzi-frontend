import { StyleProp, StyleSheet, TextStyle } from "react-native";
import AppText from "./AppText";
import React, { useMemo } from "react";
import { HeaderType } from "constants/global";

interface HeaderTitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  type?: HeaderType;
}

const HeaderTitle = ({ children, style, type, ...props }: HeaderTitleProps) => {
  const typeStyle = useMemo(() => {
    switch (type) {
      case "header":
        return styles.header;
      case "subheader":
        return styles.subheader;
      default:
        return styles.header;
    }
  }, [type]);

  return (
    <AppText {...props} style={[typeStyle, style]}>
      {children}
    </AppText>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: "700",
  },
  subheader: {
    fontSize: 24,
    fontWeight: "400",
  },
});
