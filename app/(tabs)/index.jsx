import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from '../store/slices/counterSlice';
const index = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <View className="flex-1 justify-center items-center bg-slate-700">
      <Text className="color-white">Open up App.js to start working on your app!</Text>
      <Text className="color-white">{count}</Text>
      <StatusBar style="auto" />
      <View className="flex flex-row gap-8">
        <Button title="Increase" onPress={() => dispatch(increaseCounter())}></Button>
        <Button title="Decrease" onPress={() => dispatch(decreaseCounter())}></Button>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 10,
//   },
// });

export default index;
