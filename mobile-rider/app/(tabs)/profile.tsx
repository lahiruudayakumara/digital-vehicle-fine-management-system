//profile.tsx

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import styles from './profileStyles';


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
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{profile.name}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ID</Text>
            <Text style={styles.infoValue}>{profile.id}</Text>
          </View>

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

export default ProfileScreen;