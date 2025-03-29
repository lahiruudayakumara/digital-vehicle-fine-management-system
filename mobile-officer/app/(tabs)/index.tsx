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
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { RootState } from "@/stores/reducers";
import { SafeAreaView } from "react-native-safe-area-context";
import ScannerScreen from "../scanner/scanner";
import { createFineAction, getAllFinesAction } from "@/stores/slices/fine/fine-action";
import { useCameraPermissions } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { AppDispatch } from "../../stores/store"; // Moved outside the component
import { NavigationProp } from '@react-navigation/native';

// Define navigation param types
type RootStackParamList = {
  FineHistory: { licenseNumber: string };
  // Add other screens as needed
};

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Initialize with current date in YYYY-MM-DD format
    driverName: '',
    licenseNumber: '',
    vehicleNumber: '',
    reason: '',
    fine: '',
    location: '',
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Dispatch the action with form data
        const resultAction = await dispatch(createFineAction(formData));

        if (createFineAction.fulfilled.match(resultAction)) {
          // Refresh the fines list
          dispatch(getAllFinesAction());

          // Success
          Alert.alert('Success', 'Fine created successfully!', [
            {
              text: 'OK',
              onPress: () => {
                setModalVisible(false);
                setFormData({ date: '', driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' });
                navigation.navigate('FineHistory', { licenseNumber: '' });
              },
            },
          ]);
        } else {
          // Error from the action
          Alert.alert('Error', resultAction.error?.message || 'Failed to create fine. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [errors, setErrors] = useState({ date: '', driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' });

  // Add state to track license number validation status
  const [isLicenseValid, setIsLicenseValid] = useState(false);

  // Add state for license search
  const [searchLicense, setSearchLicense] = useState('');

  const [reasons] = useState([
    { label: 'SV', fine: '1500.00' },
    { label: 'TSSV', fine: '1000.00' },
    { label: 'LRI', fine: '1000.00' },
    { label: 'VCSV', fine: '2000.00' },
    { label: 'DDDV', fine: '5000.00' },
  ]);

  const [openDropdown, setOpenDropdown] = useState(false);

  // Handle input changes with validation
  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    // Apply field-specific validation during input
    if (field === 'licenseNumber') {
      // Only allow numbers for license number and maximum 10 digits
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }

      // Update license validation status
      setIsLicenseValid(value.length === 10);
    }

    if (field === 'driverName' && !/^[A-Za-z\s]*$/.test(value)) {
      // Only allow letters and spaces for driver name
      return;
    }

    if (field === 'vehicleNumber' && !/^[A-Z0-9]*$/.test(value)) {
      // Only allow capital letters and numbers for vehicle number
      return;
    }

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
    let newErrors = { date: '', driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' };

    // Check for empty fields - exclude date since it's auto-filled
    Object.keys(formData).forEach((key) => {
      if (key !== 'date') { // Skip validation for date field
        const formattedKey = formatFieldName(key); // Format key to readable text
        if (!formData[key as keyof typeof formData].trim()) {
          newErrors[key as keyof typeof newErrors] = `${formattedKey} is required`;
          valid = false;
        }
      }
    });

    // Driver Name: Only letters allowed
    if (formData.driverName && !/^[A-Za-z\s]+$/.test(formData.driverName)) {
      newErrors['driverName'] = 'Only letters and spaces are allowed';
      valid = false;
    }

    // License Number: Must be exactly 10 digits
    if (formData.licenseNumber && (!/^\d+$/.test(formData.licenseNumber) || formData.licenseNumber.length !== 10)) {
      newErrors['licenseNumber'] = 'License number must be exactly 10 digits';
      valid = false;
    }

    // Vehicle Number: Only capital letters and numbers allowed
    if (formData.vehicleNumber && !/^[A-Z0-9]+$/.test(formData.vehicleNumber)) {
      newErrors['vehicleNumber'] = 'Only capital letters and numbers are allowed';
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

  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1') // Add a space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
      .trim(); // Trim any extra spaces
  };

  // Handle license search
  const handleLicenseSearch = async () => {
    if (searchLicense.length !== 10 || !/^\d+$/.test(searchLicense)) {
      Alert.alert('Invalid License', 'Please enter a valid 10-digit license number');
      return;
    }

    try {
      // You could implement a search API call here or filter from existing data
      // For now, navigate to the history screen
      navigation.navigate('FineHistory', { licenseNumber: searchLicense });
    } catch (error) {
      Alert.alert('Error', 'Failed to search for license history');
    }
  };

  // Set current date automatically when component mounts or modal opens
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    // Update form data with current date
    setFormData(prev => ({ ...prev, date: currentDate }));
  }, [isModalVisible]); // Re-run when modal visibility changes

  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  const [isScannerVisible, setScannerVisible] = useState<boolean>(false);
  const scannedData = useSelector((state: RootState) => state.scanner);

  useEffect(() => {
    if (scannedData.scannedData !== null) {
      setScannerVisible(false);
      setModalVisible(true);

      // If scanned data contains license information, populate the form
      // This assumes the scanned data is in a format you can parse
      try {
        const parsedData = JSON.parse(scannedData.scannedData);
        if (parsedData.licenseNumber) {
          setFormData(prev => ({
            ...prev,
            driverName: parsedData.driverName || prev.driverName,
            licenseNumber: parsedData.licenseNumber || prev.licenseNumber,
            vehicleNumber: parsedData.vehicleNumber || prev.vehicleNumber,
          }));

          // Update license validation status if populated from scan
          setIsLicenseValid(parsedData.licenseNumber.length === 10);
        }
      } catch (e) {
        // If scanned data isn't JSON or doesn't have the expected format
        console.log("Could not parse scanned data:", e);
      }
    }
  }, [scannedData]);

  return (
    <SafeAreaView style={styles.container}>
      {/* App Logo */}
      <Image
        source={require("../../assets/images/fine-logo.jpg")}
        style={styles.logo}
      />

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
          onPress={() => {
            if (!isPermissionGranted) {
              requestPermission();
            } else {
              setScannerVisible(true);
            }
          }}
        >
          <Icon name="qrcode-scan" size={22} color="white" />
          <Text style={styles.filledButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Driver Fine History</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type License Number"
            style={styles.input}
            keyboardType="numeric" // Use numeric keyboard for license number search
            maxLength={10}  // Limit input to 10 characters
            value={searchLicense}
            onChangeText={setSearchLicense}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleLicenseSearch}
          >
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

            {/* Form fields excluding date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Driver Name <Text style={styles.required}>*</Text></Text>
              <TextInput
                placeholder="Enter driver name"
                style={[styles.inputField, errors.driverName && { borderColor: 'red' }]}
                value={formData.driverName}
                onChangeText={(text) => handleInputChange('driverName', text)}
              />
              {errors.driverName && <Text style={styles.errorText}>{errors.driverName}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>License Number <Text style={styles.required}>*</Text></Text>
              <TextInput
                placeholder="Enter license number"
                style={[
                  styles.inputField,
                  // Apply green border when valid, red border when invalid/typing
                  isLicenseValid ? styles.validInput : styles.invalidInput
                ]}
                value={formData.licenseNumber}
                onChangeText={(text) => handleInputChange('licenseNumber', text)}
                keyboardType="numeric"
                maxLength={10} // Limit input to 10 characters
              />
              {errors.licenseNumber && <Text style={styles.errorText}>{errors.licenseNumber}</Text>}
              {!isLicenseValid && formData.licenseNumber.length > 0 &&
                <Text style={styles.helperText}>License number must be exactly 10 digits</Text>
              }
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Number <Text style={styles.required}>*</Text></Text>
              <TextInput
                placeholder="Enter vehicle number"
                style={[styles.inputField, errors.vehicleNumber && { borderColor: 'red' }]}
                value={formData.vehicleNumber}
                onChangeText={(text) => handleInputChange('vehicleNumber', text.toUpperCase())} // Auto-convert to uppercase
                autoCapitalize="characters" // Force uppercase
              />
              {errors.vehicleNumber && <Text style={styles.errorText}>{errors.vehicleNumber}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location <Text style={styles.required}>*</Text></Text>
              <TextInput
                placeholder="Enter location"
                style={[styles.inputField, errors.location && { borderColor: 'red' }]}
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
              {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reason <Text style={styles.required}>*</Text></Text>
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
              {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
            </View>

            <Text style={styles.fineText}>Fine Amount: LKR {formData.fine || '0.00'}</Text>

            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.outlineButton,
                  isLoading && styles.disabledButton
                ]}
                onPress={handleFormSubmit}
                disabled={isLoading}
              >
                <Icon name="check-circle-outline" size={22} color="#3B82F6" />
                <Text style={styles.outlineButtonText}>
                  {isLoading ? 'Creating...' : 'Create Fine'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.filledButton]}
                onPress={() => setModalVisible(false)}
                disabled={isLoading}
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
  disabledButton: {
    opacity: 0.7,
    backgroundColor: "#cccccc",
    borderColor: "#999999",
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
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  modalButtons: { marginTop: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, color: '#333', marginBottom: 8 },
  required: { color: 'red' },
  inputField: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, fontSize: 16 },
  errorText: { color: 'red', fontSize: 14, marginTop: 4 },
  helperText: { color: '#666', fontSize: 12, marginTop: 4 },
  validInput: { borderColor: 'green', borderWidth: 1 },
  invalidInput: { borderColor: 'red', borderWidth: 1 },
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