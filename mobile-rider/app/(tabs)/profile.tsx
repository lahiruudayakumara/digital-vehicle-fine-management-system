import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';

// Define types for user profile
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseType: string;
  expiryDate: string;
  avatarUrl: string;
  vehicleCount: number;
  joinedDate: string;
}

const ProfileScreen: React.FC = () => {
  // Mock user data
  const profile: UserProfile = {
    id: 'USR123456',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    licenseNumber: '123456789',
    licenseType: 'Class C',
    expiryDate: 'May 15, 2027',
    avatarUrl: '@/assets/images/avatar.png', // You can replace with require(...) if needed
    vehicleCount: 2,
    joinedDate: 'Jan 2020',
  };

  // Action handlers
  const handleEditProfile = () => {
    console.log('Navigate to edit profile');
  };

  const handleViewVehicles = () => {
    console.log('Navigate to vehicles list');
  };

  const handleViewHistory = () => {
    console.log('Navigate to payment history');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with profile summary */}
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Image
            source={require('@/assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileId}>ID: {profile.id}</Text>
            <View style={styles.membershipBadge}>
              <Text style={styles.membershipText}>Member since {profile.joinedDate}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleViewVehicles}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>View Vehicles</Text>
          </TouchableOpacity>
        </View>
        
        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{profile.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>License Number</Text>
            <Text style={styles.infoValue}>{profile.licenseNumber}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>License Type</Text>
            <Text style={styles.infoValue}>{profile.licenseType}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Expiry Date</Text>
            <Text style={styles.infoValue}>{profile.expiryDate}</Text>
          </View>
        </View>
        
        {/* Vehicle Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Summary</Text>
          
          <View style={styles.vehicleSummary}>
            <Text style={styles.vehicleCount}>{profile.vehicleCount}</Text>
            <Text style={styles.vehicleLabel}>
              {profile.vehicleCount === 1 ? 'Vehicle' : 'Vehicles'} Registered
            </Text>
            
            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={handleViewVehicles}
              activeOpacity={0.7}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          
          <TouchableOpacity 
            style={styles.historyButton}
            onPress={handleViewHistory}
            activeOpacity={0.7}
          >
            <View style={styles.historyButtonContent}>
              <Text style={styles.historyButtonText}>View Payment History</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

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

export default ProfileScreen;