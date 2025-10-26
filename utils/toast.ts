import { useToast, ToastOptions } from "react-native-toast-notifications";
import { Colors } from "../constants/colors";

type Show = (msg: string, opts?: ToastOptions) => void;

export const useAppToast = () => {
  const toast = useToast();
  const base: ToastOptions = {
    placement: "top",
    duration: 3000,
    animationType: "slide-in",
  };

  const show: Show = (message, opts) =>
    toast.show(message, { ...base, ...opts });

  return {
    info: (message: string, opts?: ToastOptions) =>
      show(message, {
        type: "normal",
        normalColor: Colors.primaryDarker,
        textStyle: { color: "white" },
        ...opts,
      }),
    success: (message: string, opts?: ToastOptions) =>
      show(message, {
        type: "success",
        successColor: Colors.success,
        textStyle: { color: Colors.surface },
        ...opts,
      }),
    error: (message: string, opts?: ToastOptions) =>
      show(message, {
        type: "danger",
        dangerColor: Colors.danger,
        textStyle: { color: "white" },
        ...opts,
      }),
  };
};
