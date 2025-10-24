import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import { useAuthStore } from "../../utils/authStore";
import TrackPlayer from "react-native-track-player";
import HeaderTitle from "@components/HeaderTitle";
import AppText from "@components/AppText";
import Card from "@components/Card";
import SubTitle from "@components/SubTitle";
import SettingsItem from "@components/SettingsItem";
import ProfileCard from "@components/ProfileCard";

function ProfilePage() {
  const { logOut } = useAuthStore();

  const logOutProcedure = async () => {
    await TrackPlayer.stop();
    logOut();
  };

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
        <SettingsItem icon="scan-sharp" title="Scan Library" />
        <SettingsItem icon="pencil-outline" title="Change Server" />
        <SettingsItem icon="exit-outline" title="Logout" />
      </View>
      <Button title="Logout" onPress={logOutProcedure} />
    </View>
  );
}

export default ProfilePage;

const styles = StyleSheet.create({
  categories: {
    marginTop: 30,
  },
});
