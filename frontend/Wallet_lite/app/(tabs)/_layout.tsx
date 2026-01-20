import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs , } from 'expo-router';
import React from 'react';



import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BottomTabNavigator } from 'expo-router/build/layouts/TabsClient';
import { LogBox } from 'react-native';


// LogBox.ignoreAllLogs(true);


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explores',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      /> */}
      {/* <Tabs.Screen
        name="animated"
        options={{
          title: 'animated',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="dashboard" color={color} />,
        }} *
       /> */}
      <Tabs.Screen
        name="analyse"
        options={{
          title: 'Analyse',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="analytics" color={color} />,
        }}
      />
     
    </Tabs>
  );
}
// build grid_view sms chat mail tune 