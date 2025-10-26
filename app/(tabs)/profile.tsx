import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import { useAuthStore } from "../../utils/authStore";
import TrackPlayer from "react-native-track-player";
import HeaderTitle from "@components/HeaderTitle";
import SubTitle from "@components/SubTitle";
import SettingsItem from "@components/SettingsItem";
import ProfileCard from "@components/ProfileCard";
import { useToast } from "react-native-toast-notifications";
import { useLibraryStore } from "utils/libraryStore";
import { useEffect, useRef } from "react";
import { useSongsStore } from "utils/songsStore";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ChangePassword, {
  ChangePasswordSheetRef,
} from "@components/ChangePassword";

function ProfilePage() {
  const { logOut, user } = useAuthStore();
  const { songs, fetchSongs } = useSongsStore();
  const { isFetching } = useLibraryStore();
  const fetchLibrary = useLibraryStore((store) => store.fetchLibrary);
  const getUserData = useAuthStore((store) => store.getUserData);

  const toast = useToast();

  const changePasswordRef = useRef<ChangePasswordSheetRef>(null);

  const handleOnOpenOptions = () => {
    changePasswordRef.current?.present();
  };

  const logOutProcedure = async () => {
    await TrackPlayer.stop();
    logOut();
  };

  const scanLibrary = async () => {
    console.log("scan library");
    toast.show("Scan started on server", {
      type: "normal",
      normalColor: Colors.primaryDarker,
      textStyle: { color: "white" },
      placement: "top",
      duration: 3000,
      animationType: "slide-in",
    });

    try {
      await fetchLibrary();

      const { status, error } = useLibraryStore.getState();

      if (error) {
        toast.show(`Failed to scan server: ${error}`, {
          type: "danger",
          placement: "top",
        });
        return;
      }

      toast.show(`Scanning finished: ${status?.added} tracks added`, {
        type: "success",
        successColor: Colors.success,
        textStyle: { color: Colors.surface },
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });

      await fetchSongs();
    } catch (error) {
      toast.show(`Failed to scan server: ${error}`, {
        type: "danger",
        dangerColor: Colors.danger,
        textStyle: { color: "white" },
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  useEffect(() => {
    if (user) {
      console.log("user", user);
    }
  }, [user]);

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <HeaderTitle>Profile</HeaderTitle>
        <ProfileCard
          displayName={user?.displayName}
          tracksCount={songs.length}
        />
        <View style={styles.categories}>
          <SubTitle>Account</SubTitle>
          <SettingsItem icon="pencil-outline" title="Edit Account Details" />
          <SettingsItem
            pressHandler={handleOnOpenOptions}
            icon="eye-outline"
            title="Change Password"
          />
        </View>
        <View style={styles.categories}>
          <SubTitle>System Settings</SubTitle>
          <SettingsItem
            pressHandler={scanLibrary}
            icon="scan-sharp"
            title="Scan Library"
            isLoading={isFetching}
          />
          <SettingsItem
            pressHandler={scanLibrary}
            icon="dice-outline"
            title="Enable Super Shuffle"
            isLoading={isFetching}
          />
          <SettingsItem
            pressHandler={logOutProcedure}
            icon="pencil-outline"
            title="Change Server"
          />
          <SettingsItem
            pressHandler={logOutProcedure}
            icon="exit-outline"
            title="Logout"
          />
        </View>
      </View>
      <ChangePassword ref={changePasswordRef} />
    </BottomSheetModalProvider>
  );
}

export default ProfilePage;

const styles = StyleSheet.create({
  categories: {
    marginTop: 30,
  },
});
