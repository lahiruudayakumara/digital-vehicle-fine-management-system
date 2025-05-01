//settings.tsx

import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from "react-native";
import React, { useState } from "react";
import styles from "./settingsStyles";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for settings
interface NotificationSettings {
  paymentReminders: boolean;
  dueNotices: boolean;
  promotionalAlerts: boolean;
}

interface UserPreferences {
  darkMode: boolean;
  useBiometrics: boolean;
}

const SettingsScreen: React.FC = () => {
  const router = useRouter();
  
  // State for user settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    paymentReminders: true,
    dueNotices: true,
    promotionalAlerts: false,
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    darkMode: false,
    useBiometrics: true,
  });

  // Toggle handlers
  const toggleSetting = (
    settingType: "notifications" | "preferences",
    setting: string
  ) => {
    if (settingType === "notifications") {
      setNotifications({
        ...notifications,
        [setting]: !notifications[setting as keyof NotificationSettings],
      });
    } else {
      setPreferences({
        ...preferences,
        [setting]: !preferences[setting as keyof UserPreferences],
      });
    }
  };

  // Navigation/action handlers
  const handleAccountPress = () => {
    // Redirect to profile tab
    router.push('/profile');
  };

  const handlePaymentMethodsPress = () => {
    console.log("Navigate to payment methods");
  };

  const handleHelpPress = async () => {
    // Open Intercom help center in external browser
    const helpUrl = "https://intercom.help/finemate/en";
    
    try {
      const canOpen = await Linking.canOpenURL(helpUrl);
      if (canOpen) {
        await Linking.openURL(helpUrl);
      } else {
        Alert.alert("Error", "Cannot open the help center URL");
      }
    } catch (error) {
      console.error("Error opening help center URL:", error);
      Alert.alert("Error", "Failed to open help center. Please try again later.");
    }
  };

  const handlePrivacyPress = async () => {
    // Open privacy policy in external browser
    const privacyUrl = "https://intercom.help/finemate/en/articles/privacy-policy";
    
    try {
      const canOpen = await Linking.canOpenURL(privacyUrl);
      if (canOpen) {
        await Linking.openURL(privacyUrl);
      } else {
        Alert.alert("Error", "Cannot open the privacy policy URL");
      }
    } catch (error) {
      console.error("Error opening privacy policy URL:", error);
      Alert.alert("Error", "Failed to open privacy policy. Please try again later.");
    }
  };

  const handleLogoutPress = async () => {
    try {
      // Show confirmation dialog
      Alert.alert(
        "Logout Confirmation",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: async () => {
              // Clear user authentication data
              await AsyncStorage.removeItem("userToken");
              await AsyncStorage.removeItem("userData");
              
              console.log("User logged out successfully");
              
              // Redirect to login screen
              router.replace("/(auth)/splash");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleAccountPress}
            activeOpacity={0.7}
          >
            <Text style={styles.settingLabel}>Personal Information</Text>
            <View style={styles.settingAction}>
              <Text style={styles.settingValue}>Edit</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handlePaymentMethodsPress}
            activeOpacity={0.7}
          >
            <Text style={styles.settingLabel}>Payment Methods</Text>
            <View style={styles.settingAction}>
              <Text style={styles.settingValue}>Manage</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Payment Reminders</Text>
            <Switch
              trackColor={{ false: "#DCDFE6", true: "#6C8EF2" }}
              thumbColor={
                notifications.paymentReminders ? "#3A67F4" : "#f4f3f4"
              }
              ios_backgroundColor="#DCDFE6"
              onValueChange={() =>
                toggleSetting("notifications", "paymentReminders")
              }
              value={notifications.paymentReminders}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Due Date Notices</Text>
            <Switch
              trackColor={{ false: "#DCDFE6", true: "#6C8EF2" }}
              thumbColor={notifications.dueNotices ? "#3A67F4" : "#f4f3f4"}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting("notifications", "dueNotices")}
              value={notifications.dueNotices}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Promotional Alerts</Text>
            <Switch
              trackColor={{ false: "#DCDFE6", true: "#6C8EF2" }}
              thumbColor={
                notifications.promotionalAlerts ? "#3A67F4" : "#f4f3f4"
              }
              ios_backgroundColor="#DCDFE6"
              onValueChange={() =>
                toggleSetting("notifications", "promotionalAlerts")
              }
              value={notifications.promotionalAlerts}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Use Biometrics</Text>
            <Switch
              trackColor={{ false: "#DCDFE6", true: "#6C8EF2" }}
              thumbColor={preferences.useBiometrics ? "#3A67F4" : "#f4f3f4"}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() =>
                toggleSetting("preferences", "useBiometrics")
              }
              value={preferences.useBiometrics}
            />
          </View>
        </View>

        {/* Support & Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleHelpPress}
            activeOpacity={0.7}
          >
            <Text style={styles.settingLabel}>Help Center</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handlePrivacyPress}
            activeOpacity={0.7}
          >
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPress}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;