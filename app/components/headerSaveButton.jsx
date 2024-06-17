import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'theme/colors';

const headerSaveButton = ({
  title = 'Save',
  iconName = 'save-outline',
  iconSize = 20,
  iconColor = `${colors.textSecondary}`,
  onPress = () => {},
}) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center gap-2">
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text className="text-secondary">{title}</Text>
      </View>
    </Pressable>
  );
};

export default headerSaveButton;
