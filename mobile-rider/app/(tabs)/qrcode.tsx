import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const QRCodeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState('active'); // 'active', 'expired', 'suspended'
  
  // Mock data
  const userData = {
    name: 'John Doe',
    licenseNumber: 'B1234567',
    expiryDate: '2027-12-31',
    licenseClass: 'B',
    qrCodeGenerated: true,
    violationPoints: 7,
    maxViolationPoints: 12,
  };

  // Function to handle QR code sharing
  const handleShareQR = async () => {
    try {
      await Share.share({
        message: `Vehicle License QR Code for ${userData.licenseNumber}. This is a secure verification QR code for traffic officers.`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  // Function to handle blacklist status check
  const handleBlacklistCheck = () => {
    setIsBlacklisted(!isBlacklisted);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? COLORS.darkMode : COLORS.background }]}>  
      <View style={styles.qrContainer}>
        <View style={[styles.qrCodeWrapper, { backgroundColor: isDarkMode ? '#1F2937' : COLORS.white }]}>  
          {userData.qrCodeGenerated ? (
            <View style={styles.qrCodePlaceholder}>
              <Icon name="qrcode" size={200} color={isDarkMode ? COLORS.textLight : COLORS.text} />
              <Text style={[styles.licenseNumber, isDarkMode && { color: COLORS.textLight }]}>
                {userData.licenseNumber}
              </Text>
            </View>
          ) : (
            <View style={styles.noQrCodePlaceholder}>
              <Icon name="alert-circle" size={48} color={COLORS.accent} />
              <Text style={styles.noQrCodeText}>No QR Code Generated</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.primary }]} onPress={handleShareQR}>
          <Icon name="share" size={20} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Share QR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.success }]} onPress={handleBlacklistCheck}>
          <Icon name={isBlacklisted ? "alert" : "check-circle"} size={20} color={COLORS.white} />
          <Text style={styles.actionButtonText}>{isBlacklisted ? 'Blacklisted' : 'Verify Status'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  qrContainer: {
    marginBottom: 20,
  },
  qrCodeWrapper: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodePlaceholder: {
    alignItems: 'center',
  },
  licenseNumber: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  noQrCodePlaceholder: {
    alignItems: 'center',
  },
  noQrCodeText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.accent,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default QRCodeScreen;
