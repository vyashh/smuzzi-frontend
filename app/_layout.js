import { Stack } from "expo-router";
import { useAuthStore } from "../utils/authStore";

const RootLayout = () => {
  const { serverSelected, isLoggedIn, shouldCreateAccount } = useAuthStore();
  return (
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
  );
};

export default RootLayout;
