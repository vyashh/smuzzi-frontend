import AppText from "@components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";
import { Pressable, StyleSheet, View } from "react-native";
import { Song } from "types/song";
import { loadPlay } from "utils/trackPlayer";

interface PlaylistActionButtonsProps {
  displayedSongs?: readonly Song[] | null;
}

const PlaylistActionButtons = ({
  displayedSongs,
}: PlaylistActionButtonsProps) => {
  return (
    <View style={styles.quickActions}>
      <View style={styles.quickActionsButton}>
        <Pressable
          onPress={() =>
            loadPlay({
              list: displayedSongs ?? [],
              songIndex: 0,
              shuffled: false,
            })
          }
        >
          <View style={styles.quickActionsButtonContainer}>
            <View style={styles.quickActionsButtonContainerIcon}>
              <Ionicons name="play-outline" size={24} color={Colors.primary} />
            </View>
            <AppText style={styles.quickActionsButtonText}>Play</AppText>
          </View>
        </Pressable>
      </View>
      <View style={styles.quickActionsButton}>
        <Pressable
          onPress={() =>
            loadPlay({
              list: displayedSongs ?? [],
              shuffled: true,
              shuffleMode: "randomStart",
            })
          }
        >
          <View style={styles.quickActionsButtonContainer}>
            <View style={styles.quickActionsButtonContainerIcon}>
              <Ionicons name="shuffle" size={24} color={Colors.primary} />
            </View>
            <AppText style={styles.quickActionsButtonText}>Shuffle</AppText>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default PlaylistActionButtons;

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionsButton: {
    // borderBlockColor: "red",
    paddingHorizontal: 45,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    marginBottom: 10,
  },
  quickActionsButtonContainer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  quickActionsButtonText: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  quickActionsButtonContainerIcon: {
    paddingRight: 10,
  },
});
