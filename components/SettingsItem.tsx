import { Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import { ComponentProps } from "react";
import { LoaderKitView } from "react-native-loader-kit";
type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface SettingsItemProps {
  title: string;
  icon: IoniconName;
  pressHandler?: () => void;
  isLoading?: boolean;
}

const SettingsItem = ({
  title,
  icon,
  pressHandler,
  isLoading,
}: SettingsItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.surface : Colors.bg,
          borderRadius: 8,
        },
        styles.container,
      ]}
      onPress={pressHandler}
    >
      {isLoading ? (
        <LoaderKitView
          style={{ width: 25, height: 25 }}
          name={"BallScale"}
          animationSpeedMultiplier={1}
          color={Colors.primary}
        />
      ) : (
        <Ionicons
          style={styles.icon}
          name={icon}
          size={20}
          color={Colors.primary}
        />
      )}
      <AppText style={styles.text}>{title}</AppText>
    </Pressable>
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
    // fontWeight: "bold",
  },
});
