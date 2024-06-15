import { Stack } from 'expo-router';
import { colors } from '../../../theme/colors';

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.accent,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="createGroup" />
      <Stack.Screen name="groupDetails" />
    </Stack>
  );
};

export default HomeLayout;
