import { Alert, Image, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AppDispatch } from "@/stores/store";
import Button from "@/components/common/Button";
import { LoginRequest } from "@/types/auth-types";
import { RootState } from "@/stores/reducers";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "@/stores/slices/auth/auth-actions";
import { useRouter } from "expo-router";

export default function Login() {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
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
        onChangeText={(text) => setCredentials({ ...credentials, username: text })}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        secureTextEntry
      />
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
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
});
