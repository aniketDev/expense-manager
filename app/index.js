import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native"

export default function Index() {
  return (
    <View>
      <Text>Index</Text>
      <Link href="/home">Go to home</Link>
    </View>
  )
}