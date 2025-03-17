import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import from react-native-vector-icons
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

// Notification component
const Notification: React.FC<NotificationProps> = ({ title, description, date, isUrgent }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <View style={[ 
      styles.notificationCard, 
      isDarkMode ? { backgroundColor: '#1F2937' } : { backgroundColor: COLORS.white },
      isUrgent && { borderLeftColor: COLORS.accent, borderLeftWidth: 4 }
    ]}>
      <View style={styles.notificationIconContainer}>
        {isUrgent ? 
          <Icon name="exclamation-triangle" size={24} color={COLORS.accent} /> : 
          <Icon name="bell" size={24} color={COLORS.primary} />
        }
      </View>
      <View style={styles.notificationContent}>
        <Text style={[ 
          styles.notificationTitle, 
          isDarkMode && { color: COLORS.textLight } 
        ]}>{title}</Text>
        <Text style={[ 
          styles.notificationDescription, 
          isDarkMode && { color: '#9CA3AF' } 
        ]}>{description}</Text>
        <Text style={styles.notificationDate}>{date}</Text>
      </View>
    </View>
  );
};

// Fine summary card component
const FineSummaryCard: React.FC<FineCardProps> = ({ amount, dueDate, description, isPaid }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <View style={[ 
      styles.fineCard, 
      isDarkMode ? { backgroundColor: '#1F2937' } : { backgroundColor: COLORS.white }
    ]}>
      <View style={[ 
        styles.fineStatusIndicator, 
        { backgroundColor: isPaid ? COLORS.success : COLORS.accent }
      ]} />
      <View style={styles.fineContent}>
        <Text style={[ 
          styles.fineAmount, 
          isDarkMode && { color: COLORS.textLight } 
        ]}>Rs. {amount.toFixed(2)}</Text>
        <Text style={[ 
          styles.fineDescription, 
          isDarkMode && { color: '#9CA3AF' } 
        ]}>{description}</Text>
        <Text style={[ 
          styles.fineDueDate, 
          !isPaid && styles.fineOverdue, 
          isDarkMode && !isPaid && { color: '#FCA5A5' }
        ]}>
          {isPaid ? 'Paid' : `Due: ${dueDate}`}
        </Text>
      </View>
    </View>
  );
};

// Quick action button component
const QuickActionButton: React.FC<{ title: string, icon: React.ReactNode, onPress: () => void }> = ({ title, icon, onPress }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <TouchableOpacity 
      style={[ 
        styles.quickActionButton, 
        isDarkMode ? { backgroundColor: '#374151' } : { backgroundColor: COLORS.white }
      ]} 
      onPress={onPress}
    >
      <View style={styles.quickActionIconContainer}>
        {icon}
      </View>
      <Text style={[ 
        styles.quickActionText, 
        isDarkMode && { color: COLORS.textLight } 
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <ScrollView 
      style={[ 
        styles.container, 
        { backgroundColor: isDarkMode ? COLORS.darkMode : COLORS.background }
      ]}
    >
      {/* Welcome Header */}
      <View style={styles.header}>
        <View>
          <Text style={[ 
            styles.welcomeText, 
            isDarkMode && { color: COLORS.textLight } 
          ]}>Welcome back,</Text>
          <Text style={[ 
            styles.userName, 
            isDarkMode && { color: COLORS.textLight } 
          ]}>John Doe</Text>
        </View>
        <View style={[ 
          styles.profileIcon, 
          isDarkMode ? { backgroundColor: '#374151' } : { backgroundColor: COLORS.primary }
        ]}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>
      </View>

      {/* Fine Summary */}
      <View style={styles.section}>
        <Text style={[ 
          styles.sectionTitle, 
          isDarkMode && { color: COLORS.textLight } 
        ]}>Pending Fines</Text>
        
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
        <Text style={[ 
          styles.sectionTitle, 
          isDarkMode && { color: COLORS.textLight } 
        ]}>Quick Actions</Text>
        
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
        <Text style={[ 
          styles.sectionTitle, 
          isDarkMode && { color: COLORS.textLight } 
        ]}>Recent Notifications</Text>
        
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
