import { Colors } from "constants/colors";
import { Stack } from "expo-router";

const LibraryStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default LibraryStackLayout;
