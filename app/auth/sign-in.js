import { Button, Text, View } from "react-native";
import { useAuthStore } from "../../utils/authStore";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SignInPage = () => {
  const { serverUrl, logOut } = useAuthStore();

  console.log(serverUrl);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Sign in</Text>

        <Button onPress={logOut} title="LogOut"></Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignInPage;
