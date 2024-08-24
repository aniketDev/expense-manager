import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'theme/colors';

interface HeaderSaveButtonProps {
  title?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  onPress?: () => void;
}

const HeaderSaveButton = ({
  title = 'Save',
  iconName = 'save-outline',
  iconSize = 20,
  iconColor = `${colors.textSecondary}`,
  onPress = () => {},
}: HeaderSaveButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center gap-2">
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text className="text-secondary">{title}</Text>
      </View>
    </Pressable>
  );
};

export { HeaderSaveButton };
