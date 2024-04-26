import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const GroupDetails = () => {
  const params = useLocalSearchParams();
  return <Text>GroupDetails {params.id}</Text>;
};

export default GroupDetails;
