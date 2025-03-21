import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { COLORS } from "@/styles/color";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { X } from "lucide-react-native"
import { useRouter } from "expo-router";

const PaymentMethodCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}> = ({ title, icon, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.paymentMethodCard,
        isActive && styles.paymentMethodCardActive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.paymentMethodIconContainer}>{icon}</View>
      <Text
        style={[styles.paymentMethodTitle, isActive && { color: COLORS.white }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const PaymentsScreen: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "wallet">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const router = useRouter();

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <View style={styles.paymentForm}>
            <Text style={styles.paymentFormLabel}>Card Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
            </View>
            <View style={styles.horizontalInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#9CA3AF"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVC</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  secureTextEntry
                  value={cardCvc}
                  onChangeText={setCardCvc}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>
            <TouchableOpacity
              style={[styles.payButton, { backgroundColor: COLORS.primary }]}
              activeOpacity={0.8}
            >
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        );

      case "bank":
        return (
          <View style={styles.paymentForm}>
            <Text style={styles.paymentFormLabel}>Bank Transfer</Text>
            <View style={styles.bankDetails}>
              <Text style={styles.bankDetailsTitle}>
                Transfer to the following account:
              </Text>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Bank Name:</Text>
                <Text style={styles.bankDetailValue}>
                  National Bank of Sri Lanka
                </Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Account Name:</Text>
                <Text style={styles.bankDetailValue}>
                  Traffic Police Division
                </Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Account No:</Text>
                <Text style={styles.bankDetailValue}>100-2345-6789-01</Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.bankDetailLabel}>Reference:</Text>
                <Text style={styles.bankDetailValue}>
                  Fine ID (e.g., F-20250315-001)
                </Text>
              </View>
            </View>
            <View style={styles.uploadSection}>
              <Text style={styles.uploadTitle}>Upload Payment Receipt</Text>
              <TouchableOpacity style={styles.uploadButton} activeOpacity={0.7}>
                <Icon name="upload" size={24} color={COLORS.text} />
                <Text style={styles.uploadButtonText}>
                  {uploadedReceipt ? "Change Receipt" : "Upload Receipt"}
                </Text>
              </TouchableOpacity>
              {uploadedReceipt && (
                <View style={styles.receiptPreview}>
                  <Image
                    source={{ uri: uploadedReceipt }}
                    style={styles.receiptImage}
                    resizeMode="cover"
                  />
                  <View style={styles.receiptInfo}>
                    <Text style={styles.receiptName}>Receipt-12345.jpg</Text>
                    <TouchableOpacity>
                      <Text style={styles.removeReceipt}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={[styles.payButton, { backgroundColor: COLORS.primary }]}
                activeOpacity={0.8}
              >
                <Text style={styles.payButtonText}>Submit Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case "wallet":
        return (
          <View style={styles.paymentForm}>
            <Text style={styles.paymentFormLabel}>Digital Wallet</Text>
            <View style={styles.walletSelection}>
              <Text style={styles.walletTitle}>Select a wallet</Text>
              <TouchableOpacity style={styles.walletOption} activeOpacity={0.7}>
                <Image
                  source={{
                    uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
                  }}
                  style={styles.walletLogo}
                  resizeMode="contain"
                />
                <Text style={styles.walletName}>Lanka QR</Text>
                <Icon name="arrow-right" size={18} color={COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.walletOption} activeOpacity={0.7}>
                <Image
                  source={{
                    uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
                  }}
                  style={styles.walletLogo}
                  resizeMode="contain"
                />
                <Text style={styles.walletName}>FriMi</Text>
                <Icon name="arrow-right" size={18} color={COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.walletOption} activeOpacity={0.7}>
                <Image
                  source={{
                    uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
                  }}
                  style={styles.walletLogo}
                  resizeMode="contain"
                />
                <Text style={styles.walletName}>DCSL Pay</Text>
                <Icon name="arrow-right" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <Text style={styles.walletNote}>
              You will be redirected to the selected wallet app to complete the payment
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.screenTitle}>Payment</Text>
            <TouchableOpacity
            onPress={() => router.replace("/fines")}
            activeOpacity={0.7}
            >
            <X size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.fineSummary}>
            <Text style={styles.fineAmount}>Rs. 5,000.00</Text>
            <Text style={styles.fineDescription}>Fine ID: F-20250315-001</Text>
          </View>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethodsRow}>
            <PaymentMethodCard
              title="Card"
              icon={
                <Icon
                  name="credit-card"
                  size={24}
                  color={paymentMethod === "card" ? "black" : COLORS.text}
                />
              }
              isActive={paymentMethod === "card"}
              onPress={() => setPaymentMethod("card")}
            />
            <PaymentMethodCard
              title="Bank"
              icon={
                <Icon
                  name="building"
                  size={24}
                  color={paymentMethod === "bank" ? "black" : COLORS.text}
                />
              }
              isActive={paymentMethod === "bank"}
              onPress={() => setPaymentMethod("bank")}
            />
            <PaymentMethodCard
              title="Wallet"
              icon={
                <Icon
                  name="money"
                  size={24}
                  color={paymentMethod === "wallet" ? "black" : COLORS.text}
                />
              }
              isActive={paymentMethod === "wallet"}
              onPress={() => setPaymentMethod("wallet")}
            />
          </View>
        </View>

        {renderPaymentForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
  },
  fineSummary: {
    marginTop: 16,
  },
  fineAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  fineDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  paymentMethods: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  paymentMethodsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethodCard: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 16,
    width: "31%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  paymentMethodCardActive: {
    backgroundColor: COLORS.primary,
  },
  paymentMethodIconContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  paymentForm: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  paymentFormLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  horizontalInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  payButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  bankDetails: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bankDetailsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 12,
  },
  bankDetailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bankDetailLabel: {
    fontSize: 14,
    color: "#6B7280",
    width: 110,
  },
  bankDetailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
    flex: 1,
  },
  uploadSection: {
    marginTop: 16,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 12,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  uploadButtonText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 8,
  },
  receiptPreview: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  receiptImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  receiptInfo: {
    marginLeft: 12,
    flex: 1,
  },
  receiptName: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  removeReceipt: {
    fontSize: 12,
    color: COLORS.accent,
  },
  walletSelection: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 16,
  },
  walletTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 12,
  },
  walletOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  walletLogo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  walletName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    flex: 1,
  },
  walletNote: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 12,
    textAlign: "center",
  },
});

export default PaymentsScreen;