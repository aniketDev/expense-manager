import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Plus, Users, Trash2 } from 'react-native-feather';
import { colors } from 'theme/colors';
import Checkbox from 'expo-checkbox';
import { addMember, deleteMember, getMembers } from 'store/actions/memberActions';
import { Member, MembersState } from '@/app/types';
import { useAppDispatch, useAppSelector } from '@/app/types/withTypes';
import { useNavigation } from 'expo-router';
import { HeaderSaveButton } from 'components';
import { setSelectedMembersList } from '@/app/store/slices/membersSlice';

interface StateType {
  members: MembersState;
}

const SelectMembers = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const selectedMembersFromStore = useAppSelector((state: StateType) => {
    return state.members.selectedMembers as Member[];
  });
  const loading = useAppSelector((state: StateType) => {
    return state.members.isLoading;
  });
  const [selectedMembers, setSelectedMembers] = useState<Member[]>(selectedMembersFromStore);
  const members = useAppSelector((state: StateType) => state.members.data as Member[]);

  const onSubmit = () => {
    dispatch(setSelectedMembersList(selectedMembers));
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderSaveButton title="Done" iconName="checkmark-outline" onPress={() => onSubmit()} />
      ),
    });
  }, [navigation, selectedMembers]);

  const handleOnAddPress = () => {
    dispatch(addMember(name));
    setName('');
    dispatch(getMembers());
  };

  const onCheckboxClick = (item: Member) => {
    const isMemberAlreadySelected =
      selectedMembers && selectedMembers.some((member) => member.id === item.id);
    const updatedMembers = !isMemberAlreadySelected
      ? [...selectedMembers, item]
      : selectedMembers.filter((m) => m.id !== item.id);
    setSelectedMembers(updatedMembers);
  };

  const isItemChecked = (item: Member) => {
    return selectedMembers.some((member) => member.id === item.id);
  };

  const handleDeleteMember = (item: Member) => {
    dispatch(deleteMember(item.id));
    dispatch(getMembers());
  };

  return (
    <View className="flex gap-7 p-5">
      <View className="flex flex-row">
        <View className="flex-1 pr-5">
          <Text>Enter member name</Text>
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
          <View className="mb-60">
            {loading ? (
              <Text>loading</Text>
            ) : (
              <FlatList
                data={members}
                renderItem={({ item }) => (
                  <View className="flex flex-row">
                    <View className="flex flex-row basis-1/6 items-center justify-center">
                      <Trash2
                        height="24"
                        width="24"
                        stroke={colors.red}
                        onPress={() => {
                          handleDeleteMember(item);
                        }}
                      />
                    </View>
                    <View className="flex flex-row basis-4/6 rounded-lg m-3 mx-1 p-3 bg-secondarybackground gap-3 items-center">
                      <Users height="24" width="24" stroke={`${colors.textPrimary}`} />
                      <Text>{item.name}</Text>
                    </View>
                    <View className="flex flex-row basis-1/6 items-center justify-center">
                      <Checkbox
                        value={isItemChecked(item)}
                        onValueChange={() => onCheckboxClick(item)}
                      />
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default SelectMembers;
