import { MenuView, MenuComponentRef } from "@react-native-menu/menu";
import { useRef } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { Button, View } from "react-native";
import AppText from "./AppText";
import { Colors } from "constants/colors";

interface PopupMenuProps {
  onPressHandler?: () => void;
  children?: React.ReactNode;
}

const PopupMenu = ({ onPressHandler, children }: PopupMenuProps) => {
  const menuRef = useRef<MenuComponentRef>(null);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <MenuView
        ref={menuRef} //android only
        actions={[
          {
            id: "edit",
            title: "Edit",
            subactions: [
              {
                id: "nested1",
                title: "Nested action",
                subtitle: "State is mixed",

                state: "mixed",
              },
              {
                id: "nestedDestructive",
                title: "Destructive Action",
                attributes: {
                  destructive: true,
                },
              },
            ],
          },
          // {
          //   id: "share",
          //   title: "Share Action",
          //   titleColor: "#46F289",
          //   subtitle: "Share action on SNS",
          //   image: Platform.select({
          //     ios: "square.and.arrow.up",
          //     android: "ic_menu_share",
          //   }),
          //   imageColor: "#46F289",
          //   state: "on",
          // },
          {
            id: "deletePlaylist",
            title: "Delete Playlist",
            attributes: {
              destructive: true,
            },
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        {children}
      </MenuView>
    </View>
  );
};
export default PopupMenu;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
  },
});
