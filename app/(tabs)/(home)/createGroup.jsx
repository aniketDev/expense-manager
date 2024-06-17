import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { Camera, ChevronDown, ChevronRight, Home, UserPlus, Users } from 'react-native-feather';
import { colors } from 'theme/colors';
import { useNavigation } from 'expo-router';
import HeaderSaveButton from 'components/headerSaveButton';

const CreateGroup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderSaveButton />,
    });
  }, [navigation]);

  return (
    <View className="px-3 py-5 flex gap-5">
      <View className="flex flex-row items-center gap-4 w-full">
        <View className="bg-purple-200 p-4">
          <Camera height="24" width="24" stroke={`${colors.textPrimary}`} />
        </View>
        <View className="w-full">
          <Text for="groupName">Group name</Text>
          <TextInput
            className="border-b focus:border-purple-600 focus:border-b-2 text-lg"
            onChangeText={(value) => setName(value)}
            value={name}
            id="groupName"
          />
        </View>
      </View>
      <View>
        <Text className="mb-3">Select category</Text>
        <View className="flex-row justify-between items-center bg-white p-5 rounded-xl">
          <View className="flex-row items-center gap-3">
            <Home height="16" width="16" stroke={`${colors.textPrimary}`} />
            <Text>Category</Text>
          </View>
          <View>
            <ChevronDown height="24" width="24" stroke={`${colors.textPrimary}`} />
          </View>
        </View>
      </View>
      <View>
        <Text className="mb-3">Select members</Text>
        <View className="flex-row justify-between items-center bg-white p-5 rounded-xl">
          <View className="flex-row items-center gap-3">
            <UserPlus height="16" width="16" stroke={`${colors.textPrimary}`} />
            <Text>Add members</Text>
          </View>
          <View>
            <ChevronRight height="24" width="24" stroke={`${colors.textPrimary}`} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateGroup;
