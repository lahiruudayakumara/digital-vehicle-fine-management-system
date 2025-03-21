import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Types for our component props
interface FineDetailsProps {
  id: string;
  amount: number;
  date: string;
  description: string;
  location: string;
  officerId: string;
  officerName: string;
  status: "paid" | "unpaid" | "appealed";
  dueDate: string;
  violationType: string;
}

// Fine list item component
const FineListItem: React.FC<{
  fine: FineDetailsProps;
  onPress: () => void;
  isExpanded: boolean;
}> = ({ fine, onPress, isExpanded }) => {
  const router = useRouter();

  // Determine status color and icon name
  let statusColor, statusIconName;
  switch (fine.status) {
    case "paid":
      statusColor = COLORS.success;
      statusIconName = "check";
      break;
    case "appealed":
      statusColor = COLORS.secondary;
      statusIconName = "clock-outline";
      break;
    case "unpaid":
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
          <View
            style={[
              styles.fineStatusIndicator,
              { backgroundColor: statusColor },
            ]}
          >
            <Icon name={statusIconName} size={16} color={COLORS.white} />
          </View>
          <View style={styles.fineCardHeaderInfo}>
            <Text style={styles.fineDescription}>{fine.description}</Text>
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
            <Text style={styles.fineCardDetailValue}>
              {fine.officerName} (ID: {fine.officerId})
            </Text>
          </View>

          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Type:</Text>
            <Text style={styles.fineCardDetailValue}>{fine.violationType}</Text>
          </View>

          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Due Date:</Text>
            <Text
              style={[
                styles.fineCardDetailValue,
                fine.status === "unpaid" && styles.fineCardDetailValueAlert,
              ]}
            >
              {fine.dueDate}
            </Text>
          </View>

          <View style={styles.fineCardDetailRow}>
            <Text style={styles.fineCardDetailLabel}>Status:</Text>
            <View
              style={[
                styles.fineStatusBadge,
                { backgroundColor: statusColor + "20" },
              ]}
            >
              <Text style={[styles.fineStatusText, { color: statusColor }]}>
                {fine.status.charAt(0).toUpperCase() + fine.status.slice(1)}
              </Text>
            </View>
          </View>

          {fine.status === "unpaid" && (
            <View style={styles.fineCardActions}>
              <TouchableOpacity
                style={[
                  styles.fineCardButton,
                  { backgroundColor: COLORS.primary },
                ]}
                activeOpacity={0.8}
                onPress={() => router.replace("/payments/payment")}
              >
                <Text style={styles.fineCardButtonText}>Pay Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.fineCardButton, styles.fineCardButtonOutline]}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.fineCardButtonText, { color: COLORS.primary }]}
                >
                  Appeal
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {fine.status === "appealed" && (
            <View style={styles.fineCardActions}>
              <TouchableOpacity
                style={[
                  styles.fineCardButton,
                  { backgroundColor: COLORS.secondary },
                ]}
                activeOpacity={0.8}
              >
                <Text style={styles.fineCardButtonText}>
                  View Appeal Status
                </Text>
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
        !isActive && { backgroundColor: COLORS.white },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterChipText,
          isActive && { color: COLORS.white },
          !isActive && { color: COLORS.text },
        ]}
      >
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
      <Text style={styles.emptyStateText}>{message}</Text>
    </View>
  );
};

const FinesScreen: React.FC = () => {
  // Sample fine data
  const fines: FineDetailsProps[] = [
    {
      id: "F-20250315-001",
      amount: 5000,
      date: "Mar 15, 2025",
      description: "Speeding in School Zone",
      location: "Colombo 07, Main Street",
      officerId: "PO-732",
      officerName: "Officer K. Perera",
      status: "unpaid",
      dueDate: "Mar 29, 2025",
      violationType: "Speeding",
    },
    {
      id: "F-20250310-042",
      amount: 2500,
      date: "Mar 10, 2025",
      description: "No Parking Violation",
      location: "Kandy, Temple Road",
      officerId: "PO-419",
      officerName: "Officer M. Silva",
      status: "unpaid",
      dueDate: "Mar 24, 2025",
      violationType: "Parking",
    },
    {
      id: "F-20250228-127",
      amount: 1500,
      date: "Feb 28, 2025",
      description: "Signal Violation",
      location: "Galle, Marine Drive",
      officerId: "PO-256",
      officerName: "Officer A. Fernando",
      status: "appealed",
      dueDate: "Mar 14, 2025",
      violationType: "Traffic Signal",
    },
    {
      id: "F-20250215-073",
      amount: 3000,
      date: "Feb 15, 2025",
      description: "Driving Without License",
      location: "Colombo 04, Galle Road",
      officerId: "PO-511",
      officerName: "Officer R. Wickramasinghe",
      status: "paid",
      dueDate: "Mar 01, 2025",
      violationType: "Documentation",
    },
  ];

  // State for filter and expanded fine
  const [filter, setFilter] = useState<"all" | "unpaid" | "appealed" | "paid">(
    "all"
  );
  const [expandedFineId, setExpandedFineId] = useState<string | null>(null);

  // Filter fines based on selected filter
  const filteredFines =
    filter === "all" ? fines : fines.filter((fine) => fine.status === filter);

  return (
    <View style={styles.container}>
      {/* Filter Chips in a fixed height container */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          <FilterChip
            label="All"
            isActive={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <FilterChip
            label="Unpaid"
            isActive={filter === "unpaid"}
            onPress={() => setFilter("unpaid")}
          />
          <FilterChip
            label="Appealed"
            isActive={filter === "appealed"}
            onPress={() => setFilter("appealed")}
          />
          <FilterChip
            label="Paid"
            isActive={filter === "paid"}
            onPress={() => setFilter("paid")}
          />
        </ScrollView>
      </View>

      {/* Fine List in flexible space with contentContainerStyle */}
      <ScrollView
        style={styles.finesList}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
        {filteredFines.length > 0 ? (
          filteredFines.map((fine) => (
            <FineListItem
              key={fine.id}
              fine={fine}
              isExpanded={expandedFineId === fine.id}
              onPress={() =>
                setExpandedFineId(expandedFineId === fine.id ? null : fine.id)
              }
            />
          ))
        ) : (
          <EmptyState
            message={`No ${filter === "all" ? "" : filter} fines found`}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default FinesScreen;

 const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  darkMode: '#111827', // Dark Gray
  text: '#1F2937', // Dark text for light mode
  textLight: '#F9FAFB', // Light text for dark mode
};

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  finesList: {
    flex: 1,
    padding: 16,
    
  },
  fineCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  fineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  fineCardHeaderContent: {
    flexDirection: 'row',
    flex: 1,
  },
  fineStatusIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fineCardHeaderInfo: {
    flex: 1,
  },
  fineDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  fineMetaInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  fineCardDetail: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  fineCardDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fineCardDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  fineCardDetailValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 2,
    textAlign: 'right',
    fontWeight: '500',
  },
  fineCardDetailValueAlert: {
    color: COLORS.accent,
  },
  fineStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: COLORS.success + '20', // 20% opacity
  },
  fineStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.success,
  },
  fineCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  fineCardButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  fineCardButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  fineCardButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 48,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  
  // Updated filter chip styles
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginVertical: 4,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipInactive: {
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
  },
  filterChipDark: {
    backgroundColor: 'rgba(55, 65, 81, 0.7)',
    borderColor: 'rgba(75, 85, 99, 1)',
  },
  filterChipIconContainer: {
    marginRight: 4,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  filterChipTextInactive: {
    color: COLORS.text,
  },
  filterChipTextDark: {
    color: '#E5E7EB',
  },
  filterChipCount: {
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 4,
  },
  filterChipCountActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterChipCountInactive: {
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
  },
  filterChipCountDark: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
  },
  filterChipCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterChipCountTextActive: {
    color: COLORS.white,
  },
  filterChipCountTextInactive: {
    color: COLORS.text,
  },
  filterContainer: {
    flexDirection: 'row',  // Align items horizontally
    padding: 10,    // Add some space below the chips
    paddingHorizontal: 10, // Optional: Adds some left & right spacing
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});