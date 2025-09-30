import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { globalStyles } from "../../constants/global";
import { useAuthStore } from "../../utils/authStore";
import TrackPlayer from "react-native-track-player";

function ProfilePage() {
  const { logOut } = useAuthStore();

  const logOutProcedure = async () => {
    await TrackPlayer.stop();
    logOut();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>ProfilePage </Text>
      <Button title="Logout" onPress={logOut} />
    </View>
  );
}

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  text: {
    color: Colors.text,
    fontSize: 42,
  },
});
