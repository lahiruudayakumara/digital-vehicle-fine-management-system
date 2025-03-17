import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FC',
    },
    header: {
      padding: 24,
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
      backgroundColor: '#3A67F4',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: '#FFFFFF',
    },
    profileInfo: {
      marginLeft: 16,
      flex: 1,
    },
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    profileId: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)',
      marginTop: 2,
    },
    membershipBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    membershipText: {
      fontSize: 12,
      color: '#FFFFFF',
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    quickActions: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 8,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      backgroundColor: '#3A67F4',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: '#F1F5FE',
    },
    secondaryButtonText: {
      color: '#3A67F4',
      fontSize: 15,
      fontWeight: '600',
    },
    section: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      marginVertical: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 16,
    },
    infoItem: {
      marginBottom: 16,
    },
    infoLabel: {
      fontSize: 14,
      color: '#667085',
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 16,
      color: '#333',
    },
    vehicleSummary: {
      alignItems: 'center',
      padding: 8,
    },
    vehicleCount: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#3A67F4',
    },
    vehicleLabel: {
      fontSize: 16,
      color: '#333',
      marginTop: 8,
    },
    viewDetailsButton: {
      marginTop: 16,
      paddingVertical: 8,
      paddingHorizontal: 20,
      backgroundColor: '#F1F5FE',
      borderRadius: 20,
    },
    viewDetailsText: {
      fontSize: 14,
      color: '#3A67F4',
      fontWeight: '500',
    },
    historyButton: {
      padding: 4,
    },
    historyButtonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    historyButtonText: {
      fontSize: 16,
      color: '#3A67F4',
    },
    chevron: {
      fontSize: 20,
      color: '#3A67F4',
    },
    versionContainer: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    versionText: {
      fontSize: 14,
      color: '#667085',
    },
  });

export default styles;
