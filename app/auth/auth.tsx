import AppText from "@components/AppText";
import Button from "@components/Buttons/Button";
import InputField from "@components/InputField";
import { Colors } from "constants/colors";
import { globalStyles, SMUZZI_LOGO } from "constants/global";
import { useState } from "react";
import { Pressable, View, StyleSheet, Image } from "react-native";
import { useAuthStore } from "utils/authStore";

type Mode = "signin" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuthStore();

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === "signin") {
        await logIn();
      } else {
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Image
        style={styles.logo}
        source={{ uri: SMUZZI_LOGO }}
        width={200}
        height={100}
      />
      <View style={styles.toggleRow}>
        <Pressable
          onPress={() => setMode("signin")}
          style={[styles.toggleButton, mode !== "signin" && styles.inActive]}
        >
          <AppText>Sign in</AppText>
        </Pressable>
        <Pressable
          onPress={() => setMode("signup")}
          style={[styles.toggleButton, mode !== "signup" && styles.inActive]}
        >
          <AppText>Create account</AppText>
        </Pressable>
      </View>

      <InputField
        style={styles.inputField}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        style={styles.inputField}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      {mode === "signup" && (
        <InputField
          style={styles.inputField}
          placeholder="Confirm password"
          isPassword
        />
      )}

      <Button
        title={mode === "signin" ? "Sign in" : "Create account"}
        pressHandler={submit}
        disabled={!email && !password}
      />

      <Pressable
        onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
        style={styles.switchLink}
      >
        <AppText>
          {mode === "signin"
            ? "No account? Create one"
            : "Have an account? Sign in"}
        </AppText>
      </Pressable>
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
  logo: {
    alignSelf: "center",
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
