import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { RootState } from "@/stores/reducers";
import { SafeAreaView } from "react-native-safe-area-context";
import ScannerScreen from "../scanner/scanner";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

const HomeScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState<string>('');
  const [formData, setFormData] = useState({
    driverName: '',
    licenseNumber: '',
    vehicleNumber: '',
    reason: '',
    fine: '',
    location: '',
  });

  const navigation = useNavigation();


  const handleFormSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Fine created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setFormData({ driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' });
            navigation.navigate('FineHistory'); // Replace 'FineHistory' with your actual screen name
          },
        },
      ]);
    }
  };

  const [errors, setErrors] = useState({ driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' });

  const [reasons] = useState([
    { label: 'SV', fine: '1500.00' },
    { label: 'TSSV', fine: '1000.00' },
    { label: 'LRI', fine: '1000.00' },
    { label: 'VCSV', fine: '2000.00' },
    { label: 'DDDV', fine: '5000.00' },
  ]);

  const [openDropdown, setOpenDropdown] = useState(false);

  // Handle input changes
  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  // Handle Reason Dropdown change
  const handleReasonChange = (value: string | null) => {
    if (value) {
      const selectedReason = reasons.find((reason) => reason.label === value);
      if (selectedReason) {
        setFormData((prev) => ({
          ...prev,
          reason: selectedReason.label,
          fine: selectedReason.fine,
        }));
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' };

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key as keyof typeof formData] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        valid = false;
      }
    });

    // License Number: Only digits allowed
    <TextInput
      style={styles.input}
      placeholder="License Number"
      value={formData.licenseNumber}
      keyboardType="numeric" // Only shows numeric keyboard
      onChangeText={(text) => {
        if (/^\d*$/.test(text)) { // Ensures only numbers can be typed
          setFormData({ ...formData, licenseNumber: text });
          setErrors({ ...errors, licenseNumber: '' });
        } else {
          setErrors({ ...errors, licenseNumber: 'Only numbers are allowed' });
        }
      }}
    />
    { errors.licenseNumber ? <Text style={styles.errorText}>{errors.licenseNumber}</Text> : null }


    // Vehicle Number: Only capital letters and numbers allowed
    if (!/^[A-Z0-9]+$/.test(formData.vehicleNumber)) {
      newErrors.vehicleNumber = 'Vehicle Number must contain only capital letters and numbers';
      valid = false;
    }

    // Fine: Must be a valid number
    if (!formData.fine || isNaN(Number(formData.fine))) {
      newErrors.fine = 'Valid fine amount is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Handle form submission
  // Removed duplicate handleFormSubmit function

  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  const [isScannerVisible, setScannerVisible] = useState<boolean>(false);

  const scannedData = useSelector((state: RootState) => state.scanner);

  useEffect(() => {
    if (scannedData.scannedData !== null) {
      setScannerVisible(false);
      setModalVisible(true);
    }
  }
  , [scannedData]);

  return (
    <SafeAreaView style={styles.container}>
      {/* App Logo */}
      <Image
        source={require("../../assets/images/fine-logo.jpg")}
        style={styles.logo}
      /> 657a4d3 (add camera permissions and integrate QR code scanner modal in HomeScreen)

      <View style={styles.card}>
        <Text style={styles.title}>Create Fine</Text>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="pencil-outline" size={22} color="#3B82F6" />
            <Text style={styles.outlineButtonText}>Create Manually</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.filledButton]}
            onPress={() => setScannerVisible(true)}
          >
            <Icon name="qrcode-scan" size={22} color="white" />
            <Text style={styles.filledButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Driver Fine History</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Type License Number" style={styles.input} />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Fine</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close-circle-outline" size={28} color="red" />
              </TouchableOpacity>
            </View>
            {Object.keys(formData).map((field, index) => (
              field !== 'fine' && field !== 'reason' && (
                <View key={index} style={styles.inputGroup}>
                  <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')} <Text style={styles.required}>*</Text></Text>
                  <TextInput
                    placeholder={`Enter ${field.toLowerCase()}`}
                    style={[styles.inputField, errors[field as keyof typeof errors] && { borderColor: 'red' }]}
                    value={formData[field as keyof typeof formData]}
                    onChangeText={(text) => handleInputChange(field as keyof typeof formData, text)}
                  />
                  {errors[field as keyof typeof errors] && <Text style={styles.errorText}>{errors[field as keyof typeof errors]}</Text>}
                </View>
              )
            ))}

            <DropDownPicker
              open={openDropdown}
              value={formData.reason}
              items={reasons.map((reason) => ({ label: reason.label, value: reason.label }))}
              setOpen={setOpenDropdown}
              setValue={(callback) => {
                const value = typeof callback === 'function' ? callback(formData.reason) : callback;
                handleReasonChange(value);
              }}
              placeholder="Select Reason"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />

            <Text style={styles.fineText}>Fine Amount: LKR {formData.fine || '0.00'}</Text>

            <View style={styles.modalButtons}>

              <TouchableOpacity
                style={[styles.button, styles.outlineButton]}
                onPress={() => {}}
              >
                <Icon name="check-circle-outline" size={22} color="#3B82F6" />
                <Text style={styles.outlineButtonText}>Create Fine</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.filledButton]}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close-circle-outline" size={22} color="white" />
                <Text style={styles.filledButtonText}>Discard Fine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isScannerVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentScanner}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Scan QR</Text>
              <TouchableOpacity onPress={() => setScannerVisible(false)}>
                <Icon name="close-circle-outline" size={28} color="red" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalScanner}>
              <ScannerScreen />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Styles remain unchanged

// Removed duplicate export statement


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
  },
  logo: { width: 200, height: 200, alignSelf: "center", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowOpacity: 0.1,
    marginBottom: 16,
  },
  flexColumn: { alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "black", marginBottom: 16 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    marginBottom: 10,
  },
  outlineButton: { borderWidth: 1, borderColor: "#3B82F6" },
  outlineButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  filledButton: { backgroundColor: "#3B82F6" },
  filledButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: { flex: 1, fontSize: 16 },
  searchButton: { backgroundColor: '#3B82F6', padding: 10, borderRadius: 8 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 16, borderRadius: 12, shadowOpacity: 0.1 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  modalButtons: { marginTop: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, color: '#333', marginBottom: 8 },
  required: { color: 'red' },
  inputField: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, fontSize: 16 },
  errorText: { color: 'red', fontSize: 14 },
  dropdown: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
  dropdownContainer: { borderColor: '#ccc', borderRadius: 8 },
  fineText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 16 },
  modalScanner: {
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 12,
  },
  modalContentScanner: {
    width: 270,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    shadowOpacity: 0.1,
  },
});

export default HomeScreen;
