import AppText from "@components/AppText";
import Button from "@components/Buttons/Button";
import InputField from "@components/InputField";
import { Colors } from "constants/colors";
import { globalStyles, SMUZZI_LOGO } from "constants/global";
import { useEffect, useState } from "react";
import { Pressable, View, StyleSheet, Image } from "react-native";
import { useAuthStore } from "utils/authStore";

type Mode = "signin" | "signup" | "server";

const AuthPage = () => {
  const {
    serverSelected,
    serverUrl,
    setServerUrl,
    selectServer,
    logIn,
    isFetching,
  } = useAuthStore();
  const [mode, setMode] = useState<Mode>(serverSelected ? "signin" : "server");
  const [url, setUrl] = useState<string>(serverUrl || "");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submit = async () => {
    try {
      if (mode === "signin") {
        await logIn();
      } else {
      }
    } finally {
    }
  };

  useEffect(() => {
    setMode(serverSelected ? "server" : "server");
  }, [serverSelected]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image
        style={styles.logo}
        source={{ uri: SMUZZI_LOGO }}
        width={200}
        height={100}
      />
      {mode === "server" && (
        <View style={styles.content}>
          <AppText style={styles.title}>Select your server</AppText>
          {!!error && <AppText style={styles.error}>{error}</AppText>}
          <InputField
            placeholder="Enter your server URL"
            value={url}
            onChangeText={setUrl}
          />
          <Button title="Continue" pressHandler={submit} />
        </View>
      )}
    </View>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: Colors.primaryDark,
  },
  content: { justifyContent: "center" },

  logo: {
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  error: {
    color: Colors.danger,
  },
  inputField: {
    backgroundColor: Colors.primaryDarkerDarker,
    marginVertical: 5,
  },
  toggleRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 16,
  },
  toggleButton: {
    padding: 8,
  },
  inActive: {
    opacity: 0.5,
  },
  switchLink: {
    alignSelf: "center",
    marginTop: 12,
  },
});
