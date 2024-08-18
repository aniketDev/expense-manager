import { View, Text, Pressable, Button, StyleSheet } from 'react-native';
import React, { useRef, useCallback, useMemo, forwardRef } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { colors } from 'theme/colors';
import { Home, Plus, Users } from 'react-native-feather';

export const CustomBottomSheetModal = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const onCategorySelect = (category) => {
    props.onCategorySelect(category);
  };

  const styles = StyleSheet.create({
    backgroundStyle: {
      backgroundColor: `${colors.secondarybackground}`,
    },
    sheetContainer: {
      marginHorizontal: 12,
    },
  });

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      detached={true}
      bottomInset={72}
      style={styles.sheetContainer}
      backgroundStyle={styles.backgroundStyle}
    >
      <View className="p-5">
        <View className="flex flex-row justify-between items-center">
          <Text className="">Select Category</Text>
          <Pressable className="flex flex-row items-center gap-3">
            <Plus height="16" width="16" stroke={`${colors.textPrimary}`} />
            <Text>Add Category</Text>
          </Pressable>
        </View>
        <View className="p-2 pt-5 flex flex-row flex-wrap justify-start">
          {['Home', 'Personal', 'Office', 'Trip', 'Friends', 'Sports', 'Others'].map((name) => (
            <Pressable
              key={name}
              className="flex items-center justify-center basis-1/4 pb-5"
              onPress={() => onCategorySelect(name)}
            >
              <Users height="48" width="48" stroke={`${colors.textPrimary}`} />
              <Text className="pt-2">{name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </BottomSheetModal>
  );
});
