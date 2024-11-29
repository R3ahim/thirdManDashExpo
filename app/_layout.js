import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerRight: () => <Button onPress={() => {router.push('contact')}} title="Contact" />,
        }}
      />
           <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

    </Stack>
  );
}
