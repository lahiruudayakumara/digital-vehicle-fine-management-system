// Import necessary libraries and components
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import from react-native-vector-icons
import { useRouter } from "expo-router";

// Define types for component props
interface NotificationProps {
  title: string; // Title of the notification
  description: string; // Description of the notification
  date: string; // Date of the notification
  isUrgent?: boolean; // Optional flag for urgent notifications
}

interface FineCardProps {
  amount: number; // Fine amount
  dueDate: string; // Due date for the fine
  description: string; // Description of the fine
  isPaid: boolean; // Payment status of the fine
}

interface UserProfileProps {
  userName: string; // Name of the user
  profileImage?: string; // Optional profile image URL
  onSettingsPress: () => void; // Callback for settings button press
}

// Notification component to display individual notifications
const Notification: React.FC<NotificationProps> = ({
  title,
  description,
  date,
  isUrgent,
}) => {
  return (
    <View
      style={[
        styles.notificationCard,
        { backgroundColor: COLORS.white },
        isUrgent && { borderLeftColor: COLORS.accent, borderLeftWidth: 4 },
      ]}
    >
      <View style={styles.notificationIconContainer}>
        {isUrgent ? (
          <Icon name="exclamation-triangle" size={24} color={COLORS.accent} />
        ) : (
          <Icon name="bell" size={24} color={COLORS.primary} />
        )}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
        <Text style={styles.notificationDate}>{date}</Text>
      </View>
    </View>
  );
};

// Fine summary card component to display fine details
const FineSummaryCard: React.FC<FineCardProps> = ({
  amount,
  dueDate,
  description,
  isPaid,
}) => {
  return (
    <View style={[styles.fineCard, { backgroundColor: COLORS.white }]}>
      <View
        style={[
          styles.fineStatusIndicator,
          { backgroundColor: isPaid ? COLORS.success : COLORS.accent },
        ]}
      />
      <View style={styles.fineContent}>
        <Text style={styles.fineAmount}>Rs. {amount.toFixed(2)}</Text>
        <Text style={styles.fineDescription}>{description}</Text>
        <Text style={[styles.fineDueDate, !isPaid && styles.fineOverdue]}>
          {isPaid ? "Paid" : `Due: ${dueDate}`}
        </Text>
      </View>
    </View>
  );
};

// Quick action button component for user actions
const QuickActionButton: React.FC<{
  title: string; // Button title
  icon: React.ReactNode; // Icon for the button
  onPress: () => void; // Callback for button press
}> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.quickActionButton, { backgroundColor: COLORS.white }]}
      onPress={onPress}
    >
      <View style={styles.quickActionIconContainer}>{icon}</View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );
};

// User profile header component with a settings button
const UserProfileHeader: React.FC<UserProfileProps> = ({
  userName,
  profileImage,
  onSettingsPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left side - Profile image and user info */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View
              style={[styles.profileIcon, { backgroundColor: COLORS.primary }]}
            >
              <Text style={styles.profileInitials}>{userName.charAt(0)}</Text>
            </View>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>

      {/* Right side - Settings button */}
      <TouchableOpacity style={styles.settingsButton} onPress={onSettingsPress}>
        <Icon name="cog" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

// Main HomeScreen component
const HomeScreen: React.FC = () => {
  const router = useRouter();

  // Navigate to settings screen
  const navigateToSettings = () => {
    router.push("/other/settings");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: COLORS.background }]}
    >
      {/* Welcome Header with Settings Button */}
      <UserProfileHeader
        userName="Oliver Hayes"
        profileImage="https://pub-24990f2f31744f558e74dd8d73328de5.r2.dev/20597.jpg"
        onSettingsPress={navigateToSettings}
      />

      {/* Fine Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Fines</Text>

        {/* List of fine summary cards */}
        <FineSummaryCard
          amount={5000}
          dueDate="Mar 25, 2025"
          description="Speeding in School Zone"
          isPaid={false}
        />
        <FineSummaryCard
          amount={2500}
          dueDate="Apr 02, 2025"
          description="No Parking Violation"
          isPaid={false}
        />
        <FineSummaryCard
          amount={1500}
          dueDate="Mar 05, 2025"
          description="Signal Violation"
          isPaid={true}
        />

        {/* View all fines button */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Fines</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.quickActionsRow}>
          <QuickActionButton
            title="Show QR"
            icon={<Icon name="qrcode" size={24} color={COLORS.primary} />}
            onPress={() => {}}
          />
          <QuickActionButton
            title="Legal Resources"
            icon={<Icon name="book" size={24} color={COLORS.primary} />}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Recent Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Notifications</Text>

        {/* List of notifications */}
        <Notification
          title="New Fine Issued"
          description="You have received a new fine for speeding in a school zone."
          date="Today, 10:32 AM"
          isUrgent={true}
        />
        <Notification
          title="Payment Reminder"
          description="Your fine payment is due in 3 days. Avoid additional penalties by paying on time."
          date="Yesterday, 5:45 PM"
          isUrgent={true}
        />
        <Notification
          title="QR Code Generated"
          description="Your license QR code has been successfully generated."
          date="Mar 15, 2025"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

// Define color palette for the app
const COLORS = {
  primary: "#1E3A8A", // Deep Blue
  secondary: "#FACC15", // Bright Yellow
  accent: "#DC2626", // Traffic Red
  background: "#F3F4F6", // Light Gray
  white: "#FFFFFF",
  success: "#16A34A", // Green
  darkMode: "#111827", // Dark Gray
  text: "#1F2937", // Dark text for light mode
  textLight: "#F9FAFB", // Light text for dark mode
};

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  // Add these styles to your existing IndexStyles.js file

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Add these styles to your existing IndexStyles.js file

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 12,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
  },
  // Add these to your existing styles in IndexStyles.js

  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: COLORS.white, // Fallback background color
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  welcomeText: {
    fontSize: 16,
    color: "#6B7280",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F2937",
  },
  fineCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  fineStatusIndicator: {
    width: 8,
    height: 50,
    marginRight: 16,
    borderRadius: 4,
  },
  fineContent: {
    flex: 1,
  },
  fineAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  fineDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  fineDueDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  fineOverdue: {
    color: "#FCA5A5",
  },
  quickActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  quickActionIconContainer: {
    marginRight: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  quickActionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewAllButton: {
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  notificationIconContainer: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  notificationDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
