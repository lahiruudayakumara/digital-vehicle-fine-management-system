import { Button, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { AppDispatch } from '@/stores/store';
import React, { useEffect, useState } from 'react';
import { logout } from '@/stores/slices/auth/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import axios from 'axios';

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get auth token from Redux store (assuming you have this in your auth state)
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://192.168.8.101:8082/api/riders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Map the API response to our UserProfile interface
        const userData = response.data;
        
        // Adjust this mapping based on the actual API response structure
        const userProfile: UserProfile = {
          id: userData.id || 'N/A',
          name: userData.name || 'N/A',
          email: userData.email || 'N/A',
          phone: userData.phone || 'N/A',
          licenseNumber: userData.licenseNumber || 'N/A',
          licenseType: userData.licenseType || 'N/A',
          expiryDate: userData.expiryDate || 'N/A',
          avatarUrl: userData.avatarUrl || '@/assets/images/avatar.png',
          vehicleCount: userData.vehicleCount || 0,
          joinedDate: userData.joinedDate || 'N/A',
        };
        
        setProfile(userProfile);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

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

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/(auth)/login");
  }

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Show error state
  if (error || !profile) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error || 'Unable to load profile'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => setLoading(true)} // This will trigger the useEffect again
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          <Button title="Logout" onPress={handleLogout} />
          <Text style={styles.historyButtonText}></Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  text: '#1F2937', // Dark text for light mode
  error: '#DC2626', // Red for errors
};

const styles = StyleSheet.create({
  // ...existing styles...
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  // Keep all the existing styles below...
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: COLORS.primary,
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
    borderColor: COLORS.white,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
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
    color: COLORS.white,
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
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: COLORS.background,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.white,
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
    color: COLORS.text,
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
  },
  vehicleSummary: {
    alignItems: 'center',
    padding: 8,
  },
  vehicleCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  vehicleLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 8,
  },
  viewDetailsButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 14,
    color: COLORS.primary,
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
    color: COLORS.primary,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.primary,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
  },
});