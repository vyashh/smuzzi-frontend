import AppText from "@components/AppText";
import { globalStyles } from "constants/global";
import { View } from "react-native";

const NewPlaylistPage = () => {
  return (
    <View style={globalStyles.container}>
      <AppText>Create New Playlist</AppText>
    </View>
  );
};

export default NewPlaylistPage;
