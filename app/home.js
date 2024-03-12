import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function Home() {
  const goBack = () => {
    router.back();
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="Back" onPress={() => goBack()}>Go back</Button>
    </View>
  );
}
