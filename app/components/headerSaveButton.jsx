import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const headerSaveButton = ({
  title = 'Save',
  iconName = 'save-outline',
  iconSize = 20,
  iconColor = `${colors.textSecondary}`,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center gap-2">
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text className="text-secondary">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default headerSaveButton;
