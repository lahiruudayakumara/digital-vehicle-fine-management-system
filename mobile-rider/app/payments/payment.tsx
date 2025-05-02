import {
  Alert,
  Button,
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
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import {
  CardField,
  CardFieldInput,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";

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
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [name, setName] = useState("");
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(
    null
  );
  const [cardName, setCardName] = useState("");
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const router = useRouter();
  const { confirmPayment } = useConfirmPayment();
  const stripe = useStripe();

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
    return status === "granted";
  };

  const handleUploadReceipt = async () => {
    const permissionGranted = await requestPermission();

    if (!permissionGranted) {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      if (
        result.assets &&
        result.assets[0]?.fileSize &&
        result.assets[0].fileSize > MAX_FILE_SIZE
      ) {
        Alert.alert(
          "File too large",
          "The selected image exceeds the 10MB size limit. Please select a smaller image."
        );
        return;
      }
      setUploadedReceipt(result.assets[0].uri);
    }
  };

  const handleRemoveReceipt = () => {
    setUploadedReceipt(null);
  };

  const handlePayPress = async () => {
    // 1. Create PaymentIntent on your backend
    const response = await fetch(
      `http://192.168.1.14:8082/api/payment/create-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1099 }), // amount in cents
      }
    );
    const { clientSecret } = await response.json();

    if (!clientSecret) {
      Alert.alert("Failed to get client secret");
      return;
    }

    // 2. Confirm the payment
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails: { name: "Test User" },
      },
    });

    if (error) {
      Alert.alert(`Payment failed: ${error.message}`);
    } else if (paymentIntent) {
      Alert.alert(
        "Payment successful",
        `PaymentIntent status: ${paymentIntent.status}`
      );
    }
  };

  const handleSubmitRecipt = async () => {
    if (!uploadedReceipt) {
      Alert.alert("Please upload a receipt before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: uploadedReceipt,
      name: `receipt-${Date.now()}.jpg`,
      type: "image/jpeg",
    } as any);
    formData.append("fineId", "F-20250315-001"); // Replace with the actual fine ID
    formData.append("amount", "4500.00"); // Replace with the actual payment ID


    const fineId = "F-20250315-001"; // Replace with the actual fine ID

    const response = await fetch(
      `http://192.168.1.14:8082/api/payment/upload-receipt/${fineId}`, // Use fineId instead of paymentId
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      Alert.alert("Receipt uploaded successfully!");
    } else {
      Alert.alert("Failed to upload receipt. Please try again.");
    }
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <View style={styles.paymentForm}>
            <CardField
              postalCodeEnabled={true}
              placeholders={{ number: "4242 4242 4242 4242" }}
              cardStyle={{}}
              style={{
                width: "100%",
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(card) => setCardDetails(card)}
            />
            <Button
              title="Pay"
              onPress={handlePayPress}
              disabled={!cardDetails?.complete}
            />
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
                onPress={handleUploadReceipt}
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
                    <Text style={styles.receiptName}>Receipt-12345.jpg</Text>
                    <TouchableOpacity
                      onPress={handleRemoveReceipt}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.removeReceipt}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <TouchableOpacity
                onPress={handleSubmitRecipt}
                style={[styles.payButton, { backgroundColor: COLORS.primary }]}
                activeOpacity={0.8}
              >
                <Text style={styles.payButtonText}>Submit Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      // case "wallet":
      //   return (
      //     <View style={styles.paymentForm}>
      //       <Text style={styles.paymentFormLabel}>Digital Wallet</Text>
      //       <View style={styles.walletSelection}>
      //         <Text style={styles.walletTitle}>Select a wallet</Text>
      //         <TouchableOpacity style={styles.walletOption} activeOpacity={0.7}>
      //           <Image
      //             source={{
      //               uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
      //             }}
      //             style={styles.walletLogo}
      //             resizeMode="contain"
      //           />
      //           <Text style={styles.walletName}>Lanka QR</Text>
      //           <Icon name="arrow-right" size={18} color={COLORS.text} />
      //         </TouchableOpacity>
      //         <TouchableOpacity style={styles.walletOption} activeOpacity={0.7}>
      //           <Image
      //             source={{
      //               uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
      //             }}
      //             style={styles.walletLogo}
      //             resizeMode="contain"
      //           />
      //           <Text style={styles.walletName}>FriMi</Text>
      //           <Icon name="arrow-right" size={18} color={COLORS.text} />
      //         </TouchableOpacity>
      //         <TouchableOpacity style={styles.walletOption} activeOpacity={0.7}>
      //           <Image
      //             source={{
      //               uri: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png",
      //             }}
      //             style={styles.walletLogo}
      //             resizeMode="contain"
      //           />
      //           <Text style={styles.walletName}>DCSL Pay</Text>
      //           <Icon name="arrow-right" size={18} color={COLORS.text} />
      //         </TouchableOpacity>
      //       </View>
      //       <Text style={styles.walletNote}>
      //         You will be redirected to the selected wallet app to complete the
      //         payment
      //       </Text>
      //     </View>
      //   );

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
              {/* <PaymentMethodCard
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
              /> */}
            </View>
          </View>

          {renderPaymentForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentsScreen;
