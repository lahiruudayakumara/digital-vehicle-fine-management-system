import { Alert, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";

// Static user data (moved outside to avoid re-creation)
const USER_DATA = {
  name: "John Doe",
  licenseNumber: "8455626585",
  expiryDate: "2027-12-31",
  licenseClass: "B",
  qrCodeGenerated: true,
  violationPoints: 7,
  maxViolationPoints: 12,
};

// TypeScript interface for props (optional but improves maintainability)
interface QRCodeScreenProps {}

// Reusable shadow style
const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
};

const QRCodeScreen: React.FC<QRCodeScreenProps> = () => {
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [inputValue, setInputValue] = useState(`License:${USER_DATA.licenseNumber}`);
  const [qrValue, setQrValue] = useState(inputValue);
  const [showQR, setShowQR] = useState(true);

  // Handle QR code generation
  const handleGenerate = useCallback(() => {
    if (inputValue.trim()) {
      setQrValue(inputValue);
      setShowQR(true);
    }
  }, [inputValue]);

  // Memoized share handler
  const handleShareQR = useCallback(async () => {
    try {
      await Share.share({
        message: `Vehicle License QR Code: ${qrValue}. This is a secure verification QR code for traffic officers.`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share QR code");
    }
  }, [qrValue]);

  // Memoized blacklist toggle
  const handleBlacklistCheck = useCallback(() => {
    setIsBlacklisted((prev) => !prev);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Text style={styles.title}>Digital Vehicle License</Text>
      
     
      
      {showQR ? (
        <QRCodeDisplay qrValue={qrValue} licenseNumber={USER_DATA.licenseNumber} />
      ) : (
        <View style={styles.noQrCodePlaceholder}>
          <Icon name="alert-circle" size={48} color={COLORS.accent} />
          <Text style={styles.noQrCodeText}>No QR Code Generated</Text>
        </View>
      )}
      
      <View style={styles.actionButtons}>
        <ActionButton
          icon="share"
          text="Share QR"
          color={COLORS.primary}
          onPress={handleShareQR}
        />
        <ActionButton
          icon={isBlacklisted ? "alert" : "check-circle"}
          text={isBlacklisted ? "Blacklisted" : "Verify Status"}
          color={isBlacklisted ? COLORS.accent : COLORS.success}
          onPress={handleBlacklistCheck}
        />
      </View>
    </View>
  );
};

// Extracted QR Code Display Component
interface QRCodeDisplayProps {
  qrValue: string;
  licenseNumber: string;
}
const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrValue, licenseNumber }) => (
  <View style={styles.qrContainer}>
    <View style={[styles.qrCodeWrapper, { backgroundColor: COLORS.white }]}>
      {qrValue ? (
        <View style={styles.qrCodePlaceholder}>
          <QRCode value={qrValue} size={225} />
          <Text style={styles.licenseNumber}>{licenseNumber}</Text>
          <Text style={styles.linkText}>{qrValue}</Text>
        </View>
      ) : (
        <View style={styles.noQrCodePlaceholder}>
          <Icon name="alert-circle" size={48} color={COLORS.accent} />
          <Text style={styles.noQrCodeText}>No QR Code Generated</Text>
        </View>
      )}
    </View>
  </View>
);

// Extracted Action Button Component
interface ActionButtonProps {
  icon: string;
  text: string;
  color: string;
  onPress: () => void;
}
const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, color, onPress }) => (
  <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
    <Icon name={icon} size={20} color={COLORS.white} />
    <Text style={styles.actionButtonText}>{text}</Text>
  </TouchableOpacity>
);



export default QRCodeScreen;

const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  text: '#1F2937', // Dark text for light mode
};

const styles = StyleSheet.create({
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
  },
  buttonText: { 
    color: COLORS.white, 
    fontWeight: 'bold' 
  },
  linkText: { 
    marginTop: 10, 
    color: COLORS.text,
    fontSize: 14,
  },
  noQrCodePlaceholder: {
    alignItems: "center",
    width: 220,
    height: 250,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  qrContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  qrCodeWrapper: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 5,
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
  noQrCodeText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.accent,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    padding: 10,
    // Shadow for action buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    // Shadow for buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
  },
});