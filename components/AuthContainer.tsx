import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import SubTitle from "@components/SubTitle";
import { Colors } from "constants/colors";
import { globalStyles, SMUZZI_LOGO } from "constants/global";
import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  title: string;
}

const AuthContainer = ({ children, title }: AuthContainerProps) => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <View>
        <Image
          style={styles.logo}
          source={{ uri: SMUZZI_LOGO }}
          width={200}
          height={100}
        />
      </View>
      <View>
        <SubTitle style={styles.title}>{title}</SubTitle>
        {children}
      </View>
    </View>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    flex: 1,
    justifyContent: "space-around",
  },
  logo: {
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
  },
  inputField: {
    backgroundColor: Colors.primaryDarkerDarker,
    marginBottom: 20,
  },
  info: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
