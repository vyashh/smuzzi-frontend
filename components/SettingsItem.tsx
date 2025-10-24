import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import { ComponentProps } from "react";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface SettingsItemProps {
  title: string;
  icon: IoniconName;
  pressHandler?: () => void;
}

const SettingsItem = ({ title, icon, pressHandler }: SettingsItemProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        name={icon}
        size={20}
        color={Colors.primary}
      />
      <AppText style={styles.text}>{title}</AppText>
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    borderBottomColor: Colors.surface,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
});
