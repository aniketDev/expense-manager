import { Stack } from 'expo-router';
import { colors } from 'theme/colors';

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.accent,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="createGroup" options={{ title: 'Create group' }} />
      <Stack.Screen name="selectMembers" options={{ title: 'Select members' }} />
    </Stack>
  );
};

export default HomeLayout;
