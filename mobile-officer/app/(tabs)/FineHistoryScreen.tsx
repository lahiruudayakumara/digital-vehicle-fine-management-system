import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const FineHistoryScreen: React.FC = () => {
  const fineData = [
    { driverName: 'Abram Vaccaro', licenseNumber: 'ABX-2938-PLIQ', vehicleNumber: 'CAB-1234', date: '2025/02/20', Location: 'Colombo', category: 'SPD', fine: 'Rs 1000', status: 'Pending' },
    { driverName: 'Skyler Bator', licenseNumber: 'ZKY-7451-WNM', vehicleNumber: 'WP-ABC-5678', date: '2025/02/20', Location: 'Galle', category: 'TSV', fine: 'Rs 1500', status: 'Pending' },
    { driverName: 'Liam Grace', licenseNumber: 'LGR-9824-ABC', vehicleNumber: 'LMN-9876', date: '2025/03/01', Location: 'Kandy', category: 'SPD', fine: 'Rs 2000', status: 'Completed' },
    { driverName: 'Olivia Johnson', licenseNumber: 'OJN-4672-XYZ', vehicleNumber: 'ABC-1324', date: '2025/03/05', Location: 'Jaffna', category: 'RSP', fine: 'Rs 1200', status: 'Pending' },
    { driverName: 'Noah Parker', licenseNumber: 'NPK-8357-KLP', vehicleNumber: 'XYZ-7777', date: '2025/03/10', Location: 'Matara', category: 'TSV', fine: 'Rs 1800', status: 'Completed' },
    { driverName: 'Emma Williams', licenseNumber: 'EMW-1549-GHQ', vehicleNumber: 'DEF-5678', date: '2025/03/15', Location: 'Negombo', category: 'SPD', fine: 'Rs 2500', status: 'Pending' },
    { driverName: 'Ava Davis', licenseNumber: 'AVD-2368-JKQ', vehicleNumber: 'GHI-2234', date: '2025/03/18', Location: 'Kurunegala', category: 'RSP', fine: 'Rs 3000', status: 'Completed' },
    { driverName: 'Mason Brown', licenseNumber: 'MNB-5564-PRT', vehicleNumber: 'JKL-9988', date: '2025/03/20', Location: 'Anuradhapura', category: 'TSV', fine: 'Rs 1100', status: 'Pending' },
    { driverName: 'Isabella Moore', licenseNumber: 'ISM-7893-KTQ', vehicleNumber: 'MNO-1122', date: '2025/03/25', Location: 'Ratnapura', category: 'SPD', fine: 'Rs 1300', status: 'Completed' },
    { driverName: 'Lucas Harris', licenseNumber: 'LHR-9825-WNV', vehicleNumber: 'PQR-6677', date: '2025/03/28', Location: 'Badulla', category: 'RSP', fine: 'Rs 1600', status: 'Pending' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filterType, setFilterType] = useState<'name' | 'license' | 'date'>('name');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFine, setSelectedFine] = useState<any>(null);
  const [updatedFine, setUpdatedFine] = useState({
    driverName: '',
    licenseNumber: '',
    vehicleNumber: '',
    date: '',
    Location: '',
    category: '',
    fine: '',
    status: '',
  });

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const filterOptions = [
    { label: 'Search by Driver Name', value: 'name' },
    { label: 'Search by Driver License Number', value: 'license' },
    { label: 'Search by fine Date', value: 'date' },
  ];

  const filteredData = fineData.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return filterType === 'name' ? item.driverName.toLowerCase().includes(query) :
      filterType === 'license' ? item.licenseNumber.toLowerCase().includes(query) :
        item.date.includes(query);
  });

  const onDateChange = (event: any, selected?: Date) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    setSearchQuery(formatDate(currentDate));
  };

  const handleDelete = (item: any) => {
    Alert.alert(
      'Delete Fine Record',
      'Are you sure you want to delete this fine record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            // Perform the delete action here (e.g., remove from the list, API call, etc.)
            console.log('Fine record deleted:', item);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdate = (item: any) => {
    setSelectedFine(item);
    setUpdatedFine(item);
    setShowUpdateModal(true);
  };

  const handleSaveUpdate = () => {
    // Update the fineData array with the updated fine details
    const updatedData = fineData.map((fine) =>
      fine.licenseNumber === selectedFine.licenseNumber ? updatedFine : fine
    );
    console.log('Updated Fine Record:', updatedData);

    Alert.alert('Success', 'Fine record updated successfully!', [{ text: 'OK' }]);
    setShowUpdateModal(false);
  };

  const generateReport = async () => {
    const htmlContent = `
      <h2>Fine History Report</h2>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>License Number</th>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Location</th>
            <th>Category</th>
            <th>Fine</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredData
            .map(
              (item) => `
            <tr>
              <td>${item.driverName}</td>
              <td>${item.licenseNumber}</td>
              <td>${item.vehicleNumber}</td>
              <td>${item.date}</td>
              <td>${item.Location}</td>
              <td>${item.category}</td>
              <td>${item.fine}</td>
              <td>${item.status}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'fine_report',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `Report generated at: ${file.filePath}`);
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'Failed to generate the report.');
    }
  };

  const renderCard = ({ item }: { item: { driverName: string; licenseNumber: string; vehicleNumber: string; date: string; Location: string; category: string; fine: string; status: string } }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Driver: {item.driverName}</Text>
      <Text>License Number: {item.licenseNumber}</Text>
      <Text>Vehicle Number: {item.vehicleNumber}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Fine: {item.fine}</Text>
      <Text>Status: <Text style={item.status === 'Completed' ? styles.completed : styles.pending}>{item.status}</Text></Text>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdate(item)}>
          <Icon name="pencil" size={18} color="#fff" /> {/* Update Icon */}
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
          <Icon name="trash" size={18} color="#fff" /> {/* Delete Icon */}
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>Fine History</Text>

      <DropDownPicker
        open={openDropdown}
        value={filterType}
        items={filterOptions}
        setOpen={setOpenDropdown}
        setValue={setFilterType}
        placeholder="Select Filter"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TextInput
        style={styles.searchInput}
        placeholder={`Search by ${filterType}`}
        value={filterType === 'date' ? searchQuery : undefined}
        onChangeText={(text) => setSearchQuery(text)}
        onFocus={() => filterType === 'date' && setShowDatePicker(true)}
        editable={filterType !== 'date'}
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity style={styles.generateButton} onPress={generateReport}>
        <Text style={styles.generateButtonText}>Generate a Report</Text>
      </TouchableOpacity>

      <ScrollView style={styles.cardsContainer}>
        {filteredData.map((item, index) => renderCard({ item }))}
      </ScrollView>

      {/* Update Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showUpdateModal}
        onRequestClose={() => setShowUpdateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Fine Record</Text>

            <TextInput
              style={styles.inputField}
              placeholder="Driver Name"
              value={updatedFine.driverName}
              onChangeText={(text) => setUpdatedFine({ ...updatedFine, driverName: text })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="License Number"
              value={updatedFine.licenseNumber}
              onChangeText={(text) => setUpdatedFine({ ...updatedFine, licenseNumber: text })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Vehicle Number"
              value={updatedFine.vehicleNumber}
              onChangeText={(text) => setUpdatedFine({ ...updatedFine, vehicleNumber: text })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Location"
              value={updatedFine.Location}
              onChangeText={(text) => setUpdatedFine({ ...updatedFine, Location: text })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Category"
              value={updatedFine.category}
              onChangeText={(text) => setUpdatedFine({ ...updatedFine, category: text })}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Fine"
              value={updatedFine.fine}
              onChangeText={(text) => setUpdatedFine({ ...updatedFine, fine: text })}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveUpdate}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowUpdateModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e63946',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  generateButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#e63946',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default FineHistoryScreen;
