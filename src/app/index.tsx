import AppTabs from '@/components/app-tabs';
import AuthScreen from '@/components/auth';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useStore } from '@/store';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const user = useStore((state) => state.session?.user);
  const { isInitialized } = useAuthContext();
  console.log({ isInitialized, user });

  return (
    <ThemedView style={styles.container}>
      {isInitialized && user ? (
        <AppTabs />
      ) : (
        <SafeAreaView style={styles.safeArea}>
          <AuthScreen />
        </SafeAreaView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
});
