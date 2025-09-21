import { Tabs } from "expo-router";
import { Colors } from "../../constants/colors";

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
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarStyle: tabStyling,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          headerShown: false,
          title: "Library",
          tabBarStyle: tabStyling,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarStyle: tabStyling,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
