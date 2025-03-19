import { StyleSheet } from 'react-native';

// Colors based on your specification
export const COLORS = {
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
    // Add these styles to your existing IndexStyles.js file

headerRight: {
  flexDirection: 'row',
  alignItems: 'center',
},
// Add these styles to your existing IndexStyles.js file

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
    // Add these to your existing styles in IndexStyles.js

profileImageContainer: {
  width: 50,
  height: 50,
  borderRadius: 25,
  overflow: 'hidden',
  backgroundColor: COLORS.white, // Fallback background color
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

  export default styles;
