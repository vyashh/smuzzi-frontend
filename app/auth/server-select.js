import { Button, StyleSheet, TextInput, View } from "react-native";
import { globalStyles } from "../../constants/globalStyles";
import AppText from "../../components/AppText";
import HeaderTitle from "../../components/HeaderTitle";
import { useAuthStore } from "../../utils/authStore";
import { useState } from "react";

const ServerSelectPage = () => {
  const serverUrl = useAuthStore((state) => state.serverUrl);
  const selectServer = useAuthStore((state) => state.selectServer);
  const setServerUrl = useAuthStore((state) => state.setServerUrl);

  const [url, setUrl] = useState("");
  const [alert, setAlert] = useState("");

  const serverUrlHandler = () => {
    if (url <= 0) {
      setAlert("Empty server name. Try again please.");
    } else {
      setServerUrl(url);
      selectServer();
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderTitle>Welcome</HeaderTitle>
      <AppText>{alert}</AppText>
      <TextInput value={url} onChangeText={setUrl} style={{ color: "#fff" }} />
      <Button onPress={serverUrlHandler} title="Continue" />
    </View>
  );
};

export default ServerSelectPage;

const styles = new StyleSheet.create({});
