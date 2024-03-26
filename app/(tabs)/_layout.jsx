import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Users, Bell, Settings } from 'react-native-feather';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const TabLayout = () => {
  const tabOptions = {
    tabBarActiveTintColor: colors.accent,
    tabBarInactiveTintColor: colors.tint,
    tabBarStyle: styles.tabBarStyle,
    tabBarShowLabel: false,
    tabBarItemsStyle: {},
  };
  return (
    <Tabs initialRouteName="groups" screenOptions={tabOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home height={size} width={size} name="home" stroke={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => <Users height={size} width={size} name="home" stroke={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, size }) => <Bell height={size} width={size} name="home" stroke={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings height={size} width={size} name="home" stroke={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  sceneContainerStyle: {},
  tabBarStyle: {
    height: 60,
  },
});

export default TabLayout;
