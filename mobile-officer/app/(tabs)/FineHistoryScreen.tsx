import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFineAction, getAllFinesAction, updateFineAction } from '@/stores/slices/fine/fine-action';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppDispatch } from '@/stores/store';
import { Fine, FineRequest } from '@/types/fine-types';
import { RootState } from '@/stores/reducers';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';

const FineHistoryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fines, loading } = useSelector((state: RootState) => state.fines);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [updatedFineData, setUpdatedFineData] = useState<FineRequest>({
    driverName: '',
    licenseNumber: '',
    vehicleNumber: '',
    fineAmount: 0,
    category: '',
    location: '',
    policeOfficerId: 0,
  });
  const [validationErrors, setValidationErrors] = useState({
    driverName: '',
    licenseNumber: '',
    vehicleNumber: '',
  });

  useEffect(() => {
    dispatch(getAllFinesAction());
  }, [dispatch]);

  // Function to generate and export Excel report
  const generateExcelReport = async () => {
    try {
      setExportLoading(true);

      // Create worksheet with formatted data
      const worksheet = XLSX.utils.json_to_sheet(
        fines.map(fine => ({
          'Driver Name': fine.driverName,
          'License Number': fine.licenseNumber,
          'Vehicle Number': fine.vehicleNumber,
          'Fine Amount': `Rs ${fine.fineAmount}`,
          'Category': fine.category || 'N/A',
          'Location': fine.location || 'N/A',
          'Status': fine.status,
          'Date': fine.createdAt
        }))
      );

      // Set column widths for better readability
      const columnWidths = [
        { wch: 20 }, // Driver Name
        { wch: 15 }, // License Number
        { wch: 15 }, // Vehicle Number
        { wch: 12 }, // Fine Amount
        { wch: 15 }, // Category
        { wch: 20 }, // Location
        { wch: 12 }, // Status
        { wch: 20 }  // Date
      ];

      worksheet['!cols'] = columnWidths;

      // Create workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Fine History');

      // Generate Excel file
      const wbout = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

      // Get current date for filename
      const date = new Date();
      const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const fileName = `FineHistory_${dateString}.xlsx`;

      // Create file path
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      // Write the file
      await FileSystem.writeAsStringAsync(filePath, wbout, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Share the file
      await Sharing.shareAsync(filePath, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Save Fine History Report',
        UTI: 'com.microsoft.excel.xlsx'
      });

      setExportLoading(false);
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Export Failed', 'Failed to generate Excel report');
      setExportLoading(false);
    }
  };

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
    setValidationErrors({
      driverName: '',
      licenseNumber: '',
      vehicleNumber: '',
    });
    setUpdateModalVisible(true);
  };

  const validateInputs = () => {
    let isValid = true;
    const errors = {
      driverName: '',
      licenseNumber: '',
      vehicleNumber: '',
    };

    // Validate driver name (only letters)
    if (!/^[a-zA-Z\s]+$/.test(updatedFineData.driverName)) {
      errors.driverName = 'Driver name must contain only letters';
      isValid = false;
    }

    // Validate license number (exactly 10 numbers)
    if (!/^\d{10}$/.test(updatedFineData.licenseNumber)) {
      errors.licenseNumber = 'License number must be exactly 10 digits';
      isValid = false;
    }

    // Validate vehicle number (only numbers and capital letters)
    if (!/^[A-Z0-9]+$/.test(updatedFineData.vehicleNumber)) {
      errors.vehicleNumber = 'Vehicle number must contain only numbers and capital letters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const submitUpdateFine = async () => {
    if (!selectedFine) return;

    if (!validateInputs()) {
      return;
    }

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

  const validateDriverName = (text: string) => {
    // Only allow letters
    const letterOnly = text.replace(/[^a-zA-Z\s]/g, '');
    setUpdatedFineData({ ...updatedFineData, driverName: letterOnly });
  };

  const validateLicenseNumber = (text: string) => {
    // Only allow numbers and limit to 10 digits
    const numbersOnly = text.replace(/[^0-9]/g, '').slice(0, 10);
    setUpdatedFineData({ ...updatedFineData, licenseNumber: numbersOnly });
  };

  const validateVehicleNumber = (text: string) => {
    // Only allow capital letters and numbers
    const validChars = text.replace(/[^A-Z0-9]/g, '');
    setUpdatedFineData({ ...updatedFineData, vehicleNumber: validChars });
  };

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
              onChangeText={validateDriverName}
              placeholder="Enter driver name (letters only)"
            />
            {validationErrors.driverName ? (
              <Text style={styles.errorText}>{validationErrors.driverName}</Text>
            ) : null}

            <Text style={styles.inputLabel}>License Number</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.licenseNumber}
              onChangeText={validateLicenseNumber}
              placeholder="Enter license number (10 digits)"
              keyboardType="numeric"
            />
            {validationErrors.licenseNumber ? (
              <Text style={styles.errorText}>{validationErrors.licenseNumber}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Vehicle Number</Text>
            <TextInput
              style={styles.input}
              value={updatedFineData.vehicleNumber}
              onChangeText={validateVehicleNumber}
              placeholder="Enter vehicle number (numbers and capital letters)"
              autoCapitalize="characters"
            />
            {validationErrors.vehicleNumber ? (
              <Text style={styles.errorText}>{validationErrors.vehicleNumber}</Text>
            ) : null}

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
        <TouchableOpacity
          style={styles.exportButton}
          onPress={generateExcelReport}
          disabled={exportLoading || loading || fines.length === 0}
        >
          {exportLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.exportText}>📄 Export Report</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search by ${filterType}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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
          <FontAwesome5 name="hourglass-half" size={24} color="#F59E0B" style={styles.statIcon} />
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <FontAwesome5 name="check-circle" size={24} color="#10B981" style={styles.statIcon} />
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="list" size={24} color="#3B82F6" style={styles.statIcon} />
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
                  <Text style={styles.driverName}>{fine.driverName}</Text>
                  <View style={[
                    styles.statusTag,
                    fine.status === 'COMPLETED' ? styles.completedTag : styles.pendingTag
                  ]}>
                    <Text style={styles.statusText}>{fine.status}</Text>
                  </View>
                </View>

                <View style={styles.fineDetails}>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="person" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>License:</Text>
                    <Text style={styles.detailValue}>{fine.licenseNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="directions-car" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Vehicle:</Text>
                    <Text style={styles.detailValue}>{fine.vehicleNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="location-on" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{fine.location || 'Not specified'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="event" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>{fine.createdAt}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="attach-money" size={20} color="#6B7280" />
                    <Text style={styles.detailLabel}>Fine:</Text>
                    <Text style={styles.detailValue}>Rs {fine.fineAmount}</Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdateFine(fine)}
                  >
                    <MaterialIcons name="edit" size={18} color="#FFF" />
                    <Text style={styles.actionButtonText}>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteFine(fine.fineId)}
                  >
                    <MaterialIcons name="delete" size={18} color="#FFF" />
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="home" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemActive}>
          <MaterialIcons name="history" size={24} color="#505DD1" />
          <Text style={styles.tabLabelActive}>Fine History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="person" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#172B4D'
  },
  exportButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  exportText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },
  searchSection: {
    marginBottom: 16
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E5EB',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 12
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16
  },
  filterButtons: {
    flexDirection: 'row',
    marginTop: 12
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#EDF2F7'
  },
  activeFilterButton: {
    backgroundColor: '#EEF0FF',
    borderWidth: 1,
    borderColor: '#3B82F6'
  },
  filterText: {
    color: '#6B7280',
    fontWeight: '500'
  },
  activeFilterText: {
    color: '#3B82F6',
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
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E1E5EB'
  },
  statIcon: {
    marginBottom: 8
  },
  statNumber: {
    fontSize: 28,
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
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: 'blue',
  },
  fineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#172B4D'
  },
  fineDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4
  },
  statusTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14
  },
  pendingTag: {
    backgroundColor: '#F59E0B'
  },
  completedTag: {
    backgroundColor: '#10B981'
  },
  fineDetails: {
    marginBottom: 16
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  detailLabel: {
    width: 80,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 8
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
    color: '#1A2138',
    fontWeight: '500'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  updateButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    marginRight: 16
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%'
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E1E5EB',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 8
  },
  tabItemActive: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#505DD1'
  },
  tabLabel: {
    color: '#9CA3AF',
    marginTop: 4,
    fontSize: 12
  },
  tabLabelActive: {
    color: '#505DD1',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 12
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
    color: '#172B4D'
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
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 12,
    fontSize: 14
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
    backgroundColor: '#3B82F6'
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