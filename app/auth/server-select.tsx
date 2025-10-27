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
import { isUrlValid } from "helpers/misc";

const ServerSelectPage = () => {
  const serverUrl = useAuthStore((state) => state.serverUrl);
  const selectServer = useAuthStore((state) => state.selectServer);
  const setServerUrl = useAuthStore((state) => state.setServerUrl);

  const [url, setUrl] = useState("http://10.0.2.2:3000");
  const [alert, setAlert] = useState("");

  const serverUrlHandler = () => {
    if (url.length <= 0) {
      setAlert("Empty server name. Try again please.");
    } else if (!isUrlValid(url)) {
      setAlert("URL is invalid. Please check if the url is correct.");
    } else {
      setServerUrl(url);
      selectServer();
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{ uri: SMUZZI_LOGO }}
          width={200}
          height={100}
        />
      </View>
      <View style={styles.content}>
        <SubTitle style={styles.title}>Welcome</SubTitle>
        <InputField
          value={url}
          onChangeText={setUrl}
          style={styles.inputField}
          placeholder="Please enter your server URL"
        />
        <Button
          disabled={!url}
          title="Continue"
          pressHandler={serverUrlHandler}
        />
        <AppText style={styles.alert}>{alert}</AppText>
      </View>
      <View style={styles.footer}>
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

  header: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  inputField: {
    backgroundColor: Colors.primaryDarkerDarker,
    marginVertical: 20,
  },
  alert: {
    marginTop: 10,
    color: Colors.danger,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingVertical: 16,
  },
});
