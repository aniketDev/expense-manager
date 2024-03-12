import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function Footer() {
  const goBack = () => {
    router.back();
  };
  return (
    <View>
      <Text>Footer</Text>
    </View>
  );
}
