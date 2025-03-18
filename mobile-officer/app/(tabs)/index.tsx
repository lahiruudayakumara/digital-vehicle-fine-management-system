import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const [errors, setErrors] = useState({
    driverName: '',
    licenseNumber: '',
    vehicleNumber: '',
    reason: '',
    fine: '',
    location: '',
  });

  const [reasons] = useState([
    { label: 'SV', fine: '1500.00' },
    { label: 'TSSV', fine: '1000.00' },
    { label: 'LRI', fine: '1000.00' },
    { label: 'VCSV', fine: '2000.00' },
    { label: 'DDDV', fine: '5000.00' },
  ]);
  

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleReasonChange = (value: string) => {
    const selectedReason = reasons.find((reason) => reason.label === value);
    if (selectedReason) {
      setFormData({ ...formData, reason: value, fine: selectedReason.fine });
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { driverName: '', licenseNumber: '', vehicleNumber: '', reason: '', fine: '', location: '' };

    if (!formData.driverName.trim()) {
      newErrors.driverName = 'Driver Name is required';
      valid = false;
    }
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License Number is required';
      valid = false;
    }
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle Number is required';
      valid = false;
    }
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
      valid = false;
    }
    if (!formData.fine.trim() || isNaN(Number(formData.fine))) {
      newErrors.fine = 'Valid Fine amount is required';
      valid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setDate(currentDate);
  }, []);

  const handleFormSubmit = () => {
    if (validateForm()) {
      // Show success message
      Alert.alert('Success', 'Fine created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Clear the form data
            setFormData({
              driverName: '',
              licenseNumber: '',
              vehicleNumber: '',
              reason: '',
              fine: '',
              location: '',
            });

            // Close the modal
            setModalVisible(false);
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/fine-logo.jpg')} style={styles.logo} />

      <View style={styles.card}>
        <View style={styles.flexColumn}>
          <Text style={styles.title}>Create fine</Text>

          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={() => setModalVisible(true)}>
            <Icon name="pencil-outline" size={22} color="#3B82F6" />
            <Text style={styles.outlineButtonText}>Create Manually</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.filledButton]}
            onPress={() => { }}>
            <Icon name="qrcode-scan" size={22} color="white" />
            <Text style={styles.filledButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Driver fine History</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Type License number" style={styles.input} />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Fine</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close-circle-outline" size={28} color="red" />
              </TouchableOpacity>
            </View>

            {(['driverName', 'licenseNumber', 'vehicleNumber', 'location'] as Array<keyof typeof formData>).map(
              (field, index) => (
                <View key={index} style={styles.inputGroup}>
                  <Text style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    placeholder={`Enter ${field.toLowerCase()}`}
                    style={StyleSheet.flatten([styles.inputField, errors[field] ? { borderColor: 'red' } : {}])}
                    value={formData[field]}
                    onChangeText={(text) => handleInputChange(field, text)}
                  />
                  {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
                </View>
              )
            )}

            {/* Reason Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reason <Text style={styles.required}>*</Text></Text>
              <Picker
                selectedValue={formData.reason}
                onValueChange={handleReasonChange}
                style={[styles.inputField, errors.reason ? { borderColor: 'red' } : {}]}>
                <Picker.Item label="Select Reason" value="" />
                {reasons.map((reason, index) => (
                  <Picker.Item key={index} label={reason.label} value={reason.label} />
                ))}
              </Picker>
              {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
            </View>

            {/* Fine Field (Auto-filled when Reason is selected) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fine Amount <Text style={styles.required}>*</Text></Text>
              <TextInput value={formData.fine} editable={false} style={styles.inputField} />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={handleFormSubmit}>
                <Icon name="check-circle-outline" size={22} color="#3B82F6" />
                <Text style={styles.outlineButtonText}>Create Fine</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.filledButton]} onPress={() => setModalVisible(false)}>
                <Icon name="close-circle-outline" size={22} color="white" />
                <Text style={styles.filledButtonText}>Discard Fine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16, justifyContent: 'center' },
  logo: { width: 200, height: 200, alignSelf: 'center', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, shadowOpacity: 0.1, marginBottom: 16 },
  flexColumn: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 16 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, width: '100%', borderRadius: 8, marginBottom: 10 },
  outlineButton: { borderWidth: 1, borderColor: '#3B82F6' },
  outlineButtonText: { color: '#3B82F6', fontSize: 16, fontWeight: '500', marginLeft: 8 },
  filledButton: { backgroundColor: '#3B82F6' },
  filledButtonText: { color: 'white', fontSize: 16, fontWeight: '500', marginLeft: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  input: { flex: 1, fontSize: 16 },
  searchButton: { backgroundColor: '#3B82F6', padding: 10, borderRadius: 8 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 16, borderRadius: 12, shadowOpacity: 0.1 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '500', color: '#444', marginBottom: 4 },
  required: { color: 'red' }, // Red color for the asterisk
  inputField: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16 },
  modalButtons: { flexDirection: 'column', justifyContent: 'space-between', marginTop: 16 },
  errorText: { color: 'red', fontSize: 14, marginTop: 4 },
});

export default HomeScreen;
