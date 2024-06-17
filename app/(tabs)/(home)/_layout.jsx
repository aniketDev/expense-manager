import { Stack } from 'expo-router';
import { colors } from '../../../theme/colors';
import { Button } from 'react-native';

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
      <Stack.Screen name="createGroup" options={{ title: 'Create group' }} />
      <Stack.Screen name="groupDetails" options={{ title: 'Group details' }} />
    </Stack>
  );
};

export default HomeLayout;
