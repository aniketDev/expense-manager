import React from 'react';
import { router } from 'expo-router';
import { View, TouchableOpacity, ScrollView, Image, Text, Pressable } from 'react-native';
import { GroupCard } from 'components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'react-native-feather';
import { colors } from 'theme/colors';
import { useGetGroupsQuery } from 'store/apis/groupsApi';
import { groupImages } from '@/app/utils/localGroupImages';
import { GroupCardData } from '@/app/types';

const Home = () => {
  const { data } = useGetGroupsQuery();
  const groupsData: GroupCardData[] =
    (data &&
      data.map((group) => {
        const image = groupImages.find((groupImage) => groupImage.title === group.image);
        return {
          id: group.id,
          title: group.title,
          amount: group.amount,
          image: image?.image || '',
        };
      })) ||
    [];

  const handleGroupPress = (id: string | undefined) => {
    router.push({ pathname: '/groupDetails', params: { id } });
  };

  const handleCreateGroupPress = () => {
    router.push({ pathname: '/createGroup' });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.primarybackground}` }}>
      <ScrollView showsHorizontalScrollIndicator={false} className="p-5 bg-gradient-to-bl">
        <View className="mb-5 flex flex-row justify-between items-center">
          <Text className="text-3xl font-medium" style={{ color: `${colors.textPrimary}` }}>
            Groups
          </Text>
          <View className="flex flex-row items-center gap-5">
            <TouchableOpacity onPress={handleCreateGroupPress}>
              <Plus height="24" width="24" stroke={`${colors.textPrimary}`} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={{ height: 40, width: 40 }}
                className="rounded-full border-2 border-white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-16">
          {groupsData.map((groupData) => {
            return (
              <Pressable key={groupData.id} onPress={() => handleGroupPress(groupData.id)}>
                <GroupCard groupData={groupData} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
