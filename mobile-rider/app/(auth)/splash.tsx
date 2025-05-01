import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import styles from './splashStyles';

// SplashScreen component serves as the entry point with navigation options for login and registration.
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* App title displayed prominently */}
      <Text style={styles.title}>FineMate - Scan, Fine, and Drive Safe!</Text>
      
      {/* Container for navigation buttons */}
      <View style={styles.buttonContainer}>
        {/* Link to the login screen */}
        <Link href={{ pathname: "/(auth)/login" }} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </Link>
        {/* Link to the registration screen */}
        <Link href={{ pathname: "/(auth)/register" }} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Link>
      </View>
    </View>
  );
}