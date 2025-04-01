import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/styles/color";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  fineId: string;
  status: "completed" | "pending" | "failed";
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  let statusColor;
  if (transaction.status === "completed") {
    statusColor = COLORS.success;
  } else if (transaction.status === "pending") {
    statusColor = COLORS.secondary;
  } else {
    statusColor = COLORS.accent;
  }

  let statusIcon;
  if (transaction.status === "completed") {
    statusIcon = "check-circle";
  } else if (transaction.status === "pending") {
    statusIcon = "calendar-times-o";
  } else {
    statusIcon = "times-circle";
  }

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>{transaction.description}</Text>
          <Text style={styles.transactionMeta}>
            {transaction.date} • Fine ID: {transaction.fineId}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={styles.transactionAmountText}>
            Rs. {transaction.amount.toFixed(2)}
          </Text>
          <View style={[styles.transactionStatus, { backgroundColor: statusColor + "20" }]}>
            <Icon name={statusIcon} size={24} color={statusColor} />
            <Text style={[styles.transactionStatusText, { color: statusColor }]}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const TransactionScreen: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: "T-20250315-001",
      date: "Mar 15, 2025",
      amount: 5000,
      description: "Fine Payment - Speeding in School Zone",
      fineId: "F-20250315-001",
      status: "completed",
    },
    {
      id: "T-20250310-042",
      date: "Mar 10, 2025",
      amount: 2500,
      description: "Fine Payment - No Parking Violation",
      fineId: "F-20250310-042",
      status: "pending",
    },
    {
      id: "T-20250228-127",
      date: "Feb 28, 2025",
      amount: 1500,
      description: "Fine Payment - Signal Violation",
      fineId: "F-20250228-127",
      status: "failed",
    },
    {
      id: "T-20250215-073",
      date: "Feb 15, 2025",
      amount: 3000,
      description: "Fine Payment - Driving Without License",
      fineId: "F-20250215-073",
      status: "completed",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.transactionHistory}>
        <View style={styles.transactionHistoryHeader}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Icon name="chevron-down" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 16,
  },
  transactionHistory: {
    marginBottom: 16,
  },
  transactionHistoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 4,
  },
  transactionItem: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  transactionAmountText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    width: 90,
    paddingVertical: 4,
    borderRadius: 5,
  },
  transactionStatusText: {
    fontSize: 10,
    fontWeight: "500",
    marginLeft: 4,
  },
});

export default TransactionScreen;