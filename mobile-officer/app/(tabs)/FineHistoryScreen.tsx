import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFineAction, getAllFinesAction } from '@/stores/slices/fine/fine-action'; // Updated action import
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppDispatch } from '@/stores/store'; // Import the AppDispatch type
import { Fine } from '@/types/fine-types'; // Import the Fine type
import { RootState } from '@/stores/reducers';

const FineHistoryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fines, loading } = useSelector((state: RootState) => state.fines);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name');

  useEffect(() => {
    dispatch(getAllFinesAction());
  }, [dispatch]);

  const handleDeleteFine = (fineId: number) => {
    console.log("Deleting Fine ID:", fineId); // Debug log

    Alert.alert('Delete Fine', 'Are you sure you want to delete this fine?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const resultAction = await dispatch(deleteFineAction(fineId));
          console.log("Delete Result:", resultAction);
        },
      },
    ]);
  };

  const filteredFines = fines.filter((fine: Fine) => {
    if (!searchQuery) return true;
    const query = searchQuery.toUpperCase();
    switch (filterType) {
      case 'name':
        return fine.driverName.toUpperCase().includes(query);
      case 'license':
        return fine.licenseNumber.toUpperCase().includes(query);
      case 'vehicle':
        return fine.vehicleNumber.toUpperCase().includes(query);
      default:
        return true;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fine History</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportText}>📄 Export Report</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.statusBox}>6{'\n'}Pending</Text>
        <Text style={styles.statusBox}>4{'\n'}Completed</Text>
        <Text style={styles.statusBox}>10{'\n'}Total</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {filteredFines.map((fine: Fine) => (
            <View key={fine.fineId} style={styles.fineItem}>
              <View style={styles.fineHeader}>
                <Text style={styles.driverName}>{fine.driverName}</Text>
                <Text style={styles.statusTag}>{fine.status}</Text>
              </View>
              <Text>License: {fine.licenseNumber}</Text>
              <Text>Vehicle: {fine.vehicleNumber}</Text>
              <Text>Date: {fine.createdAt}</Text>
              <Text>Fine: Rs {fine.fineAmount}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.completeButton}>
                  <Text>✔ Complete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.updateButton}>
                  <Text>✏ Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteFine(fine.fineId)}
                >
                  <Text>🗑 Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  exportButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  exportText: { color: '#FFF', fontWeight: 'bold' },
  searchInput: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#FFF' },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  statusBox: { backgroundColor: '#FFF', padding: 10, borderRadius: 5, textAlign: 'center', fontWeight: 'bold', width: 100 },
  fineItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  fineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  driverName: { fontWeight: 'bold', fontSize: 16 },
  statusTag: { backgroundColor: '#FFA500', color: '#FFF', padding: 5, borderRadius: 5 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  completeButton: { backgroundColor: '#28A745', padding: 10, borderRadius: 5 },
  updateButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  deleteButton: { backgroundColor: '#DC3545', padding: 10, borderRadius: 5 }
});

export default FineHistoryScreen;