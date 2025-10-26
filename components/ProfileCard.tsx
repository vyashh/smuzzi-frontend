import { DEFAULT_ARTWORK_URI, DEFAULT_AVATAR } from "constants/global";
import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Colors } from "constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface ProfileCardProps {
  displayName?: string;
  tracksCount: number;
}

const ProfileCard = ({ displayName, tracksCount }: ProfileCardProps) => {
  return (
    <View style={styles.details}>
      <Image
        source={{ uri: DEFAULT_AVATAR }}
        borderRadius={360}
        width={50}
        height={50}
      />
      <View style={styles.detailsUser}>
        <AppText style={styles.displayName}>{displayName}</AppText>
        <View style={styles.detailsTracks}>
          <AppText style={styles.detailsTracksCounter}>
            {tracksCount} Tracks
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  detailsUser: {
    marginLeft: 20,
  },
  detailsTracks: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsTracksCounter: {
    // marginLeft: 10,
    // fontWeight: "bold",
  },
});
