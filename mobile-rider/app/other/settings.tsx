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
} from "react-native";
import React, { useState } from "react";
import styles from "./settingsStyles";

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
    console.log("Navigate to account details");
  };

  const handlePaymentMethodsPress = () => {
    console.log("Navigate to payment methods");
  };

  const handleHelpPress = () => {
    console.log("Navigate to help center");
  };

  const handlePrivacyPress = () => {
    console.log("Navigate to privacy policy");
  };

  const handleLogoutPress = () => {
    console.log("User logout");
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
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#DCDFE6", true: "#6C8EF2" }}
              thumbColor={preferences.darkMode ? "#3A67F4" : "#f4f3f4"}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting("preferences", "darkMode")}
              value={preferences.darkMode}
            />
          </View>

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
