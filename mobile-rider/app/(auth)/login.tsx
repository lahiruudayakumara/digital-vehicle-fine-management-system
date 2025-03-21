import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import styles from './loginStyles';

// Define the error state type
interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('Password123!');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  
  // Validate form inputs
  useEffect(() => {
    validateForm();
  }, [email, password]);
  
  const validateForm = () => {
    let newErrors: FormErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };
  
  const handleLogin = () => {
    if (!isFormValid) {
      Alert.alert('Invalid Form', 'Please fix the errors in the form');
      return;
    }
    
    // Simulate authentication
    if (email === 'demo@example.com' && password === 'Password123!') {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
    
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      
      <TextInput
        style={[styles.input, errors.email ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      
      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      
      <TouchableOpacity 
        style={[styles.button, !isFormValid && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      
      <View style={styles.helpContainer}>
        <Link href={{ pathname: "/(auth)/register" }} style={styles.link}>
          <Text>Forgot Password?</Text>
        </Link>
        
        <Link href={{ pathname: "/(auth)/register" }} style={styles.link}>
          <Text>Don't have an account? Register</Text>
        </Link>
      </View>
      
      <View style={styles.demoInfoContainer}>
        <Text style={styles.demoInfoText}>Demo credentials:</Text>
        <Text style={styles.demoInfoText}>Email: demo@example.com</Text>
        <Text style={styles.demoInfoText}>Password: Password123!</Text>
      </View>
    </View>
  );
}