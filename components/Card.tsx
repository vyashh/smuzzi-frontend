import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { Song } from "types/song";
import AppText from "./AppText";
import { Colors } from "constants/colors";
import { LinearGradient } from "expo-linear-gradient";

interface CardProps {
  data: Song[];
}

const Card = ({ data }: CardProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(s) => String(s.id)}
      numColumns={9}
      renderItem={(tile) => {
        const song = tile.item;
        return (
          <View style={styles.container}>
            <ImageBackground
              style={styles.image}
              source={{ uri: song["cover_url"] }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={["#16182a21", "#0C0D13"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 2 }}
                style={styles.gradient}
              >
                <AppText
                  style={styles.text}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {song.artist || "Artist"}
                </AppText>
              </LinearGradient>
            </ImageBackground>
          </View>
        );
      }}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 100,
    marginRight: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 8,
  },
  text: {
    // color: Colors.primary,
    fontWeight: "bold",
  },
});
