import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
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
  return (
    <TouchableOpacity
      style={[
        styles.paymentMethodCard,
        isActive && styles.paymentMethodCardActive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.paymentMethodIconContainer}>
        {icon}
      </View>
      <Text
        style={[
          styles.paymentMethodTitle,
          isActive && { color: COLORS.white },
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
  let statusColor, StatusIcon;
  switch (transaction.status) {
    case "completed":
      statusColor = COLORS.success;
      StatusIcon = <Icon name="check-circle" size={24} color={statusColor} />;
      break;
    case "pending":
      statusColor = COLORS.secondary;
      StatusIcon = <Icon name="calendar-times-o" size={24} color={statusColor} />;
      break;
    case "failed":
    default:
      statusColor = COLORS.accent;
      StatusIcon = <Icon name="times-circle" size={24} color={statusColor} />;
      break;
  }

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>
            {transaction.description}
          </Text>
          <Text style={styles.transactionMeta}>
            {transaction.date} • Fine ID: {transaction.fineId}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={styles.transactionAmountText}>
            Rs. {transaction.amount.toFixed(2)}
          </Text>
          <View
            style={[
              styles.transactionStatus,
              { backgroundColor: statusColor + "20" },
            ]}
          >
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

              <TouchableOpacity
                style={styles.uploadButton}
                activeOpacity={0.7}
              >
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
                    <Text style={styles.receiptName}>
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
            <Text style={styles.paymentFormLabel}>Digital Wallet</Text>

            <View style={styles.walletSelection}>
              <Text style={styles.walletTitle}>Select a wallet</Text>

              <TouchableOpacity
                style={styles.walletOption}
                activeOpacity={0.7}
              >
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

              <TouchableOpacity
                style={styles.walletOption}
                activeOpacity={0.7}
              >
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

              <TouchableOpacity
                style={styles.walletOption}
                activeOpacity={0.7}
              >
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
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Payment</Text>
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
      name="money"  // Alternative: try "money-bill", "money-bill-alt", or "credit-card-alt"
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

      <View style={styles.transactionHistory}>
        <View style={styles.transactionHistoryHeader}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-down" size={16} color={COLORS.primary} />
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