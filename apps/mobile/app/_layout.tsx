import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#1a1a1a',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Stellix UI Material' }}
        />
      </Stack>
    </>
  );
}
