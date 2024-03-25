import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text } from 'react-native';
import { groupsData } from '../../assets/mocks/group-data';
import { GroupCard } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { Plus } from 'react-native-feather';

const groups = () => {
  return (
    // alternate bg color: #E8DCFC, fffbe6
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
      <ScrollView showsHorizontalScrollIndicator={false} className="p-5 bg-gradient-to-bl">
        <View className="mb-5 flex flex-row justify-between items-center">
          <Text className="text-3xl font-medium" style={{ color: '#271f3a' }}>
            Groups
          </Text>
          <View className="flex flex-row items-center gap-5">
            <TouchableOpacity>
              <Plus height="24" width="24" stroke="#271f3a" />
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
              <TouchableOpacity key={groupData.id}>
                <View className="shadow-2xl  ">
                  <GroupCard groupData={groupData} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default groups;
