import { Stack } from "expo-router";
import { useAuthStore } from "../utils/authStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import TrackPlayer from "react-native-track-player";

const RootLayout = () => {
  const { serverSelected, isLoggedIn, shouldCreateAccount } = useAuthStore();

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.Capability.Play,
          TrackPlayer.Capability.Pause,
          TrackPlayer.Capability.SkipToNext,
          TrackPlayer.Capability.SkipToPrevious,
          TrackPlayer.Capability.Stop,
        ],
        compactCapabilities: [
          TrackPlayer.Capability.Play,
          TrackPlayer.Capability.Pause,
        ],
        android: {
          // Kill audio when closing app
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
      });
    }
    setup();
  }, []);

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
