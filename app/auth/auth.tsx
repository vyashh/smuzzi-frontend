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
    logIn,
    isFetching,
    setUserPassword,
  } = useAuthStore();
  const [mode, setMode] = useState<Mode>(serverSelected ? "signin" : "server");
  const [url, setUrl] = useState<string>(serverUrl || "");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleServerSelect = () => {
    try {
      setServerUrl(url);
    } catch (error) {
      console.log(error);
    } finally {
      setMode("signin");
    }
  };

  useEffect(() => {
    setMode(serverSelected ? "signin" : "server");
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
            style={styles.inputField}
          />
          <Button
            title="Continue"
            pressHandler={handleServerSelect}
            style={styles.button}
          />
        </View>
      )}

      {mode !== "server" && (
        <View style={styles.content}>
          <View style={styles.toggleRow}>
            <Pressable
              onPress={() => setMode("signin")}
              style={[
                styles.toggleButton,
                mode !== "signin" && styles.inActive,
              ]}
            >
              <AppText>Sign in</AppText>
            </Pressable>
            <Pressable
              onPress={() => setMode("signup")}
              style={[
                styles.toggleButton,
                mode !== "signup" && styles.inActive,
              ]}
            >
              <AppText>Create account</AppText>
            </Pressable>
          </View>

          <InputField
            placeholder="Username"
            value={userName}
            onChangeText={setUserName}
            style={styles.inputField}
          />
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            style={styles.inputField}
          />

          {mode === "signup" && (
            <InputField placeholder="Confirm password" isPassword />
          )}
          <Pressable
            onPress={() => setMode("server")}
            style={styles.changeServer}
          >
            <AppText style={styles.changeServerText}>Change server</AppText>
          </Pressable>
          <Button
            title={mode === "signin" ? "Sign in" : "Create account"}
            pressHandler={() => console.log("")}
            style={styles.button}
          />

          {/* <Pressable
            onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
            style={styles.switchLink}
          >
            <AppText>
              {mode === "signin"
                ? "No account? Create one"
                : "Have an account? Sign in"}
            </AppText>
          </Pressable> */}
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
  button: {
    marginTop: 18,
  },
  inActive: {
    opacity: 0.5,
  },
  changeServer: {
    alignSelf: "center",
    marginTop: 8,
  },
  changeServerText: {
    opacity: 0.6,
  },

  switchLink: {
    alignSelf: "center",
    marginTop: 12,
  },
});
