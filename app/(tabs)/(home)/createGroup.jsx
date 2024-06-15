import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const CreateGroup = () => {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>Create</Text>
    </View>
  );
};

export default CreateGroup;
