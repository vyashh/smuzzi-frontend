import AppText from "@components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type IoniconColor = React.ComponentProps<typeof Ionicons>["color"];

interface SingleOptionProps {
  onPress?: () => void;
  iconName: IoniconName;
  iconColor?: IoniconColor;
  text: string;
}

const SingleOption = ({
  onPress,
  iconName,
  iconColor = "white",
  text,
}: SingleOptionProps) => {
  return (
    <Pressable style={styles.container}>
      <Ionicons
        style={{ marginRight: 8 }}
        name={iconName}
        size={18}
        color={iconColor}
      />
      <AppText>{text}</AppText>
    </Pressable>
  );
};

export default SingleOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
  },
});
