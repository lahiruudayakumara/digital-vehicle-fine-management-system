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
  const role = useSelector((state: RootState) => state.auth.role);

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }
    try {
      setLoading(true);
      await dispatch(login(credentials)).unwrap();
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        "Invalid credentials or something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      if (role === "RIDER") {
        router.replace("/(tabs)");
      } else {
        dispatch(logout());
        Alert.alert(
          "Access Denied",
          "You do not have permission to access this app."
        );
      }
    }
  }, [token, role, router]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/fine-logo.jpg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={credentials.username}
        onChangeText={(text) =>
          setCredentials({ ...credentials, username: text })
        }
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) =>
          setCredentials({ ...credentials, password: text })
        }
        secureTextEntry
      />
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
