import { Tabs } from "expo-router";
import { Colors } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  const tabStyling = {
    backgroundColor: Colors.bg,
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarStyle: {
            backgroundColor: Colors.bg,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarStyle: {
            backgroundColor: Colors.bg,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search" size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          headerShown: false,
          title: "Library",
          tabBarStyle: {
            backgroundColor: Colors.bg,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="albums" size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarStyle: {
            backgroundColor: Colors.bg,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
