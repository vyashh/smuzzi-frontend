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
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.bg,
          },
        }}
      />
      <Stack.Screen
        name="new-playlist"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Colors.bg,
          },
        }}
      />
    </Stack>
  );
};

export default LibraryStackLayout;
