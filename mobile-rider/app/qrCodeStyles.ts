import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  text: '#1F2937', // Dark text for light mode
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: COLORS.background,
    },
    qrContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    qrCodeWrapper: {
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      // Elevation for Android
      elevation: 5,
    },
    qrCodePlaceholder: {
      alignItems: 'center',
    },
    licenseNumber: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    noQrCodePlaceholder: {
      alignItems: 'center',
    },
    noQrCodeText: {
      marginTop: 10,
      fontSize: 16,
      color: COLORS.accent,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
      padding: 10,
      // Shadow for action buttons
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
      // Shadow for buttons
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
    },
    actionButtonText: {
      color: COLORS.white,
      fontSize: 16,
      marginLeft: 8,
    },
  });

export default styles;
