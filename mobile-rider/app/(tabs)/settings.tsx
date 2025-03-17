//settings.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView, Platform, StatusBar } from 'react-native';

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
    settingType: 'notifications' | 'preferences',
    setting: string
  ) => {
    if (settingType === 'notifications') {
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
    console.log('Navigate to account details');
  };

  const handlePaymentMethodsPress = () => {
    console.log('Navigate to payment methods');
  };

  const handleHelpPress = () => {
    console.log('Navigate to help center');
  };

  const handlePrivacyPress = () => {
    console.log('Navigate to privacy policy');
  };

  const handleLogoutPress = () => {
    console.log('User logout');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
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
              trackColor={{ false: '#DCDFE6', true: '#6C8EF2' }}
              thumbColor={notifications.paymentReminders ? '#3A67F4' : '#f4f3f4'}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting('notifications', 'paymentReminders')}
              value={notifications.paymentReminders}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Due Date Notices</Text>
            <Switch
              trackColor={{ false: '#DCDFE6', true: '#6C8EF2' }}
              thumbColor={notifications.dueNotices ? '#3A67F4' : '#f4f3f4'}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting('notifications', 'dueNotices')}
              value={notifications.dueNotices}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Promotional Alerts</Text>
            <Switch
              trackColor={{ false: '#DCDFE6', true: '#6C8EF2' }}
              thumbColor={notifications.promotionalAlerts ? '#3A67F4' : '#f4f3f4'}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting('notifications', 'promotionalAlerts')}
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
              trackColor={{ false: '#DCDFE6', true: '#6C8EF2' }}
              thumbColor={preferences.darkMode ? '#3A67F4' : '#f4f3f4'}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting('preferences', 'darkMode')}
              value={preferences.darkMode}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Use Biometrics</Text>
            <Switch
              trackColor={{ false: '#DCDFE6', true: '#6C8EF2' }}
              thumbColor={preferences.useBiometrics ? '#3A67F4' : '#f4f3f4'}
              ios_backgroundColor="#DCDFE6"
              onValueChange={() => toggleSetting('preferences', 'useBiometrics')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#3A67F4',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A67F4',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 15,
    color: '#667085',
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: '#667085',
    marginTop: -2,
  },
  logoutButton: {
    backgroundColor: '#F1F5FE',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutText: {
    color: '#3A67F4',
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#667085',
  },
});

export default SettingsScreen;