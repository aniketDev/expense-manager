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
  textSize?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  textColor?: string;
  className?: string;
}

const HeaderSaveButton = ({
  title = 'Save',
  iconName = 'save-outline',
  iconSize = 24,
  iconColor = `${colors.secondary}`,
  onPress = () => {},
  textSize = 'lg',
  textColor = `${colors.secondary}`,
  className = '',
}: HeaderSaveButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center gap-2">
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text
          className={`text-secondary text-${textSize} ${className}`}
          style={{ color: textColor }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export { HeaderSaveButton };
