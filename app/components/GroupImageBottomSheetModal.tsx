import { View, Pressable, StyleSheet, Image } from 'react-native';
import React, { useCallback, useMemo, forwardRef, ForwardedRef } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from 'theme/colors';
import { groupImages } from '@/app/utils/localGroupImages';

interface GroupImageBottomSheetModalProps {
  onGroupImageSelect: (title: string) => void;
}

export const GroupImageBottomSheetModal = forwardRef(
  (props: GroupImageBottomSheetModalProps, ref: ForwardedRef<BottomSheetModal>) => {
    const snapPoints = useMemo(() => ['50%'], []);

    const handleSheetChanges = useCallback(() => {}, []);

    const handleGroupImageSelect = (title: string) => {
      props.onGroupImageSelect(title);
    };

    const styles = StyleSheet.create({
      backgroundStyle: {
        backgroundColor: `${colors.secondarybackground}`,
      },
      sheetContainer: {
        marginHorizontal: 12,
      },
      imageContainer: {},
      image: {
        height: 100,
        width: 100,
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
        backgroundStyle={styles.backgroundStyle}>
        <BottomSheetView className="p-5">
          <View className="flex-row gap-2 justify-between" style={styles.imageContainer}>
            {groupImages.map(({ id, title, image }) => (
              <Pressable key={id} onPress={() => handleGroupImageSelect(title)}>
                <Image source={image} style={styles.image} />
              </Pressable>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
