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

    if (session && (inAuthGroup || !segments[0])) {
      // User is signed in but in auth group or root, redirect to home
      router.replace('/(tabs)/(home)');
    } else if (!session && !inAuthGroup) {
      // User is signed out but not in auth group, redirect to auth
      router.replace('/(auth)');
    }
  }, [session, isInitialized, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="create-group" options={{ presentation: 'modal' }} />
        <Stack.Screen name="group/[id]/add-expense" options={{ presentation: 'modal', title: 'Add Expense' }} />
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
