// Importing necessary modules and components
import { COLORS } from "@/styles/color";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Tabs } from "expo-router";

// Main TabLayout component that defines the tab navigation
export default function TabLayout() {
  return (
    <Tabs
      // Setting global screen options for the tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary, // Active tab icon color
        tabBarInactiveTintColor: "gray", // Inactive tab icon color
        tabBarStyle: {
          backgroundColor: COLORS.white, // Tab bar background color
          borderTopWidth: 0, // Removing the top border
          height: 60, // Tab bar height
          paddingBottom: 8, // Padding at the bottom
          paddingTop: 8, // Padding at the top
        },
        headerStyle: {
          backgroundColor: COLORS.primary, // Header background color
        },
        headerTintColor: COLORS.white, // Header text color
        headerTitleStyle: {
          fontWeight: "bold", // Header title font weight
        },
        headerTitle: "FineMate", // Default header title
      }}
    >
      {/* Home tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home", // Tab title
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="home" color={color} size={size} /> // Home icon
          ),
        }}
      />
      {/* Fines tab */}
      <Tabs.Screen
        name="fines"
        options={{
          title: "Fines", // Tab title
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="file-text" color={color} size={size} /> // Fines icon
          ),
        }}
      />
      {/* QR Code tab */}
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "QR Code", // Tab title
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} /> // QR Code icon
          ),
        }}
      />
      {/* Transactions tab */}
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions", // Tab title
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="credit-card" color={color} size={size} /> // Transactions icon
          ),
        }}
      />
      {/* Profile tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile", // Tab title
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="user" color={color} size={size} /> // Profile icon
          ),
        }}
      />
    </Tabs>
  );
}
