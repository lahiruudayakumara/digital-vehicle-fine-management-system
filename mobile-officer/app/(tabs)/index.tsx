import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => {}}>
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
            {['Driver Name', 'License Number', 'Vehicle Number', 'Date', 'Reason', 'Fine'].map((label, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={styles.label}>{label} *</Text>
                <TextInput placeholder={`Enter ${label.toLowerCase()}`} style={styles.inputField} />
              </View>
            ))}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => {}}>
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
  inputField: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16 },
  modalButtons: { flexDirection: 'column', justifyContent: 'space-between', marginTop: 16 },
});

export default HomeScreen;
