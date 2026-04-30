import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  // This screen is just a placeholder.
  // The useEffect in _layout.tsx will instantly redirect the user
  // away from this screen to either /(auth) or /(tabs).
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
