import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const GroupCard = ({ groupData }) => {
  const { title, image, amount, id } = groupData;
  return (
    <View className="flex-row rounded-3xl mb-3 mx-1 p-3 bg-secondarybackground" key={id} style={styles.cardShadow}>
      <Image source={image} style={{ height: 100, width: 100 }} className="rounded-3xl" />
      <View className="flex-1 pl-5">
        <View className="py-2">
          <Text className="text-xl text-textPrimary">{title}</Text>
          {amount > 0 ? (
            <Text className="text-lime-500">You are owed ₹{amount}</Text>
          ) : (
            <Text className="text-rose-600">You owe ₹{Math.abs(amount)}</Text>
          )}
        </View>
        <View className="flex-1 flex-row items-center">
          <Image
            className="h-8 w-8 rounded-full border-2 border-white relative"
            source={{
              uri: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
          />
          <Image
            className="h-8 w-8 rounded-full border-2 border-white relative -ml-2"
            source={{
              uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
            }}
          />
          <Image
            className="h-8 w-8 rounded-full border-2 border-white relative -ml-2"
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
          />
          <Image
            className="h-8 w-8 rounded-full border-2 border-white relative -ml-2"
            source={{
              uri: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            }}
          />
          <View className="text-sm font-medium px-1.5">
            <Text className="text-accent">+4</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    /* iOS */
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    /* android */
    elevation: 3,
    shadowColor: colors.accent,
  },
});
