// Import the Stack component from expo-router to define navigation structure.
import { Stack } from 'expo-router';

// AuthLayout defines the layout for authentication-related screens.
export default function AuthLayout() {
  return (
    <Stack>
      {/* Splash screen, displayed without a header */}
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      
      {/* Login screen, displayed without a header */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      
      {/* Register screen, displayed without a header */}
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}