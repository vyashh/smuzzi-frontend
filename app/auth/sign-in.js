import { Button, Text, View } from "react-native";
import { useAuthStore } from "../../utils/authStore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SignInPage = () => {
  const { logIn } = useAuthStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Sign in</Text>

        <Button onPress={logIn} title="SignIn"></Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignInPage;
