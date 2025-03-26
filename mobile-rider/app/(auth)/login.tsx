import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { AppDispatch } from '@/stores/store';
import { LoginRequest } from '@/types/auth-types';
import { RootState } from '@/stores/reducers';
import { login } from '@/stores/auth/auth-actions';
import styles from './loginStyles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// Define the error state type
interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "johnDoe",
    password: "StrongPass123",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }
    try {
      setLoading(true);
      await dispatch(login(credentials)).unwrap();
    } catch (err: any) {
      console.log(err.message);
      Alert.alert("Login Failed", "Invalid credentials or something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      router.replace("/(tabs)");
    }
  }, [token, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
    
      <TextInput
        // style={[styles.input, errors.email ? styles.inputError : null]}
        placeholder="Email"
        value={credentials.username}
        onChangeText={(text) => setCredentials({ ...credentials, username: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {/* {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null} */}
      
      <TextInput
        // style={[styles.input, errors.password ? styles.inputError : null]}
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        secureTextEntry
      />
      {/* {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null} */}
      
      <TouchableOpacity 
        // style={[styles.button, !isFormValid && styles.buttonDisabled]} 
        onPress={handleLogin}
        // disabled={!isFormValid}
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