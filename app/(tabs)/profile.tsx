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
import { useAppToast } from "utils/toast";

function ProfilePage() {
  const { logOut, user, getUserData } = useAuthStore();
  const { songs, fetchSongs, total } = useSongsStore();
  const { isFetching } = useLibraryStore();
  const fetchLibrary = useLibraryStore((store) => store.fetchLibrary);

  const { successToast, errorToast, infoToast } = useAppToast();

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
    infoToast("Scan started on server");

    try {
      await fetchLibrary();

      const { status, error } = useLibraryStore.getState();

      if (error) {
        errorToast(`Failed to scan server: ${error}`);
        return;
      }

      successToast(`Scanning finished: ${status?.added} tracks added`);

      await fetchSongs();
    } catch (error) {
      errorToast(`Failed to scan server: ${error}`);
    }
  };

  const changeDisplayName = () => {
    infoToast("to be implemented.");
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
          displayName={user?.displayName || "No Name"}
          tracksCount={total || 0}
          username={user?.username}
        />
        <View style={styles.categories}>
          <SubTitle>Account</SubTitle>
          <SettingsItem
            icon="swap-horizontal"
            title="Change Display Name"
            pressHandler={changeDisplayName}
          />
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
