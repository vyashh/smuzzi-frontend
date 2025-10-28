import { Colors } from "constants/colors";
import LoaderKitView from "react-native-loader-kit";

const Loader = () => {
  return (
    <LoaderKitView
      style={{ width: 30, height: 30 }}
      name={"BallScale"}
      animationSpeedMultiplier={1}
      color={Colors.primary}
    />
  );
};

export default Loader;
