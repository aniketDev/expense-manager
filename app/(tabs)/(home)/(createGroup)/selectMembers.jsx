import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { CheckSquare, Plus, Users, Square } from 'react-native-feather';
import { colors } from 'theme/colors';
import Checkbox from 'expo-checkbox';

const SelectMembers = () => {
  const [name, setName] = useState('');
  const [isChecked, setChecked] = useState(false);

  const styles = StyleSheet.create({});
  return (
    <View className="flex gap-7 p-5">
      <View className="flex flex-row">
        <View className="flex-1 pr-5">
          <Text for="memberName">Enter member name</Text>
          <TextInput
            className="border-b focus:border-purple-600 focus:border-b-2 text-lg"
            onChangeText={(value) => setName(value)}
            value={name}
            id="memberName"
          />
        </View>
        <View className="bg-purple-200 p-4 rounded-xl">
          <Plus height="24" width="24" stroke={`${colors.textPrimary}`} />
        </View>
      </View>
      <View>
        <Text className="">Members List</Text>
        {['Aniket Mandal', 'Sangeeta Mandal'].map((name) => (
          <View className="flex flex-row">
            <View
              key={name}
              className="flex flex-row basis-5/6 rounded-lg m-3 mx-1 p-3 bg-secondarybackground gap-3 items-center"
            >
              <Users height="24" width="24" stroke={`${colors.textPrimary}`} />
              <Text>{name}</Text>
            </View>
            <View className="flex flex-row basis-1/6 items-center justify-center">
              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SelectMembers;
