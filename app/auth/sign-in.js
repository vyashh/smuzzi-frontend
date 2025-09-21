import { Button, Text, View } from "react-native";
import { useAuthStore } from "../../utils/authStore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SignInPage = () => {
  const { logIn, logOut } = useAuthStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Sign in</Text>

        <Button onPress={logIn} title="SignIn"></Button>
        <Button onPress={logOut} title="SignOut"></Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignInPage;
