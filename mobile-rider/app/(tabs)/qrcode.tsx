import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { COLORS } from '../qrCodeStyles';

const QRCodeScreen: React.FC = () => {
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
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>  
      <View style={styles.qrContainer}>
        <View style={[styles.qrCodeWrapper, { backgroundColor: COLORS.white }]}>  
          {userData.qrCodeGenerated ? (
            <View style={styles.qrCodePlaceholder}>
              <Icon name="qrcode" size={200} color={COLORS.text} />
              <Text style={styles.licenseNumber}>{userData.licenseNumber}</Text>
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

export default QRCodeScreen;