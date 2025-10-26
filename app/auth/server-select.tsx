import { Image, StyleSheet, TextInput, View } from "react-native";
import { globalStyles, SMUZZI_LOGO } from "../../constants/global";
import AppText from "../../components/AppText";
import HeaderTitle from "../../components/HeaderTitle";
import { useAuthStore } from "../../utils/authStore";
import { useState } from "react";
import SubTitle from "@components/SubTitle";
import { Colors } from "constants/colors";
import InputField from "@components/InputField";
import Button from "@components/Buttons/Button";

const ServerSelectPage = () => {
  const serverUrl = useAuthStore((state) => state.serverUrl);
  const selectServer = useAuthStore((state) => state.selectServer);
  const setServerUrl = useAuthStore((state) => state.setServerUrl);

  const [url, setUrl] = useState("http://localhost:3000");
  const [alert, setAlert] = useState("");

  const serverUrlHandler = () => {
    if (url.length <= 0) {
      setAlert("Empty server name. Try again please.");
    } else {
      setServerUrl(url);
      selectServer();
    }
  };

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
        <SubTitle style={styles.title}>Welcome</SubTitle>
        <AppText>{alert}</AppText>
        <InputField
          value={url}
          onChangeText={setUrl}
          style={styles.inputField}
        />
        <Button title="Continue" pressHandler={serverUrlHandler} />
      </View>
      <View style={styles.info}>
        <AppText>No server? </AppText>
        <AppText style={{ fontWeight: "bold" }}> Go to setup guide</AppText>
      </View>
    </View>
  );
};

export default ServerSelectPage;

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
