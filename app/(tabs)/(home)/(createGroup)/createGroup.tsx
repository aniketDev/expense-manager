import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, TextInput, Pressable, Image } from 'react-native';
import { Camera, ChevronDown, ChevronRight, Home, UserPlus } from 'react-native-feather';
import { colors } from 'theme/colors';
import { router, useNavigation } from 'expo-router';
import { CustomBottomSheetModal, HeaderSaveButton } from 'components';
import { useBottomSheetModal, BottomSheetModal } from '@gorhom/bottom-sheet';
import { GroupImageBottomSheetModal } from '@/app/components/GroupImageBottomSheetModal';
import { groupImages } from '@/app/utils/localGroupImages';

const CreateGroup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [groupImageName, setGroupImageName] = useState('');
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderSaveButton />,
    });
  }, [navigation]);

  const onAddMembersPress = () => {
    router.push('/selectMembers');
  };

  const categoryBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const groupImageBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleSelectCategoryPress = useCallback(() => {
    categoryBottomSheetModalRef.current?.present();
  }, []);

  const handleGroupIconPress = useCallback(() => {
    groupImageBottomSheetModalRef.current?.present();
  }, []);

  const { dismiss } = useBottomSheetModal();
  const [category, setCategory] = useState('Category');

  const onCategorySelect = (category: string) => {
    dismiss();
    setCategory(category);
  };

  const onGroupImageSelect = (title: string) => {
    dismiss();
    setGroupImageName(title);
  };
  const renderSelectedGroupImage = () => {
    const image = groupImages.find((groupImage) => groupImage.title === groupImageName);
    return (
      <View className="rounded-xl">
        <Image source={image?.image} style={{ height: 50, width: 50 }} />
      </View>
    );
  };

  return (
    <View className="px-3 py-5 flex gap-5">
      <CustomBottomSheetModal
        ref={categoryBottomSheetModalRef}
        onCategorySelect={onCategorySelect}
      />
      <GroupImageBottomSheetModal
        ref={groupImageBottomSheetModalRef}
        onGroupImageSelect={onGroupImageSelect}
      />
      <View className="flex flex-row items-center gap-4 w-full">
        <Pressable onPress={handleGroupIconPress}>
          {groupImageName ? (
            renderSelectedGroupImage()
          ) : (
            <View className="bg-purple-200 p-4 rounded-xl">
              <Camera height="24" width="24" stroke={`${colors.textPrimary}`} />
            </View>
          )}
        </Pressable>
        <View className="flex-1">
          <Text>Group name</Text>
          <TextInput
            className="border-b focus:border-purple-600 focus:border-b-2 text-lg"
            onChangeText={(value) => setName(value)}
            value={name}
            id="groupName"
          />
        </View>
      </View>
      {/*<View>*/}
      {/*  <Text className="mb-3">Select category</Text>*/}
      {/*  <Pressable onPress={handleSelectCategoryPress}>*/}
      {/*    <View className="flex-row justify-between items-center bg-white p-5 rounded-xl">*/}
      {/*      <View className="flex-row items-center gap-3">*/}
      {/*        <Home height="16" width="16" stroke={`${colors.textPrimary}`} />*/}
      {/*        <Text>{category}</Text>*/}
      {/*      </View>*/}
      {/*      <View>*/}
      {/*        <ChevronDown height="24" width="24" stroke={`${colors.textPrimary}`} />*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
      <View>
        <Text className="mb-3">Select members</Text>
        <Pressable onPress={onAddMembersPress}>
          <View className="flex-row justify-between items-center bg-white p-5 rounded-xl">
            <View className="flex-row items-center gap-3">
              <UserPlus height="16" width="16" stroke={`${colors.textPrimary}`} />
              <Text>Add members</Text>
            </View>
            <View>
              <ChevronRight height="24" width="24" stroke={`${colors.textPrimary}`} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateGroup;
