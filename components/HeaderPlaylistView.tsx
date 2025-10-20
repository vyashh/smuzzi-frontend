import { Image, View } from "react-native";
import AppText from "./AppText";

interface HeaderPlaylistViewProps {
  title: string;
  coverUrl: string;
  trackCount: number;
  totalDuration: string;
}

const HeaderPlaylistView = ({
  title,
  coverUrl,
  trackCount,
}: HeaderPlaylistViewProps) => {
  return (
    <View>
      <View>
        <Image source={{ uri: coverUrl }} />
      </View>
      <View>
        <AppText>{trackCount} Tracks</AppText>
        <AppText>15 hours</AppText>
      </View>
    </View>
  );
};

export default HeaderPlaylistView;
