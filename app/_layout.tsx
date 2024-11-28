import { Stack } from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { StyleSheet, Image, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store";
import logo from "@/assets/images/pricepoff.png";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF4C00",
    secondary: "yellow",
  },
};

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("white");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "",
              headerTitleAlign: "center",
              headerLeft: () => (
                <View style={styles.logoContainer}>
                  <Image source={logo} style={styles.logo} />
                </View>
              ),
            }}
          />
        </Stack>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    paddingHorizontal: 15,
  },
  logo: {
    height: 20,
    resizeMode: "contain",
  },
});
