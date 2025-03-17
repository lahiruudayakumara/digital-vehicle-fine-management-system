// app/(tabs)/_layout.tsx
import React from 'react';
import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons

// Colors based on your specification
const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  darkMode: '#111827', // Dark Gray
  text: '#1F2937', // Dark text for light mode
  textLight: '#F9FAFB', // Light text for dark mode
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // Set the colors based on the color scheme
  const theme = {
    background: isDarkMode ? COLORS.darkMode : COLORS.background,
    text: isDarkMode ? COLORS.textLight : COLORS.text,
    tabBackground: isDarkMode ? '#1F2937' : COLORS.white,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.tabBackground,
          borderTopColor: isDarkMode ? '#2D3748' : '#E5E7EB',
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />, // Home icon
        }}
      />
      <Tabs.Screen
        name="fines"
        options={{
          title: "Fines",
          tabBarIcon: ({ color, size }) => <Icon name="file-text" color={color} size={size} />, // File icon
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color, size }) => <Icon name="qrcode" color={color} size={size} />, // QR code icon
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: "Payments",
          tabBarIcon: ({ color, size }) => <Icon name="credit-card" color={color} size={size} />, // Credit card icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />, // User icon
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />, // Settings icon
        }}
      />
    </Tabs>
  );
}
