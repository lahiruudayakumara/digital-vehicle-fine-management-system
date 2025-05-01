import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { login, logout } from "@/stores/slices/auth/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AppDispatch } from "@/stores/store";
import { LoginRequest } from "@/types/auth-types";
import { RootState } from "@/stores/reducers";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the error state type
interface FormErrors {
  email?: string; // Optional error message for email
  password?: string; // Optional error message for password
}

export default function LoginScreen() {
  // State to store user credentials
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "JohnDoe", // Default username
    password: "StrongPass123", // Default password
  });

  // State to manage loading state during login
  const [loading, setLoading] = useState(false);

  // Redux dispatch function to trigger actions
  const dispatch = useDispatch<AppDispatch>();
  // Router for navigation
  const router = useRouter();
  // Retrieve token and role from Redux store
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);

  // Function to handle login logic
  const handleLogin = async () => {
    // Check if username and password are provided
    if (!credentials.username || !credentials.password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }
    try {
      setLoading(true); // Set loading state to true
      await dispatch(login(credentials)).unwrap(); // Dispatch login action
    } catch (err: any) {
      // Show error alert if login fails
      Alert.alert(
        "Login Failed",
        "Invalid credentials or something went wrong."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Effect to handle navigation based on token and role
  useEffect(() => {
    if (token) {
      if (role === "RIDER") {
        router.replace("/(tabs)"); // Navigate to rider's dashboard
      } else {
        dispatch(logout()); // Logout if role is not allowed
        Alert.alert(
          "Access Denied",
          "You do not have permission to access this app."
        );
      }
    }
  }, [token, role, router]);

  return (
    <SafeAreaView style={styles.container}>
      {/* App logo */}
      <Image
        source={require("../../assets/images/fine-logo.jpg")}
        style={styles.logo}
      />
      {/* Login title */}
      <Text style={styles.title}>Login</Text>
      {/* Username input field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={credentials.username}
        onChangeText={(text) =>
          setCredentials({ ...credentials, username: text })
        }
        autoCapitalize="none"
      />
      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) =>
          setCredentials({ ...credentials, password: text })
        }
        secureTextEntry
      />
      {/* Login button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles for the login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
