import { Tabs } from "expo-router";
import { Colors } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
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
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home-outline" size={size} color={color} />;
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
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search-outline" size={size} color={color} />;
          },
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
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="albums-outline" size={size} color={color} />;
          },
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
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
