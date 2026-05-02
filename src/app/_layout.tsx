import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { useAuthContext } from '@/hooks/use-auth-context';
import { AuthProvider } from '@/providers/auth-provider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

function RootNavigator() {
  const { session, isInitialized } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();
  console.log({ session });

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (session && !inTabsGroup) {
      // User is signed in but not in tabs group (e.g., at root or auth)
      router.replace('/(tabs)');
    } else if (!session && !inAuthGroup) {
      // User is signed out but not in auth group (e.g., at root or tabs)
      router.replace('/(auth)');
    }
  }, [session, isInitialized, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <AnimatedSplashOverlay />
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
