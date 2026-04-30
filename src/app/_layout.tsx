import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AuthScreen from '@/components/auth';
import { AuthProvider } from '@/providers/auth-provider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import App from './index';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <AnimatedSplashOverlay />
        <App />
      </AuthProvider>
    </ThemeProvider>
  );
}
