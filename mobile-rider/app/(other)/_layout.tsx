// E:\digital-vehicle-fine-management-system\mobile-rider\app\(other)\_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Color palette - same as in (tabs)/_layout.tsx
const COLORS = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#FACC15", // Bright Yellow
  accent: "#DC2626", // Traffic Red
  background: "#F3F4F6", // Light Gray
  white: "#FFFFFF",
  success: "#16A34A", // Green
  text: "#1F2937", // Dark text for light mode
};

export default function OtherLayout() {
  const router = useRouter();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "FineMate",
          // This hides the parent header that's showing "(other)"
          headerShown: true,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: "Settings",
            // Make sure this is true to show the Settings header
            headerShown: true 
          }} 
        />
      </Stack>

      {/* Custom Tab Bar */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.white,
          height: 55,
          paddingBottom: 0,
          paddingTop: 8,
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/")}
        >
          <FeatherIcons name="home" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/fines")}
        >
          <FeatherIcons name="file-text" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>Fines</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/qrcode")}
        >
          <MaterialCommunityIcons name="qrcode" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/payment")}
        >
          <FeatherIcons name="credit-card" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/profile")}
        >
          <FeatherIcons name="user" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}