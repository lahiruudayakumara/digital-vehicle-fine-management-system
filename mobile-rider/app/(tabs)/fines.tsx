// fines.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { COLORS } from '../finesStyles';

// Types for our component props
interface FineDetailsProps {
  id: string;
  amount: number;
  date: string;
  description: string;
  location: string;
  officerId: string;
  officerName: string;
  status: 'paid' | 'unpaid' | 'appealed';
  dueDate: string;
  violationType: string;
}

// Fine list item component
const FineListItem: React.FC<{
  fine: FineDetailsProps;
  onPress: () => void;
  isExpanded: boolean;
}> = ({ fine, onPress, isExpanded }) => {

  // Determine status color and icon name
  let statusColor, statusIconName;
  switch (fine.status) {
    case 'paid':
      statusColor = COLORS.success;
      statusIconName = "check";
      break;
    case 'appealed':
      statusColor = COLORS.secondary;
      statusIconName = "clock-outline";
      break;
    case 'unpaid':
    default:
      statusColor = COLORS.accent;
      statusIconName = "alert-circle-outline";
      break;
  }

  return (
    <View style={[styles.fineCard]}>
      <TouchableOpacity 
        style={styles.fineCardHeader} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.fineCardHeaderContent}>
          <View style={[styles.fineStatusIndicator, { backgroundColor: statusColor }]}>
            <Icon name={statusIconName} size={16} color={COLORS.white} />
          </View>
          <View style={styles.fineCardHeaderInfo}>
            <Text style={styles.fineDescription}>
              {fine.description}
            </Text>
            <Text style={styles.fineMetaInfo}>
              {fine.date} • Rs. {fine.amount.toFixed(2)}
            </Text>
          </View>
        </View>
        
        <Icon 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={COLORS.textLight} 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.fineCardDetail}>
          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Fine ID:</Text>
            <Text style={styles.fineCardDetailValue}>{fine.id}</Text>
          </View>
          
          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Location:</Text>
            <Text style={styles.fineCardDetailValue}>{fine.location}</Text>
          </View>
          
          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Officer:</Text>
            <Text style={styles.fineCardDetailValue}>{fine.officerName} (ID: {fine.officerId})</Text>
          </View>
          
          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Type:</Text>
            <Text style={styles.fineCardDetailValue}>{fine.violationType}</Text>
          </View>
          
          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Due Date:</Text>
            <Text style={[
              styles.fineCardDetailValue,
              fine.status === 'unpaid' && styles.fineCardDetailValueAlert,
            ]}>{fine.dueDate}</Text>
          </View>
          
          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Status:</Text>
            <View style={[styles.fineStatusBadge, { backgroundColor: statusColor + '20' }]}>
              <Text style={[styles.fineStatusText, { color: statusColor }]}>
                {fine.status.charAt(0).toUpperCase() + fine.status.slice(1)}
              </Text>
            </View>
          </View>
          
          {fine.status === 'unpaid' && (
            <View style={styles.fineCardActions}>
              <TouchableOpacity 
                style={[styles.fineCardButton, { backgroundColor: COLORS.primary }]}
                activeOpacity={0.8}
              >
                <Text style={styles.fineCardButtonText}>Pay Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.fineCardButton, styles.fineCardButtonOutline]}
                activeOpacity={0.8}
              >
                <Text style={[styles.fineCardButtonText, { color: COLORS.primary }]}>Appeal</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {fine.status === 'appealed' && (
            <View style={styles.fineCardActions}>
              <TouchableOpacity 
                style={[styles.fineCardButton, { backgroundColor: COLORS.secondary }]}
                activeOpacity={0.8}
              >
                <Text style={styles.fineCardButtonText}>View Appeal Status</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Filter chip component
const FilterChip: React.FC<{
  label: string;
  isActive: boolean;
  onPress: () => void;
}> = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterChip,
        isActive && { backgroundColor: COLORS.primary },
        !isActive && { backgroundColor: COLORS.white }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.filterChipText,
        isActive && { color: COLORS.white },
        !isActive && { color: COLORS.text }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Empty state component
const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.emptyState}>
      <Icon name="file-document-outline" size={48} color={COLORS.textLight} />
      <Text style={styles.emptyStateText}>
        {message}
      </Text>
    </View>
  );
};

const FinesScreen: React.FC = () => {
  
  // Sample fine data
  const fines: FineDetailsProps[] = [
    {
      id: 'F-20250315-001',
      amount: 5000,
      date: 'Mar 15, 2025',
      description: 'Speeding in School Zone',
      location: 'Colombo 07, Main Street',
      officerId: 'PO-732',
      officerName: 'Officer K. Perera',
      status: 'unpaid',
      dueDate: 'Mar 29, 2025',
      violationType: 'Speeding'
    },
    {
      id: 'F-20250310-042',
      amount: 2500,
      date: 'Mar 10, 2025',
      description: 'No Parking Violation',
      location: 'Kandy, Temple Road',
      officerId: 'PO-419',
      officerName: 'Officer M. Silva',
      status: 'unpaid',
      dueDate: 'Mar 24, 2025',
      violationType: 'Parking'
    },
    {
      id: 'F-20250228-127',
      amount: 1500,
      date: 'Feb 28, 2025',
      description: 'Signal Violation',
      location: 'Galle, Marine Drive',
      officerId: 'PO-256',
      officerName: 'Officer A. Fernando',
      status: 'appealed',
      dueDate: 'Mar 14, 2025',
      violationType: 'Traffic Signal'
    },
    {
      id: 'F-20250215-073',
      amount: 3000,
      date: 'Feb 15, 2025',
      description: 'Driving Without License',
      location: 'Colombo 04, Galle Road',
      officerId: 'PO-511',
      officerName: 'Officer R. Wickramasinghe',
      status: 'paid',
      dueDate: 'Mar 01, 2025',
      violationType: 'Documentation'
    }
  ];
  
  // State for filter and expanded fine
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'appealed' | 'paid'>('all');
  const [expandedFineId, setExpandedFineId] = useState<string | null>(null);
  
  // Filter fines based on selected filter
  const filteredFines = filter === 'all' 
    ? fines 
    : fines.filter(fine => fine.status === filter);
  
  return (
    <View style={[styles.container]}>
      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <FilterChip 
          label="All" 
          isActive={filter === 'all'} 
          onPress={() => setFilter('all')} 
        />
        <FilterChip 
          label="Unpaid" 
          isActive={filter === 'unpaid'} 
          onPress={() => setFilter('unpaid')} 
        />
        <FilterChip 
          label="Appealed" 
          isActive={filter === 'appealed'} 
          onPress={() => setFilter('appealed')} 
        />
        <FilterChip 
          label="Paid" 
          isActive={filter === 'paid'} 
          onPress={() => setFilter('paid')} 
        />
      </View>
      
      {/* Fine List */}
      <ScrollView style={styles.finesList}>
        {filteredFines.length > 0 ? (
          filteredFines.map(fine => (
            <FineListItem 
              key={fine.id}
              fine={fine}
              isExpanded={expandedFineId === fine.id}
              onPress={() => setExpandedFineId(expandedFineId === fine.id ? null : fine.id)}
            />
          ))
        ) : (
          <EmptyState message={`No ${filter === 'all' ? '' : filter} fines found`} />
        )}
      </ScrollView>
    </View>
  );
};

export default FinesScreen;
