//payment.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  useColorScheme,
} from "react-native";

import styles, { COLORS } from "../paymentStyles";
import Icon from "react-native-vector-icons/FontAwesome";

// Types for transaction history
interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  fineId: string;
  paymentMethod: "card" | "bank" | "wallet";
  status: "completed" | "pending" | "failed";
}

// Payment method card component
const PaymentMethodCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}> = ({ title, icon, isActive, onPress }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.paymentMethodCard,
        isActive && styles.paymentMethodCardActive,
        isDarkMode && !isActive && { backgroundColor: "#1F2937" },
        isDarkMode && isActive && { backgroundColor: COLORS.primary },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.paymentMethodIconContainer,
          isDarkMode && !isActive && { backgroundColor: "#374151" },
        ]}
      >
        {icon}
      </View>
      <Text
        style={[
          styles.paymentMethodTitle,
          isActive && { color: COLORS.white },
          !isActive && isDarkMode && { color: COLORS.textLight },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Transaction item component
const TransactionItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  let statusColor, StatusIcon;
  switch (transaction.status) {
    case "completed":
      statusColor = COLORS.success;
      StatusIcon = <Icon name="check-circle" size={24} color={statusColor} />;
      break;
    case "pending":
      statusColor = COLORS.secondary;
      StatusIcon = <Icon name="clock" size={24} color={statusColor} />;
      break;
    case "failed":
    default:
      statusColor = COLORS.accent;
      StatusIcon = <Icon name="times-circle" size={24} color={statusColor} />;
      break;
  }

  return (
    <View
      style={[
        styles.transactionItem,
        isDarkMode && { backgroundColor: "#1F2937" },
      ]}
    >
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text
            style={[
              styles.transactionDescription,
              isDarkMode && { color: COLORS.textLight },
            ]}
          >
            {transaction.description}
          </Text>
          <Text
            style={[styles.transactionMeta, isDarkMode && { color: "#9CA3AF" }]}
          >
            {transaction.date} • Fine ID: {transaction.fineId}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text
            style={[
              styles.transactionAmountText,
              isDarkMode && { color: COLORS.textLight },
            ]}
          >
            Rs. {transaction.amount.toFixed(2)}
          </Text>
          <View
            style={[
              styles.transactionStatus,
              { backgroundColor: statusColor + "20" },
            ]}
          >
            {/* Update to use FontAwesome5 Icons */}
            {StatusIcon}
            <Text
              style={[styles.transactionStatusText, { color: statusColor }]}
            >
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const PaymentsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // State
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "wallet"
  >("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);

  // Sample transaction history
  const transactions: Transaction[] = [
    {
      id: "T-20250315-001",
      date: "Mar 15, 2025",
      amount: 5000,
      description: "Fine Payment - Speeding in School Zone",
      fineId: "F-20250315-001",
      paymentMethod: "card",
      status: "completed",
    },
    {
      id: "T-20250310-042",
      date: "Mar 10, 2025",
      amount: 2500,
      description: "Fine Payment - No Parking Violation",
      fineId: "F-20250310-042",
      paymentMethod: "bank",
      status: "pending",
    },
    {
      id: "T-20250228-127",
      date: "Feb 28, 2025",
      amount: 1500,
      description: "Fine Payment - Signal Violation",
      fineId: "F-20250228-127",
      paymentMethod: "bank",
      status: "failed",
    },
    {
      id: "T-20250215-073",
      date: "Feb 15, 2025",
      amount: 3000,
      description: "Fine Payment - Driving Without License",
      fineId: "F-20250215-073",
      paymentMethod: "card",
      status: "completed",
    },
  ];

  // Render payment form based on selected payment method
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <View style={styles.paymentForm}>
            <Text
              style={[
                styles.paymentFormLabel,
                isDarkMode && { color: COLORS.textLight },
              ]}
            >
              Card Details
            </Text>

            <View style={styles.inputGroup}>
              <Text
                style={[styles.inputLabel, isDarkMode && { color: "#9CA3AF" }]}
              >
                Card Number
              </Text>
              <TextInput
                style={[
                  styles.input,
                  isDarkMode && {
                    backgroundColor: "#374151",
                    color: COLORS.textLight,
                    borderColor: "#4B5563",
                  },
                ]}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={isDarkMode ? "#6B7280" : "#9CA3AF"}
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
            </View>

            <View style={styles.horizontalInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text
                  style={[
                    styles.inputLabel,
                    isDarkMode && { color: "#9CA3AF" },
                  ]}
                >
                  Expiry Date
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    isDarkMode && {
                      backgroundColor: "#374151",
                      color: COLORS.textLight,
                      borderColor: "#4B5563",
                    },
                  ]}
                  placeholder="MM/YY"
                  placeholderTextColor={isDarkMode ? "#6B7280" : "#9CA3AF"}
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text
                  style={[
                    styles.inputLabel,
                    isDarkMode && { color: "#9CA3AF" },
                  ]}
                >
                  CVC
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    isDarkMode && {
                      backgroundColor: "#374151",
                      color: COLORS.textLight,
                      borderColor: "#4B5563",
                    },
                  ]}
                  placeholder="123"
                  placeholderTextColor={isDarkMode ? "#6B7280" : "#9CA3AF"}
                  keyboardType="numeric"
                  secureTextEntry
                  value={cardCvc}
                  onChangeText={setCardCvc}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text
                style={[styles.inputLabel, isDarkMode && { color: "#9CA3AF" }]}
              >
                Cardholder Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  isDarkMode && {
                    backgroundColor: "#374151",
                    color: COLORS.textLight,
                    borderColor: "#4B5563",
                  },
                ]}
                placeholder="John Doe"
                placeholderTextColor={isDarkMode ? "#6B7280" : "#9CA3AF"}
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
            <Text
              style={[
                styles.paymentFormLabel,
                isDarkMode && { color: COLORS.textLight },
              ]}
            >
              Bank Transfer
            </Text>

            <View
              style={[
                styles.bankDetails,
                isDarkMode && { backgroundColor: "#374151" },
              ]}
            >
              <Text
                style={[
                  styles.bankDetailsTitle,
                  isDarkMode && { color: COLORS.textLight },
                ]}
              >
                Transfer to the following account:
              </Text>

              <View style={styles.bankDetailRow}>
                <Text
                  style={[
                    styles.bankDetailLabel,
                    isDarkMode && { color: "#9CA3AF" },
                  ]}
                >
                  Bank Name:
                </Text>
                <Text
                  style={[
                    styles.bankDetailValue,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  National Bank of Sri Lanka
                </Text>
              </View>

              <View style={styles.bankDetailRow}>
                <Text
                  style={[
                    styles.bankDetailLabel,
                    isDarkMode && { color: "#9CA3AF" },
                  ]}
                >
                  Account Name:
                </Text>
                <Text
                  style={[
                    styles.bankDetailValue,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  Traffic Police Division
                </Text>
              </View>

              <View style={styles.bankDetailRow}>
                <Text
                  style={[
                    styles.bankDetailLabel,
                    isDarkMode && { color: "#9CA3AF" },
                  ]}
                >
                  Account No:
                </Text>
                <Text
                  style={[
                    styles.bankDetailValue,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  100-2345-6789-01
                </Text>
              </View>

              <View style={styles.bankDetailRow}>
                <Text
                  style={[
                    styles.bankDetailLabel,
                    isDarkMode && { color: "#9CA3AF" },
                  ]}
                >
                  Reference:
                </Text>
                <Text
                  style={[
                    styles.bankDetailValue,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  Fine ID (e.g., F-20250315-001)
                </Text>
              </View>
            </View>

            <View style={styles.uploadSection}>
              <Text
                style={[
                  styles.uploadTitle,
                  isDarkMode && { color: COLORS.textLight },
                ]}
              >
                Upload Payment Receipt
              </Text>

              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  isDarkMode && {
                    backgroundColor: "#374151",
                    borderColor: "#4B5563",
                  },
                ]}
                activeOpacity={0.7}
              >
                <Icon
                  name="cloud-upload-alt"
                  size={24}
                  color={isDarkMode ? COLORS.textLight : COLORS.text}
                />

                <Text
                  style={[
                    styles.uploadButtonText,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
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
                    <Text
                      style={[
                        styles.receiptName,
                        isDarkMode && { color: COLORS.textLight },
                      ]}
                    >
                      Receipt-12345.jpg
                    </Text>
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
            <Text
              style={[
                styles.paymentFormLabel,
                isDarkMode && { color: COLORS.textLight },
              ]}
            >
              Digital Wallet
            </Text>

            <View
              style={[
                styles.walletSelection,
                isDarkMode && { backgroundColor: "#374151" },
              ]}
            >
              <Text
                style={[
                  styles.walletTitle,
                  isDarkMode && { color: COLORS.textLight },
                ]}
              >
                Select a wallet
              </Text>

              <TouchableOpacity
                style={[
                  styles.walletOption,
                  isDarkMode && {
                    backgroundColor: "#1F2937",
                    borderColor: "#4B5563",
                  },
                ]}
                activeOpacity={0.7}
              >
                <Image
                  source={{
                    uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
                  }}
                  style={styles.walletLogo}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.walletName,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  Lanka QR
                </Text>
                <Icon
                  name="arrow-right"
                  size={18}
                  color={isDarkMode ? COLORS.textLight : COLORS.text}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.walletOption,
                  isDarkMode && {
                    backgroundColor: "#1F2937",
                    borderColor: "#4B5563",
                  },
                ]}
                activeOpacity={0.7}
              >
                <Image
                  source={{
                    uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
                  }}
                  style={styles.walletLogo}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.walletName,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  FriMi
                </Text>
                <Icon
                  name="arrow-right"
                  size={18}
                  color={isDarkMode ? COLORS.textLight : COLORS.text}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.walletOption,
                  isDarkMode && {
                    backgroundColor: "#1F2937",
                    borderColor: "#4B5563",
                  },
                ]}
                activeOpacity={0.7}
              >
                <Image
                  source={{
                    uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
                  }}
                  style={styles.walletLogo}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.walletName,
                    isDarkMode && { color: COLORS.textLight },
                  ]}
                >
                  DCSL Pay
                </Text>
                <Icon
                  name="arrow-right"
                  size={18}
                  color={isDarkMode ? COLORS.textLight : COLORS.text}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[styles.walletNote, isDarkMode && { color: "#9CA3AF" }]}
            >
              You will be redirected to the selected wallet app to complete the
              payment
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        isDarkMode && { backgroundColor: COLORS.darkMode },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.screenTitle,
            isDarkMode && { color: COLORS.textLight },
          ]}
        >
          Payment
        </Text>
        <View style={styles.fineSummary}>
          <Text
            style={[
              styles.fineAmount,
              isDarkMode && { color: COLORS.textLight },
            ]}
          >
            Rs. 5,000.00
          </Text>
          <Text
            style={[styles.fineDescription, isDarkMode && { color: "#9CA3AF" }]}
          >
            Fine ID: F-20250315-001
          </Text>
        </View>
      </View>

      <View style={styles.paymentMethods}>
        <Text
          style={[
            styles.sectionTitle,
            isDarkMode && { color: COLORS.textLight },
          ]}
        >
          Payment Method
        </Text>

        <View style={styles.paymentMethodsRow}>
          <PaymentMethodCard
            title="Card"
            icon={
              <Icon
                name="credit-card"
                size={24}
                color={
                  paymentMethod === "card"
                    ? COLORS.white
                    : isDarkMode
                    ? COLORS.textLight
                    : COLORS.text
                }
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
                color={
                  paymentMethod === "bank"
                    ? COLORS.white
                    : isDarkMode
                    ? COLORS.textLight
                    : COLORS.text
                }
              />
            }
            isActive={paymentMethod === "bank"}
            onPress={() => setPaymentMethod("bank")}
          />

          <PaymentMethodCard
            title="Wallet"
            icon={
              <Icon
                name="wallet"
                size={24}
                color={
                  paymentMethod === "wallet"
                    ? COLORS.white
                    : isDarkMode
                    ? COLORS.textLight
                    : COLORS.text
                }
              />
            }
            isActive={paymentMethod === "wallet"}
            onPress={() => setPaymentMethod("wallet")}
          />
        </View>
      </View>

      {renderPaymentForm()}

      <View style={styles.transactionHistory}>
        <View style={styles.transactionHistoryHeader}>
          <Text
            style={[
              styles.sectionTitle,
              isDarkMode && { color: COLORS.textLight },
            ]}
          >
            Transaction History
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text
              style={[
                styles.viewAllText,
                isDarkMode && { color: COLORS.primary },
              ]}
            >
              View All
            </Text>
            <Icon
              name="chevron-down"
              size={16}
              color={isDarkMode ? COLORS.primary : COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </ScrollView>
  );
};

export default PaymentsScreen;
