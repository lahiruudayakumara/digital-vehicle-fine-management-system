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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            // Make sure this is true to show the Settings header
            headerShown: true,
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
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/fines")}
        >
          <FeatherIcons name="file-text" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            Fines
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/qrcode")}
        >
          <MaterialCommunityIcons name="qrcode" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
            QR Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", flex: 1 }}
          onPress={() => router.push("/(tabs)/transactions")}
        >
          <FeatherIcons name="credit-card" color="gray" size={24} />
          <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
          Transactions
          </Text>
        </TouchableOpacity>


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
