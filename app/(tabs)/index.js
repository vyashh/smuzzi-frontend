import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Link } from "expo-router";
import { globalStyles } from "../../constants/globalStyles";
import AppText from "../../components/AppText";
import CarouselView from "../../components/CarouselView";
import HeaderTitle from "../../components/HeaderTitle";

function Home() {
  const userName = "Vyash";
  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="auto" />
      <View>
        <AppText style={{ fontSize: 50, marginBottom: 30 }}>
          Hello {userName}!
        </AppText>
      </View>
      <HeaderTitle>Quick Picks</HeaderTitle>

      <View style={styles.quickPicksContainer}>
        <View>
          <CarouselView />
          <CarouselView />
          <CarouselView />
          <CarouselView />
        </View>
        <View>
          <CarouselView />
          <CarouselView />
          <CarouselView />
          <CarouselView />
        </View>
        <View>
          <CarouselView />
          <CarouselView />
          <CarouselView />
          <CarouselView />
        </View>
      </View>
      <HeaderTitle style={{ marginTop: 40 }}>Recently added</HeaderTitle>
    </View>
  );
}

export default Home;

const styles = new StyleSheet.create({
  container: {
    marginTop: 100,
  },
  quickPicksContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
});
