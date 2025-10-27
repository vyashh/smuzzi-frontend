import { Stack } from "expo-router";
import { useAuthStore } from "../utils/authStore";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import TrackPlayer, {
  Capability,
  Event,
  AppKilledPlaybackBehavior,
} from "react-native-track-player";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ToastProvider } from "react-native-toast-notifications";

const RootLayout = () => {
  const { serverSelected, isLoggedIn, shouldCreateAccount } = useAuthStore();

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        iosCategory: "playback",
        iosCategoryMode: "default",
        iosCategoryOptions: ["mixWithOthers"],
      });
    }

    setup();

    // 🔹 Add global event listeners (fixes WARN messages)
    const onPlaybackError = TrackPlayer.addEventListener(
      Event.PlaybackError,
      (error) => {
        console.warn("Playback error:", error);
      }
    );

    const onPlaybackState = TrackPlayer.addEventListener(
      Event.PlaybackState,
      (state) => {
        console.log("Playback state changed:", state.state);
      }
    );

    return () => {
      onPlaybackError.remove();
      onPlaybackState.remove();
      TrackPlayer.reset();
    };
  }, []);

  return (
    <ToastProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>
            <Stack.Protected guard={!serverSelected}>
              <Stack.Screen name="auth/server-select" />
            </Stack.Protected>
            <Stack.Protected
              guard={serverSelected && !isLoggedIn && shouldCreateAccount}
            >
              <Stack.Screen name="auth/authpage" />
            </Stack.Protected>
            {/* <Stack.Protected guard={serverSelected && shouldCreateAccount}>
              <Stack.Screen name="auth/sign-up" />
            </Stack.Protected> */}
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ToastProvider>
  );
};

export default RootLayout;
