import { Alert, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";

// Static user data (moved outside to avoid re-creation)
const USER_DATA = {
  name: "John Doe", // User's name
  licenseNumber: "B1234567", // License number
  expiryDate: "2027-12-31", // License expiry date
  licenseClass: "B", // License class
  qrCodeGenerated: true, // Indicates if QR code is generated
  violationPoints: 7, // Current violation points
  maxViolationPoints: 12, // Maximum allowed violation points
};

// TypeScript interface for props (optional but improves maintainability)
interface QRCodeScreenProps {}

// Reusable shadow style for consistent UI
const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
};

const QRCodeScreen: React.FC<QRCodeScreenProps> = () => {
  const [isBlacklisted, setIsBlacklisted] = useState(false); // State to track blacklist status
  const [qrValue] = useState("kjlj"); // QR code value (static for now)

  // Memoized share handler for sharing QR code
  const handleShareQR = useCallback(async () => {
    try {
      await Share.share({
        message: `Vehicle License QR Code for ${USER_DATA.licenseNumber}. This is a secure verification QR code for traffic officers.`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share QR code"); // Error handling for share failure
    }
  }, []);

  // Memoized blacklist toggle handler
  const handleBlacklistCheck = useCallback(() => {
    setIsBlacklisted((prev) => !prev); // Toggle blacklist status
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* QR Code Display */}
      <QRCodeDisplay qrValue={qrValue} licenseNumber={USER_DATA.licenseNumber} />
      <View style={styles.actionButtons}>
        {/* Share QR Code Button */}
        <ActionButton
          icon="share"
          text="Share QR"
          color={COLORS.primary}
          onPress={handleShareQR}
        />
        {/* Blacklist Status Button */}
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
  qrValue: string; // QR code value
  licenseNumber: string; // License number to display
}
const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrValue, licenseNumber }) => (
  <View style={styles.qrContainer}>
    <View style={[styles.qrCodeWrapper, { backgroundColor: COLORS.white }]}>
      {qrValue ? (
        <View style={styles.qrCodePlaceholder}>
          {/* Render QR Code */}
          <QRCode value={qrValue} size={225} />
          <Text style={styles.licenseNumber}>{licenseNumber}</Text>
        </View>
      ) : (
        <View style={styles.noQrCodePlaceholder}>
          {/* Placeholder for missing QR Code */}
          <Icon name="alert-circle" size={48} color={COLORS.accent} />
          <Text style={styles.noQrCodeText}>No QR Code Generated</Text>
        </View>
      )}
    </View>
  </View>
);

// Extracted Action Button Component
interface ActionButtonProps {
  icon: string; // Icon name for the button
  text: string; // Button text
  color: string; // Button background color
  onPress: () => void; // Button press handler
}
const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, color, onPress }) => (
  <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
    <Icon name={icon} size={20} color={COLORS.white} />
    <Text style={styles.actionButtonText}>{text}</Text>
  </TouchableOpacity>
);

export default QRCodeScreen;

// Color palette for consistent styling
const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF', // White
  success: '#16A34A', // Green
  text: '#1F2937', // Dark text for light mode
};

// Styles for the components
const styles = StyleSheet.create({
  // ...existing code...
  noQrCodePlaceholder: {
    alignItems: "center",
    width: 220,
    height: 250,
    justifyContent: "center",
  },
  // ...existing code...
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