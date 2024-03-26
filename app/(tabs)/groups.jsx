import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { groupsData } from '../../assets/mocks/group-data';
import { GroupCard } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'react-native-feather';
import { colors } from '../../theme/colors';

const groups = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.primarybackground}` }}>
      <ScrollView showsHorizontalScrollIndicator={false} className="p-5 bg-gradient-to-bl">
        <View className="mb-5 flex flex-row justify-between items-center">
          <Text className="text-3xl font-medium" style={{ color: `${colors.textPrimary}` }}>
            Groups
          </Text>
          <View className="flex flex-row items-center gap-5">
            <TouchableOpacity>
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
              <TouchableOpacity key={groupData.id}>
                <GroupCard groupData={groupData} />
              </TouchableOpacity>
            );
            s;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardShadow: {},
});

export default groups;
