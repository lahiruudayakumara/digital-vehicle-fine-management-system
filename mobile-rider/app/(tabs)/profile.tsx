//profile.tsx

import { Alert, Button, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import XLSX from 'xlsx';

import { AppDispatch } from '@/stores/store';
import React from 'react';
import { logout } from '@/stores/slices/auth/auth-actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';

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
  // Mock user data
  const profile: UserProfile = {
    id: 'USR123456',
    name: 'Malmi Withanage',
    email: 'malmi@gmail.com',
    phone: '+94 77 123 65 41',
    licenseNumber: '1234567890',
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
  
  const handleDownloadProfile = async () => {
    try {
      // First, ask for permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need permission to save files to your device.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Convert profile object to worksheet data
      const wsData = [
        ['Profile Information'],
        ['ID', profile.id],
        ['Name', profile.name],
        ['Email', profile.email],
        ['Phone', profile.phone],
        ['License Number', profile.licenseNumber],
        ['License Type', profile.licenseType],
        ['Expiry Date', profile.expiryDate],
        ['Vehicles Registered', profile.vehicleCount.toString()],
        ['Joined Date', profile.joinedDate],
      ];

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Profile');
      
      // Generate Excel file
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      
      // Create a meaningful filename with date
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const fileName = `profile_${profile.id}_${dateStr}.xlsx`;
      
      // First save to cache directory (which is always writable)
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      console.log('Temp file created at:', fileUri);
      
      if (Platform.OS === 'android') {
        try {
          // Save the file to the media library
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          console.log('Asset created:', asset);
          
          // Create a Downloads album if it doesn't exist and add the asset to it
          try {
            const album = await MediaLibrary.getAlbumAsync('Downloads');
            
            if (album === null) {
              await MediaLibrary.createAlbumAsync('Downloads', asset, false);
              console.log('Created new Downloads album with asset');
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
              console.log('Added asset to existing Downloads album');
            }
            
            Alert.alert(
              'Success',
              `File saved to your device's Downloads folder.`,
              [{ text: 'OK' }]
            );
          } catch (albumError) {
            console.error('Album creation error:', albumError);
            
            // If we can't create/use an album, the file is still saved to the media library
            Alert.alert(
              'Success',
              `File saved to your device's media library.`,
              [{ text: 'OK' }]
            );
          }
        } catch (error) {
          console.error('Android media library error:', error);
          
          // Fall back to sharing if media library fails
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri, {
              mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              dialogTitle: 'Download Profile Information',
              UTI: 'com.microsoft.excel.xlsx'
            });
            
            Alert.alert(
              'Alternative Method',
              'Please use the "Save to Device" option in the sharing menu.',
              [{ text: 'OK' }]
            );
          } else {
            throw new Error('Unable to save or share file');
          }
        }
      } else {
        // iOS approach
        const iosFileUri = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({
          from: fileUri,
          to: iosFileUri
        });
        
        if (await Sharing.isAvailableAsync()) {
          const userChoice = await new Promise<boolean>((resolve) => {
            Alert.alert(
              'File saved successfully!',
              'Would you like to share it now?',
              [
                { text: 'No', onPress: () => resolve(false) },
                { text: 'Yes', onPress: () => resolve(true) }
              ]
            );
          });
          
          if (userChoice) {
            await Sharing.shareAsync(iosFileUri, {
              mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              dialogTitle: 'Share Profile Information',
              UTI: 'com.microsoft.excel.xlsx'
            });
          }
        } else {
          Alert.alert('Success', `File saved in your app's documents folder.`);
        }
      }
      
      console.log('Profile information processed successfully');
    } catch (error) {
      console.error('Error saving profile information:', error);
      Alert.alert('Error', 'Failed to save profile information. Please try again.');
    }
  };

  const handleViewHistory = () => {
    // Navigate to transactions tab
    router.push('/transactions');
  };

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/(auth)/login");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleDownloadProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Download Profile Information</Text>
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

const COLORS = {
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
    backgroundColor: COLORS.background,
  },
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