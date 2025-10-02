import AppText from "@components/AppText";
import TopBar from "@components/TopBar";
import { globalStyles } from "constants/global";
import { View } from "react-native";

const NewPlaylistPage = () => {
  return (
    <View style={[globalStyles.container]}>
      <TopBar />
      <AppText>Create New Playlist</AppText>
    </View>
  );
};

export default NewPlaylistPage;
