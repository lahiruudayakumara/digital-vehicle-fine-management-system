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
    policeOfficerId: 0,
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
      location: fine.location || '',
      policeOfficerId: fine.policeOfficerId || 0
    });
    setUpdateModalVisible(true);
  };

  const handleCompleteFine = (fine: Fine) => {
    const completedFineData = {
      ...fine,
      status: 'Completed'
    };

    const updateData: FineRequest = {
      driverName: completedFineData.driverName,
      licenseNumber: completedFineData.licenseNumber,
      vehicleNumber: completedFineData.vehicleNumber,
      fineAmount: completedFineData.fineAmount,
      category: completedFineData.category || '',
      location: completedFineData.location || '',
      policeOfficerId: completedFineData.policeOfficerId || 0,
    };

    dispatch(updateFineAction({
      fineId: fine.fineId,
      fineData: updateData
    }));
  };

  const submitUpdateFine = async () => {
    if (!selectedFine) return;

    try {
      const allowedUpdateData = {
        driverName: updatedFineData.driverName,
        licenseNumber: updatedFineData.licenseNumber,
        vehicleNumber: updatedFineData.vehicleNumber,
        fineAmount: selectedFine.fineAmount,
        category: selectedFine.category || '',
        location: selectedFine.location || '',
        policeOfficerId: selectedFine.policeOfficerId || 0,
      };

      const resultAction = await dispatch(updateFineAction({
        fineId: selectedFine.fineId,
        fineData: allowedUpdateData
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

  const pendingCount = fines.filter(fine => fine.status === 'PENDING').length;
  const completedCount = fines.filter(fine => fine.status === 'COMPLETED').length;
  const totalCount = fines.length;

  const filteredFines = fines.filter((fine) => {
    const query = searchQuery.toLowerCase();
    if (filterType === 'name') {
      return fine.driverName.toLowerCase().includes(query);
    } else if (filterType === 'license') {
      return fine.licenseNumber.toLowerCase().includes(query);
    } else if (filterType === 'vehicle') {
      return fine.vehicleNumber.toLowerCase().includes(query);
    }
    return false;
  });

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

      <View style={styles.searchSection}>
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
            <Text style={filterType === 'name' ? styles.activeFilterText : styles.filterText}>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'license' && styles.activeFilterButton]}
            onPress={() => setFilterType('license')}
          >
            <Text style={filterType === 'license' ? styles.activeFilterText : styles.filterText}>License</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'vehicle' && styles.activeFilterButton]}
            onPress={() => setFilterType('vehicle')}
          >
            <Text style={filterType === 'vehicle' ? styles.activeFilterText : styles.filterText}>Vehicle</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#505DD1" />
          <Text style={styles.loadingText}>Loading fines...</Text>
        </View>
      ) : (
        <ScrollView style={styles.finesList}>
          {filteredFines.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No fines found matching your search</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search criteria</Text>
            </View>
          ) : (
            filteredFines.map((fine: Fine) => (
              <View key={fine.fineId} style={styles.fineCard}>
                <View style={styles.fineHeader}>
                  <View>
                    <Text style={styles.driverName}>{fine.driverName}</Text>
                    <Text style={styles.fineDate}>{fine.createdAt}</Text>
                  </View>
                  <Text style={[
                    styles.statusTag,
                    fine.status === 'COMPLETED' ? styles.completedTag : styles.pendingTag
                  ]}>
                    {fine.status}
                  </Text>
                </View>

                <View style={styles.fineDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>License:</Text>
                    <Text style={styles.detailValue}>{fine.licenseNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Vehicle:</Text>
                    <Text style={styles.detailValue}>{fine.vehicleNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount:</Text>
                    <Text style={styles.detailValue}>Rs {fine.fineAmount}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{fine.location}</Text>
                  </View>
                  {fine.category && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Category:</Text>
                      <Text style={styles.detailValue}>{fine.category}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.actionButtons}>
                  
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdateFine(fine)}
                  >
                    <Text style={styles.actionButtonText}>✎ Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteFine(fine.fineId)}
                  >
                    <Text style={styles.actionButtonText}>✕ Delete</Text>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A2138'
  },
  exportButton: {
    backgroundColor: '#505DD1',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation: 2
  },
  exportText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  searchSection: {
    marginBottom: 16
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E1E5EB',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 8
  },
  filterButtons: {
    flexDirection: 'row',
    marginTop: 8
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#E1E5EB',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  activeFilterButton: {
    backgroundColor: '#EEF0FF',
    borderColor: '#505DD1'
  },
  filterText: {
    color: '#6B7280'
  },
  activeFilterText: {
    color: '#505DD1',
    fontWeight: 'bold'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E1E5EB'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A2138'
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 16
  },
  finesList: {
    flex: 1
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280'
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8
  },
  fineCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E1E5EB',
    elevation: 2
  },
  fineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1A2138'
  },
  fineDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  statusTag: {
    color: '#FFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 'bold'
  },
  pendingTag: {
    backgroundColor: '#F59E0B'
  },
  completedTag: {
    backgroundColor: '#10B981'
  },
  fineDetails: {
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 'bold'
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#1A2138'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  completeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8
  },
  updateButton: {
    backgroundColor: '#505DD1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A2138'
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  modalButton: {
    padding: 14,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    elevation: 2
  },
  saveButton: {
    backgroundColor: '#505DD1'
  },
  cancelButton: {
    backgroundColor: '#9CA3AF'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default FineHistoryScreen;