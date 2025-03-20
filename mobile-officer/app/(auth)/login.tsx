import { Image, StyleSheet, Text, TextInput } from "react-native";

import { AppDispatch } from "@/stores/store";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "@/stores/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      dispatch(login({ token: username }));
      router.replace("/(tabs)");
    } else {
      alert("Please enter username and password");
    }
  };

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
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
