import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import from react-native-vector-icons
import { useRouter } from 'expo-router';
import styles, {COLORS} from '../IndexStyles';

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
    router.push('/(other)/settings');
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
        userName="Oliver Hayes" 
        profileImage="https://pub-24990f2f31744f558e74dd8d73328de5.r2.dev/20597.jpg" 
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