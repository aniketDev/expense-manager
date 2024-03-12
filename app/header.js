import { router } from "expo-router";
import React from "react";
import { View, Button, Text } from "react-native";

export default function Header() {
  const goBack = () => {
    router.back();
  };
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
}
