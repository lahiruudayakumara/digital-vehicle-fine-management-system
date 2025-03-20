import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

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

  // Removed duplicate formatDate function

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
        {
          text: 'Cancel',
          style: 'cancel',
        },
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
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
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

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date('2025/12/31')}
          minimumDate={new Date('2025/01/01')}
        />
      )}

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate a Report</Text>
      </TouchableOpacity>

      {/* Card Container with Scrollable Area */}
      <ScrollView style={styles.cardsContainer}>
        {filteredData.map((item, index) => renderCard({ item }))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 0,
    height: 40,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderWidth: 5,
    borderRadius: 5,
    marginBottom: 5, // Adds space below the dropdown
  },

  header: {
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
    ,
  },
  searchContainer: {
    padding: 10,
    marginTop: 5, // Adjust this value for more or less spacing
  },

  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  cardsContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    marginVertical: 10,
    width: 150,
    alignSelf: 'flex-end', // Moves the button to the right
  },


  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FineHistoryScreen;
