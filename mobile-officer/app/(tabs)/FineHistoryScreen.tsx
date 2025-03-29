import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFineAction, getAllFinesAction, updateFineAction } from '@/stores/slices/fine/fine-action';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppDispatch } from '@/stores/store';
import { Fine, FineRequest } from '@/types/fine-types';
import { RootState } from '@/stores/reducers';

const FineHistoryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fines, loading } = useSelector((state: RootState) => state.fines);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [updatedFineData, setUpdatedFineData] = useState<FineRequest>({
      driverName: '',
      licenseNumber: '',
      vehicleNumber: '',
      fineAmount: 0,
      category: '',
      location: '',
      policeOfficerId: 0, // Add this field with a default value
    });

  useEffect(() => {
    dispatch(getAllFinesAction());
  }, [dispatch]);

  const handleDeleteFine = (fineId: number) => {
    console.log("Deleting Fine ID:", fineId);

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

  const handleUpdateFine = (fine: Fine) => {
    setSelectedFine(fine);
    setUpdatedFineData({
          driverName: fine.driverName,
          licenseNumber: fine.licenseNumber,
          vehicleNumber: fine.vehicleNumber,
          fineAmount: fine.fineAmount,
          category: fine.category || '',
          location: fine.location || '', // Ensure location is included
          policeOfficerId: fine.policeOfficerId || 0 // Ensure policeOfficerId is included
        });
    setUpdateModalVisible(true);
  };

  const handleCompleteFine = (fine: Fine) => {
    const completedFineData = {
      ...fine,
      status: 'Completed'
    };

    // Only include the fields needed for the update request
    const updateData: FineRequest = {
      driverName: completedFineData.driverName,
      licenseNumber: completedFineData.licenseNumber,
      vehicleNumber: completedFineData.vehicleNumber,
      fineAmount: completedFineData.fineAmount,
      category: completedFineData.category || '',
      location: completedFineData.location || '', // Add location
      policeOfficerId: completedFineData.policeOfficerId || 0, // Add policeOfficerId
    };

    dispatch(updateFineAction({
      fineId: fine.fineId,
      fineData: updateData
    }));
  };

  const submitUpdateFine = async () => {
    if (!selectedFine) return;

    try {
      const resultAction = await dispatch(updateFineAction({
        fineId: selectedFine.fineId,
        fineData: updatedFineData
      }));

      if (updateFineAction.fulfilled.match(resultAction)) {
        setUpdateModalVisible(false);
        Alert.alert('Success', 'Fine updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update fine');
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'An error occurred while updating the fine');
    }
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

  // Calculate counts for status boxes
  const pendingCount = fines.filter(fine => fine.status === 'PENDING').length;
  const completedCount = fines.filter(fine => fine.status === 'COMPLETED').length;
  const totalCount = fines.length;

  const renderUpdateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Fine</Text>

            <Text style={styles.inputLabel}>Driver Name</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.driverName}
              onChangeText={(text) => setUpdatedFineData({ ...updatedFineData, driverName: text })}
              placeholder="Enter driver name"
            />

            <Text style={styles.inputLabel}>License Number</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.licenseNumber}
              onChangeText={(text) => setUpdatedFineData({ ...updatedFineData, licenseNumber: text })}
              placeholder="Enter license number"
            />

            <Text style={styles.inputLabel}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.vehicleNumber}
              onChangeText={(text) => setUpdatedFineData({ ...updatedFineData, vehicleNumber: text })}
              placeholder="Enter vehicle number"
            />

            <Text style={styles.inputLabel}>Fine Amount</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.fineAmount.toString()}
              onChangeText={(text) => setUpdatedFineData({ ...updatedFineData, fineAmount: parseFloat(text) || 0 })}
              placeholder="Enter fine amount"
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Violation</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.category}
              onChangeText={(text) => setUpdatedFineData({ ...updatedFineData, category: text })}
              placeholder="Enter violation details"
              multiline
            />
            

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setUpdateModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={submitUpdateFine}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fine History</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportText}>📄 Export Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${filterType}...`}
        value={searchQuery}
        onChangeText={setSearchQuery}
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'name' && styles.activeFilterButton]}
            onPress={() => setFilterType('name')}
          >
            <Text>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'license' && styles.activeFilterButton]}
            onPress={() => setFilterType('license')}
          >
            <Text>License</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'vehicle' && styles.activeFilterButton]}
            onPress={() => setFilterType('vehicle')}
          >
            <Text>Vehicle</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusBox}>{pendingCount}{'\n'}Pending</Text>
        <Text style={styles.statusBox}>{completedCount}{'\n'}Completed</Text>
        <Text style={styles.statusBox}>{totalCount}{'\n'}Total</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {filteredFines.length === 0 ? (
            <Text style={styles.noResultsText}>No fines found matching your search</Text>
          ) : (
            filteredFines.map((fine: Fine) => (
              <View key={fine.fineId} style={styles.fineItem}>
                <View style={styles.fineHeader}>
                  <Text style={styles.driverName}>{fine.driverName}</Text>
                  <Text style={[
                    styles.statusTag,
                    fine.status === 'COMPLETED' ? styles.completedTag : styles.pendingTag
                  ]}>
                    {fine.status}
                  </Text>
                </View>
                <Text>License: {fine.licenseNumber}</Text>
                <Text>Vehicle: {fine.vehicleNumber}</Text>
                <Text>Date: {fine.createdAt}</Text>
                <Text>Fine: Rs {fine.fineAmount}</Text>
                {fine.category && <Text>Violation: {fine.category}</Text>}
                <View style={styles.actionButtons}>
                  {fine.status !== 'COMPLETED' && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleCompleteFine(fine)}
                    >
                      <Text style={styles.actionButtonText}>✔ Complete</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdateFine(fine)}
                  >
                    <Text style={styles.actionButtonText}>✏ Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteFine(fine.fineId)}
                  >
                    <Text style={styles.actionButtonText}>🗑 Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {renderUpdateModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  exportButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  exportText: { color: '#FFF', fontWeight: 'bold' },
  searchInput: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: '#FFF' },
  filterContainer: { marginBottom: 10 },
  filterButtons: { flexDirection: 'row', marginTop: 5 },
  filterButton: { padding: 8, marginRight: 5, borderRadius: 5, backgroundColor: '#EFEFEF' },
  activeFilterButton: { backgroundColor: '#007BFF' },
  statusContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  statusBox: { backgroundColor: '#FFF', padding: 10, borderRadius: 5, textAlign: 'center', fontWeight: 'bold', width: 100 },
  fineItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  fineHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  driverName: { fontWeight: 'bold', fontSize: 16 },
  statusTag: { color: '#FFF', padding: 5, borderRadius: 5 },
  pendingTag: { backgroundColor: '#FFA500' },
  completedTag: { backgroundColor: '#28A745' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  completeButton: { backgroundColor: '#28A745', padding: 10, borderRadius: 5 },
  updateButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  deleteButton: { backgroundColor: '#DC3545', padding: 10, borderRadius: 5 },
  actionButtonText: { color: '#FFF', fontWeight: 'bold' },
  noResultsText: { textAlign: 'center', marginTop: 20, fontSize: 16 },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '90%', backgroundColor: '#FFF', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  inputLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 5, padding: 10, marginBottom: 15 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { padding: 12, borderRadius: 5, width: '48%', alignItems: 'center' },
  saveButton: { backgroundColor: '#007BFF' },
  cancelButton: { backgroundColor: '#6C757D' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  statusButtons: { flexDirection: 'row', marginBottom: 15 },
  statusButton: { flex: 1, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#DDD' },
  activeStatusButton: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  activeStatusText: { color: '#FFF' }
});

export default FineHistoryScreen;