import { Stack, useRouter } from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  IconButton,
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
    gray: "#ccc",
  },
};

export default function RootLayout() {
  const router = useRouter();

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
              headerRight: () => (
                <IconButton
                  icon="plus"
                  size={30}
                  onPress={() => router.push("/details/create")}
                />
              ),
            }}
          />
          <Stack.Screen
            name="details/create"
            options={{
              title: "Создать прицеп",
              headerTitleAlign: "center",
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
