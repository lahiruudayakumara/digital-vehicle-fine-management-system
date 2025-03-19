import React from 'react';
import { Tabs } from 'expo-router';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Color palette
const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  text: '#1F2937', // Dark text for light mode
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: 'FineMate',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FeatherIcons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="fines"
        options={{
          title: 'Fines',
          tabBarIcon: ({ color, size }) => <FeatherIcons name="file-text" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: 'QR Code',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="qrcode" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color, size }) => <FeatherIcons name="credit-card" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <FeatherIcons name="user" color={color} size={size} />,
        }}
      />
      
    </Tabs>
  );
}
