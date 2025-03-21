import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const FineHistoryScreen: React.FC = () => {
  // Sample data based on the provided image
  const fineData = [
    { driverName: 'Abram Vaccaro', licenseNumber: 'ABX-2938-PLIQ', vehicleNumber: 'CAB-1234', date: '2025/02/20', category: 'SPD', fine: 'Rs 1000', status: 'Pending' },
    { driverName: 'Skyler Bator', licenseNumber: 'ZKY-7451-WNM', vehicleNumber: 'WP-ABC-5678', date: '2025/02/20', category: 'TSV', fine: 'Rs 1500', status: 'Pending' },
    { driverName: 'Gustavo Curtis', licenseNumber: 'QRT-1123-VBX', vehicleNumber: 'KL-09-XY-4321', date: '2025/02/05', category: 'TSV', fine: 'Rs 1500', status: 'Pending' },
    { driverName: 'Abram Vaccaro', licenseNumber: 'LMN-9082-CKR', vehicleNumber: 'GH-7654', date: '2025/02/10', category: 'TSV', fine: 'Rs 1500', status: 'Completed' },
    { driverName: 'Jakob Dokidis', licenseNumber: 'XOP-5674-YTZ', vehicleNumber: 'ABC-9087', date: '2025/02/05', category: 'PKG', fine: 'Rs 1000', status: 'Completed' },
    { driverName: 'Hanna George', licenseNumber: 'JHU-3345-GFS', vehicleNumber: 'NP-XY-1234', date: '2025/02/01', category: 'LRV', fine: 'Rs 2000', status: 'Pending' },
    { driverName: 'Chance Vetros', licenseNumber: 'DVT-6789-PQL', vehicleNumber: 'MN-5678', date: '2025/02/15', category: 'LRV', fine: 'Rs 2000', status: 'Pending' },
    { driverName: 'Corey Siphron', licenseNumber: 'WEX-2210-MNB', vehicleNumber: 'JP-8764', date: '2025/02/10', category: 'DU/HRD', fine: 'Rs 5500', status: 'Completed' },
    { driverName: 'Lydia Donin', licenseNumber: 'CYR-4532-KLJ', vehicleNumber: 'XY-8765', date: '2025/01/15', category: 'DU/HRD', fine: 'Rs 5500', status: 'Completed' },
  ];

  // State for search query, filter type, and date picker
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'name' | 'license' | 'date'>('name'); // Default filter by name
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date to match the data format (YYYY/MM/DD)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Filter the data based on the search query and filter type
  const filteredData = fineData.filter((item) => {
    if (!searchQuery) return true; // If no search query, show all data

    const query = searchQuery.toLowerCase();
    switch (filterType) {
      case 'name':
        return item.driverName.toLowerCase().includes(query);
      case 'license':
        return item.licenseNumber.toLowerCase().includes(query);
      case 'date':
        return item.date.toLowerCase().includes(query);
      default:
        return true;
    }
  });

  // Handle date change from the date picker
  const onDateChange = (event: any, selected?: Date) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(Platform.OS === 'ios'); // Hide on Android after selection, stay open on iOS
    setSelectedDate(currentDate);
    setSearchQuery(formatDate(currentDate)); // Update search query with selected date
  };

  // Render each row of the table
  const renderItem = ({ item }: { item: { driverName: string; licenseNumber: string; vehicleNumber: string; date: string; category: string; fine: string; status: string } }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.driverName}</Text>
      <Text style={styles.cell}>{item.licenseNumber}</Text>
      <Text style={styles.cell}>{item.vehicleNumber}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.fine}</Text>
      <View style={styles.actionCell}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.cell, styles.statusCell, item.status === 'Completed' ? styles.completed : styles.pending]}>
        {item.status}
      </Text>
    </View>
  );

  // Render the header
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>Driver Name</Text>
      <Text style={styles.headerCell}>License Number</Text>
      <Text style={styles.headerCell}>Vehicle Number</Text>
      <Text style={styles.headerCell}>Date</Text>
      <Text style={styles.headerCell}>Category</Text>
      <Text style={styles.headerCell}>Fine</Text>
      <Text style={styles.headerCell}>Action</Text>
      <Text style={styles.headerCell}>Status</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fine History</Text>
        <View style={styles.pagination}>
          <Text>Previous</Text>
          <Text>1 2 3</Text>
          <Text>Next</Text>
        </View>
      </View>

      {/* Search Bar and Filter Type Selector */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${filterType === 'name' ? 'name' : filterType === 'license' ? 'license' : 'date'}...`}
          value={filterType === 'date' ? searchQuery : undefined} // Only show value for date when date filter is active
          onChangeText={(text) => setSearchQuery(text)} // Manual input for name/license
          onFocus={() => filterType === 'date' && setShowDatePicker(true)} // Show date picker when focused on date filter
          editable={filterType !== 'date'} // Disable manual input for date filter
        />
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'name' && styles.activeFilter]}
            onPress={() => setFilterType('name')}
          >
            <Text style={styles.filterButtonText}>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'license' && styles.activeFilter]}
            onPress={() => setFilterType('license')}
          >
            <Text style={styles.filterButtonText}>License</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterType === 'date' && styles.activeFilter]}
            onPress={() => setFilterType('date')}
          >
            <Text style={styles.filterButtonText}>Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date('2025/12/31')} // Adjust based on your needs
          minimumDate={new Date('2025/01/01')} // Adjust based on your needs
        />
      )}

      {/* Table Container with Scrollable Area */}
      <View style={styles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={renderHeader}
            stickyHeaderIndices={[0]} // Makes the header sticky
            contentContainerStyle={styles.listContent}
          />
        </ScrollView>
      </View>

      {/* Footer */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate a Report</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    gap: 10,
  },
  // Search bar styles
  searchContainer: {
    padding: 10,
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
  // Table container to ensure the table doesn't push the footer out of view
  tableContainer: {
    flex: 1, // Takes up remaining space but leaves room for the footer
  },
  listContent: {
    paddingBottom: 10,
    minWidth: 900, // Adjust based on your column widths
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    width: 120, // Fixed width for each column
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  cell: {
    width: 120, // Fixed width for each column
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  actionCell: {
    width: 120, // Fixed width for action column
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  actionButton: {
    padding: 5,
  },
  actionText: {
    fontSize: 16,
  },
  statusCell: {
    width: 120, // Fixed width for status column
    textAlign: 'center',
    paddingVertical: 5,
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  // Footer styles remain unchanged
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    margin: 110,
    borderRadius: 5,
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FineHistoryScreen;