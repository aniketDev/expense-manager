import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { useColorScheme } from 'nativewind';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const customFonts = {
  'open-sans': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  'open-sans-light': require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
  'open-sans-semibold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
};
const assets: number[] = [];

export default function RootLayout() {
  const [fontsLoaded, fontLoadingError] = useFonts(customFonts);
  const [assetsLoaded, assetsLoadingError] = useAssets(assets);
  const { colorScheme } = useColorScheme();
  const [theme, setTheme] = useState(DefaultTheme);

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

  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(DarkTheme);
    } else {
      setTheme(DefaultTheme);
    }
  }, [colorScheme]);

  if (!fontsLoaded && !assetsLoaded && !fontLoadingError && !assetsLoadingError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider value={theme}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
