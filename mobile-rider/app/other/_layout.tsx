import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/styles/color";
import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

export default function OtherLayout() {
  const router = useRouter();

  return (
    <>
      {/* Stack Navigator for managing screens */}
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
          // This ensures the parent header is shown
          headerShown: true,
        }}
      >
        {/* Screen for the index route */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Hides the header for the index screen
          }}
        />
        {/* Screen for the settings route */}
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true, // Ensures the header is shown for settings
          }}
        />
      </Stack>

      {/* Custom Tab Bar for navigation */}
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
        {/* Tab for Home */}
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/")}
        >
          <FeatherIcons name="home" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Tab for Fines */}
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/fines")}
        >
          <FeatherIcons name="file-text" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            Fines
          </Text>
        </TouchableOpacity>

        {/* Tab for QR Code */}
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/qrcode")}
        >
          <MaterialCommunityIcons name="qrcode" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            QR Code
          </Text>
        </TouchableOpacity>

        {/* Tab for Transactions */}
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/(tabs)/transactions")}
        >
          <FeatherIcons name="credit-card" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            Transactions
          </Text>
        </TouchableOpacity>

        {/* Tab for Profile */}
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/profile")}
        >
          <FeatherIcons name="user" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
