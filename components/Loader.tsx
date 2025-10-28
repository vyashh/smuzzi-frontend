import { Colors } from "constants/colors";
import LoaderKitView from "react-native-loader-kit";

const Loader = () => {
  return (
    <LoaderKitView
      style={{ width: 15, height: 15 }}
      name={"BallScale"}
      animationSpeedMultiplier={1}
      color={Colors.primary}
    />
  );
};

export default Loader;
