import { COLORS } from "@/styles/color";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
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
          fontWeight: "bold",
        },
        headerTitle: "FineMate",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="fines"
        options={{
          title: "Fines",
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="file-text" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "QR Code",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="credit-card" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FeatherIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
