import { Alert } from "react-native";

export default (title: string, message: string, onPress?: () => void) => {
  Alert.alert(title, message, [
    {
      text: "Ок",
      style: "default",
      onPress,
    },
  ]);
};
