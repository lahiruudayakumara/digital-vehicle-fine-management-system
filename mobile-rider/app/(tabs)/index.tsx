import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import from react-native-vector-icons
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';

// Types for our component props
interface NotificationProps {
  title: string;
  description: string;
  date: string;
  isUrgent?: boolean;
}

interface FineCardProps {
  amount: number;
  dueDate: string;
  description: string;
  isPaid: boolean;
}

interface UserProfileProps {
  userName: string;
  profileImage?: string;
  onSettingsPress: () => void;
}

// Notification component
const Notification: React.FC<NotificationProps> = ({ title, description, date, isUrgent }) => {
  return (
    <View style={[ 
      styles.notificationCard,
      { backgroundColor: COLORS.white },
      isUrgent && { borderLeftColor: COLORS.accent, borderLeftWidth: 4 }
    ]}>
      <View style={styles.notificationIconContainer}>
        {isUrgent ? 
          <Icon name="exclamation-triangle" size={24} color={COLORS.accent} /> : 
          <Icon name="bell" size={24} color={COLORS.primary} />
        }
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
        <Text style={styles.notificationDate}>{date}</Text>
      </View>
    </View>
  );
};

// Fine summary card component
const FineSummaryCard: React.FC<FineCardProps> = ({ amount, dueDate, description, isPaid }) => {
  return (
    <View style={[ 
      styles.fineCard,
      { backgroundColor: COLORS.white }
    ]}>
      <View style={[ 
        styles.fineStatusIndicator, 
        { backgroundColor: isPaid ? COLORS.success : COLORS.accent }
      ]} />
      <View style={styles.fineContent}>
        <Text style={styles.fineAmount}>Rs. {amount.toFixed(2)}</Text>
        <Text style={styles.fineDescription}>{description}</Text>
        <Text style={[ 
          styles.fineDueDate, 
          !isPaid && styles.fineOverdue
        ]}>
          {isPaid ? 'Paid' : `Due: ${dueDate}`}
        </Text>
      </View>
    </View>
  );
};

// Quick action button component
const QuickActionButton: React.FC<{ title: string, icon: React.ReactNode, onPress: () => void }> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity 
      style={[ 
        styles.quickActionButton,
        { backgroundColor: COLORS.white }
      ]} 
      onPress={onPress}
    >
      <View style={styles.quickActionIconContainer}>
        {icon}
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );
};

// User profile component with settings button
const UserProfileHeader: React.FC<UserProfileProps> = ({ userName, profileImage, onSettingsPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Left side - Profile image */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileIcon, { backgroundColor: COLORS.primary }]}> 
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
      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={onSettingsPress}
      >
        <Icon name="cog" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const router = useRouter();
  
  const navigateToSettings = () => {
    router.push('/other/settings');
  };
  
  const navigateToQRCode = () => {
    // Navigate to the qrcode tab
    router.push('/qrcode');
  };

  const openLegalResources = async () => {
    // The URL to the Intercom help center
    const url = "https://intercom.help/finemate/en";
    
    // Check if the URL can be opened
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.error("Cannot open URL:", url);
      // You might want to show an alert here
    }
  };


  return (
    <ScrollView 
      style={[ 
        styles.container, 
        { backgroundColor: COLORS.background }
      ]}
    >
      {/* Welcome Header with Settings Button */}
      <UserProfileHeader 
        userName="Malmi Withanage" 
        profileImage="https://pub-24990f2f31744f558e74dd8d73328de5.r2.dev/woman-avatar-profile-vector-21372074.jpg" 
        onSettingsPress={navigateToSettings}
      />

      {/* Fine Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Fines</Text>
        
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
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Fines</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.quickActionsRow}>
          <QuickActionButton 
            title="My QR Code" 
            icon={<Icon name="qrcode" size={24} color={COLORS.primary} />} 
            onPress={navigateToQRCode}
          />
          <QuickActionButton 
            title="Help & Support" 
            icon={<Icon name="question-circle" size={24} color={COLORS.primary} />} 
            onPress={openLegalResources}  
          />
        </View>
      </View>

      {/* Recent Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Notifications</Text>
        
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
    padding: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 12,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  fineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#1F2937',
  },
  fineDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  fineDueDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  fineOverdue: {
    color: '#FCA5A5',
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  quickActionIconContainer: {
    marginRight: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewAllButton: {
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
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
    fontWeight: '600',
    color: '#1F2937',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  notificationDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});