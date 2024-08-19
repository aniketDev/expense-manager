import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Users, Square } from 'react-native-feather';
import { colors } from 'theme/colors';
import Checkbox from 'expo-checkbox';
import { addMember, getMembers } from 'store/actions/memberActions';
import { useDispatch, useSelector } from 'react-redux';

const SelectMembers = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);
  const members = useSelector((state) => state.members.data);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const handleOnAddPress = () => {
    dispatch(addMember(name));
    dispatch(getMembers());
  };

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
        <Pressable className="bg-purple-200 p-4 rounded-xl" onPress={() => handleOnAddPress()}>
          <Plus height="24" width="24" stroke={`${colors.textPrimary}`} />
        </Pressable>
      </View>
      <View>
        <Text>Members List</Text>
        {members.length > 0 && (
          <View className="mb-10 pb-10">
            <FlatList
              data={members}
              renderItem={({ item }) => (
                <View className="flex flex-row">
                  <View className="flex flex-row basis-5/6 rounded-lg m-3 mx-1 p-3 bg-secondarybackground gap-3 items-center">
                    <Users height="24" width="24" stroke={`${colors.textPrimary}`} />
                    <Text>{item.name}</Text>
                  </View>
                  <View className="flex flex-row basis-1/6 items-center justify-center">
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectMembers;
