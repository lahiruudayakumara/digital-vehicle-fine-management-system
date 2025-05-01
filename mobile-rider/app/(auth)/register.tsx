import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './loginStyles';
import styles from './registerStyles';
import Constants from 'expo-constants';

interface FormErrors {
  fullName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    
    
    // Username validation
    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }
    
    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Get the API base URL from Constants or use a default
      const apiBaseUrl = Constants.expoConfig?.extra?.apiUrl || 'http://192.168.8.101:8082';
      
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          username,
          password,
          role: "RIDER"
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
        throw new Error(errorData.message || 'Registration failed');
      }
      
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully. Please login.",
        [
          { text: "OK", onPress: () => router.replace("/(auth)/login") }
        ]
      );
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) {
              setErrors({ ...errors, fullName: undefined });
            }
          }}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        
        <TextInput
  style={styles.input}
  placeholder="License Number"
  value={email}
  onChangeText={(text) => {
    setEmail(text);  // Changed from setFullName to setEmail
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  }}
  keyboardType="numeric"  // Use numeric keyboard for license numbers
  maxLength={10}  // Limit to 10 characters
/>
{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (errors.username) {
              setErrors({ ...errors, username: undefined });
            }
          }}
          autoCapitalize="none"
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) {
              setErrors({ ...errors, password: undefined });
            }
          }}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) {
              setErrors({ ...errors, confirmPassword: undefined });
            }
          }}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating Account..." : "Register"}
          </Text>
        </TouchableOpacity>
        
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}