import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseCounter,
  decreaseCounter,
} from "./store/reducers/counterReducer";
const app = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{count}</Text>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <Button
          title="Increase"
          onPress={() => dispatch(increaseCounter())}
        ></Button>
        <Button
          title="Decrease"
          onPress={() => dispatch(decreaseCounter())}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default app;
