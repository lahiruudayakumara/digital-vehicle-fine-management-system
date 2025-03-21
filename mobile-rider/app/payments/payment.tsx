import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { COLORS } from "@/styles/color";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { useRouter } from "expo-router";
import styles from "./paymentStyles";
import { formatCardExpiry, formatCardNumber } from "@/validation/payment";
import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';

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
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "wallet"
  >("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const router = useRouter();

  const handleCardNumberChange = (text: string) => {
    const formattedCardNumber = formatCardNumber(text);
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryChange = (text: string) => {
    const formattedExpiry = formatCardExpiry(text);
    setCardExpiry(formattedExpiry);
  };

  const handleCardCvcChange = (text: string) => {
    let cleaned = text.replace(/\D/g, "");
    cleaned = cleaned.slice(0, 3);

    setCardCvc(cleaned);
  };

  const handleCardNameChange = (text: string) => {
    let cleaned = text.replace(/[^a-zA-Z\s]/g, "");
    setCardName(cleaned);
  };

  const requestPermission = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  const handleUploadReceipt = async () => {
    const permissionGranted = await requestPermission();

    if (!permissionGranted) {
      console.log('Permission to access media library denied');
      return;
    }

    // Launch image picker
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      if (result.assets && result.assets[0]?.fileSize && result.assets[0].fileSize > MAX_FILE_SIZE) {
        Alert.alert('File too large', 'The selected image exceeds the 10MB size limit. Please select a smaller image.');
        return;
      }
      setUploadedReceipt(result.assets[0].uri);
    }
  };

  const handleRemoveReceipt = () => {
    setUploadedReceipt(null);
  };

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
                onChangeText={handleCardNumberChange}
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
                  keyboardType="numeric"
                  onChangeText={handleExpiryChange}
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
                  onChangeText={handleCardCvcChange}
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
                onChangeText={handleCardNameChange}
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
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadReceipt} activeOpacity={0.7}>
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
                    <TouchableOpacity onPress={handleRemoveReceipt} activeOpacity={0.7}>
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
              <Text style={styles.fineDescription}>
                Fine ID: F-20250315-001
              </Text>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentsScreen;
