import { Stack } from "expo-router";
import { useAuthStore } from "../utils/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  const { serverSelected, isLoggedIn, shouldCreateAccount } = useAuthStore();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!serverSelected}>
          <Stack.Screen name="auth/server-select" />
        </Stack.Protected>
        <Stack.Protected guard={serverSelected && !isLoggedIn}>
          <Stack.Screen name="auth/sign-in" />
        </Stack.Protected>
        <Stack.Protected guard={serverSelected && shouldCreateAccount}>
          <Stack.Screen name="auth/sign-up" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
