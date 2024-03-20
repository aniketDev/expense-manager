import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import { store } from './store';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const customFonts = {
  'open-sans': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  'open-sans-bold': require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  'open-sans-light': require('../assets/fonts/OpenSans/OpenSans-Light.ttf'),
  'open-sans-semibold': require('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
};
const assets = [];

export default function RootLayout() {
  const [fontsLoaded, fontLoadingError] = useFonts(customFonts);
  const [assetsLoaded, assetsLoadingError] = useAssets(assets);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontLoadingError) {
      throw fontLoadingError;
    } else if (assetsLoadingError) {
      throw assetsLoadingError;
    }
  }, [fontLoadingError, assetsLoadingError]);

  useEffect(() => {
    if (fontsLoaded || assetsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, assetsLoaded]);

  if (!fontsLoaded && !assetsLoaded && !fontLoadingError && !assetsLoadingError) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
