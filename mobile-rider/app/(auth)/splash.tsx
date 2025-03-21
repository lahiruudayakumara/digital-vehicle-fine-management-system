import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';
import styles from './splashStyles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>FineMate - Scan, Fine, and Drive Safe!</Text>
      
      <View style={styles.buttonContainer}>
  <Link href={{ pathname: "/(auth)/login" }} style={styles.button}>
    <Text style={styles.buttonText}>Log In</Text>
  </Link>
  <Link href={{ pathname: "/(auth)/register" }} style={styles.button}>
    <Text style={styles.buttonText}>Register</Text>
  </Link>
</View>
    </View>
  );
}