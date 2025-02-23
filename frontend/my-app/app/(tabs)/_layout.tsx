import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: {display: 'none'},
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarStyle: {display: 'none'},
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="BookingPage"
        options={{
          tabBarStyle: {display: 'none'},
          title: 'Booking',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="basketball.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="SignUpPage"
        options={{
          tabBarStyle: {display: 'none'},
          title: 'SignUp',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="basketball.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
