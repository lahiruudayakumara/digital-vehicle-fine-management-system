import "react-native-reanimated";

import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store } from "@/stores/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { StripeProvider } from "@stripe/stripe-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        // Check if user is logged in
        const token = await SecureStore.getItemAsync("userToken");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.log("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    }

    checkAuth();
  }, []);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Redirect based on auth status
  useEffect(() => {
    if (loaded && authChecked) {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/splash");
      }
    }
  }, [loaded, authChecked, isAuthenticated, router]);

  if (!loaded || !authChecked) {
    return null;
  }

  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51OtQDcKmN4rKDMw5InPOBErEWzcKBY3WiASv9jdwtea3AT7nonP0rRAMzDShwmz3Z6NEAhXl1Ls3jWPjbfp5gOVS00hNEQtC2f">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      </StripeProvider>
    </Provider>
  );
}


// http://192.168.1.14:8082/api/payment/create-token