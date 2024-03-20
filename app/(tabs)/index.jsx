import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from '../store/slices/counterSlice';
const index = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <View className="flex-1 justify-center items-center bg-gray-200 gap-4 dark:bg-slate-800">
      <Text className="color-slate-700 dark:color-zinc-400">Open up App.js to start working on your app!</Text>
      <Text className="color-slate-700 dark:color-zinc-400">{count}</Text>
      <StatusBar style="auto" />
      <View className="flex flex-row gap-8">
        <Button title="Increase" onPress={() => dispatch(increaseCounter())}></Button>
        <Button title="Decrease" onPress={() => dispatch(decreaseCounter())}></Button>
      </View>
    </View>
  );
};

export default index;
