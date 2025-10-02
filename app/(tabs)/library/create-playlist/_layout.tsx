import { Stack } from "expo-router";

const CreatePlaylistStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default CreatePlaylistStackLayout;
