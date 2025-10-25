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
import { useEffect } from "react";

function ProfilePage() {
  const { logOut } = useAuthStore();
  const { isFetching, status } = useLibraryStore();
  const fetchLibrary = useLibraryStore((store) => store.fetchLibrary);
  const toast = useToast();

  const logOutProcedure = async () => {
    await TrackPlayer.stop();
    logOut();
  };

  const scanLibrary = () => {
    console.log("scan librart");
    toast.show("Scan started on server", {
      type: "normal",
      normalColor: Colors.primaryDarker,
      textStyle: { color: "white" },
      placement: "top",
      duration: 3000,
      animationType: "slide-in",
    });

    try {
      fetchLibrary().then(() => {
        toast.show(`Scanning finished: ${status?.added} tracks added`, {
          type: "success",
          successColor: Colors.success,
          textStyle: { color: Colors.surface },
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
      });
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

  useEffect(() => {}, []);

  return (
    <View style={globalStyles.container}>
      <HeaderTitle>Profile</HeaderTitle>
      <ProfileCard displayName="Vyash Bhawan" tracksCount={48} />
      <View style={styles.categories}>
        <SubTitle>Account</SubTitle>
        <SettingsItem icon="pencil-outline" title="Edit Account Details" />
        <SettingsItem icon="eye-outline" title="Change Password" />
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
  );
}

export default ProfilePage;

const styles = StyleSheet.create({
  categories: {
    marginTop: 30,
  },
});
