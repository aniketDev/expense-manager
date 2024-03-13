import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { useFonts } from "expo-font";
import { useAssets } from "expo-asset";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider, DarkTheme, useTheme } from "@react-navigation/native";

// SplashScreen.preventAutoHideAsync();

// let customFonts = {
//   "open-sans": require("../assets/fonts/OpenSans/OpenSans-Regular.ttf"),
//   "open-sans-bold": require("../assets/fonts/OpenSans/OpenSans-Bold.ttf"),
//   "open-sans-light": require("../assets/fonts/OpenSans/OpenSans-Light.ttf"),
//   "open-sans-semibold": require("../assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
// };
// let assets = [];

export default function RootLayout() {
  // let [fontsLoaded, fontLoadingError] = useFonts(customFonts);
  // let [assetsLoaded, assetsLoadingError] = useAssets(assets);
  // useEffect(() => {
  //   if (fontsLoaded || assetsLoaded || fontLoadingError || assetsLoadingError) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, assetsLoaded, fontLoadingError, assetsLoadingError]);

  // if (
  //   !fontsLoaded &&
  //   !assetsLoaded &&
  //   !fontLoadingError &&
  //   !assetsLoadingError
  // ) {
  //   return null;
  // }
  const theme = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={theme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

