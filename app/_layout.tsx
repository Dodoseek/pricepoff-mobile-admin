import { Stack } from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "@/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stack />
      </PaperProvider>
    </Provider>
  );
}
