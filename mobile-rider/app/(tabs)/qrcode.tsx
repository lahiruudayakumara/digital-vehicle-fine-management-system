import { Alert, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";

import { COLORS } from "../qrCodeStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";

// Static user data (moved outside to avoid re-creation)
const USER_DATA = {
  name: "John Doe",
  licenseNumber: "B1234567",
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
  const [qrValue] = useState("kjlj"); // Assuming qrValue doesn’t change; if it does, keep setQrValue

  // Memoized share handler
  const handleShareQR = useCallback(async () => {
    try {
      await Share.share({
        message: `Vehicle License QR Code for ${USER_DATA.licenseNumber}. This is a secure verification QR code for traffic officers.`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share QR code");
    }
  }, []);

  // Memoized blacklist toggle
  const handleBlacklistCheck = useCallback(() => {
    setIsBlacklisted((prev) => !prev);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <QRCodeDisplay qrValue={qrValue} licenseNumber={USER_DATA.licenseNumber} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  qrContainer: {
    marginBottom: 5,
    alignItems: "center",
  },
  qrCodeWrapper: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    ...shadowStyle,
    shadowOffset: { width: 0, height: 4 }, // Slightly larger shadow for wrapper
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  qrCodePlaceholder: {
    alignItems: "center",
  },
  licenseNumber: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  noQrCodePlaceholder: {
    alignItems: "center",
    width: 220,
    height: 250,
    justifyContent: "center",
  },
  noQrCodeText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.accent,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    padding: 10,
    ...shadowStyle,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    ...shadowStyle,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
  },
});

export default QRCodeScreen;