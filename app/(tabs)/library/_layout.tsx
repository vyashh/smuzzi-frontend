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
        }}
      />
    </Stack>
  );
};

export default LibraryStackLayout;
