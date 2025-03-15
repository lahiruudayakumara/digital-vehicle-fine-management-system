import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar } from 'react-native';

// Interface for dynamic user data
interface UserDetails {
  name: string;
  licenseNumber: string;
  outstandingFines: number;
  dueDate: string;
}

const HomeScreen: React.FC = () => {
  // Sample dynamic user data
  const user: UserDetails = {
    name: 'John Doe',
    licenseNumber: '123456789',
    outstandingFines: 150.00,
    dueDate: 'March 25, 2025'
  };

  const handlePayNow = () => {
    // Add payment logic here
    console.log('Payment process initiated');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Section with Logo and Greeting */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/vehicle-fine-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.greeting}>Hello, {user.name.split(' ')[0]}!</Text>
        <Text style={styles.welcomeText}>Welcome to your fine management portal</Text>
      </View>
      
      {/* Card for User Details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Personal Information</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License Number</Text>
            <Text style={styles.infoValue}>{user.licenseNumber}</Text>
          </View>
        </View>
      </View>
      
      {/* Outstanding Fines Card */}
      <View style={styles.finesCard}>
        <View style={[
          styles.finesHeader, 
          { backgroundColor: user.outstandingFines > 0 ? '#FF6B6B' : '#57C79F' }
        ]}>
          <Text style={styles.finesTitle}>Payment Due</Text>
          <Text style={styles.finesAmount}>${user.outstandingFines.toFixed(2)}</Text>
          <Text style={styles.dueDate}>Due by: {user.dueDate}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.payNowButton} 
          onPress={handlePayNow}
          activeOpacity={0.8}
        >
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
      
      {/* Steps Section */}
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsTitle}>How It Works</Text>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review Your Fines</Text>
            <Text style={styles.stepDescription}>Check details of any outstanding fines</Text>
          </View>
        </View>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Make Payment</Text>
            <Text style={styles.stepDescription}>Clear your fines using our secure payment system</Text>
          </View>
        </View>
        
        <View style={styles.stepCard}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get Receipt</Text>
            <Text style={styles.stepDescription}>Receive confirmation and digital receipt instantly</Text>
          </View>
        </View>
      </View>
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
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#3A67F4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  logo: {
    height: 60,
    width: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: '#667085',
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginVertical: 8,
  },
  finesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  finesHeader: {
    padding: 20,
    alignItems: 'center',
  },
  finesTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  finesAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  dueDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  payNowButton: {
    backgroundColor: '#3A67F4',
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 12,
  },
  payNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  stepsContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  stepsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 16,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A67F4',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#667085',
  },
});

export default HomeScreen;