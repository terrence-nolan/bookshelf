import { Tabs } from 'expo-router';
import React from 'react';
import { House, Books, Headphones, Microphone, Timer } from 'phosphor-react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
          tabBarIcon: ({ color, focused }) => (
            <Books size={28} weight={focused ? 'fill' : 'regular'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="audiobooks"
        options={{
          title: 'Audiobooks',
          tabBarIcon: ({ color, focused }) => (
            <Headphones size={28} weight={focused ? 'fill' : 'regular'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="podcasts"
        options={{
          title: 'Podcasts',
          tabBarIcon: ({ color, focused }) => (
            <Microphone size={28} weight={focused ? 'fill' : 'regular'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House size={28} weight={focused ? 'fill' : 'regular'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
