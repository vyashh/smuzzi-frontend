import { MenuView, MenuComponentRef } from "@react-native-menu/menu";
import { useRef } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { Button, View } from "react-native";
import AppText from "./AppText";

interface PopupMenuProps {
  onPressHandler?: () => void;
  children?: React.ReactNode;
}

const PopupMenu = ({ onPressHandler, children }: PopupMenuProps) => {
  const menuRef = useRef<MenuComponentRef>(null);
  return (
    <View style={styles.container}>
      <MenuView
        ref={menuRef} //android only
        actions={[
          {
            id: "add",
            title: "Add",
            titleColor: "#ffffffff",
            image: Platform.select({
              ios: "plus",
              android: "ic_menu_add",
            }),
            imageColor: "#ffffffff",
            subactions: [
              {
                id: "nested1",
                title: "Nested action",
                // titleColor: "rgba(250,180,100,0.5)",
                subtitle: "State is mixed",
                image: Platform.select({
                  ios: "heart.fill",
                  android: "ic_menu_today",
                }),
                imageColor: "rgba(100,200,250,0.3)",
                state: "mixed",
              },
              {
                id: "nestedDestructive",
                title: "Destructive Action",
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: "trash",
                  android: "ic_menu_delete",
                }),
              },
            ],
          },
          {
            id: "share",
            title: "Share Action",
            titleColor: "#46F289",
            subtitle: "Share action on SNS",
            image: Platform.select({
              ios: "square.and.arrow.up",
              android: "ic_menu_share",
            }),
            imageColor: "#46F289",
            state: "on",
          },
          {
            id: "destructive",
            title: "Destructive Action",
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: "trash",
              android: "ic_menu_delete",
            }),
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
