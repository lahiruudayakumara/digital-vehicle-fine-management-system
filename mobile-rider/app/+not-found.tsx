import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// This is the NotFoundScreen component, displayed when a user navigates to a non-existent route.
export default function NotFoundScreen() {
  return (
    <>
      {/* Set the screen title to "Oops!" */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      {/* ThemedView provides a styled container for the content */}
      <ThemedView style={styles.container}>
        {/* Display a message indicating the screen doesn't exist */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        {/* Link to navigate back to the home screen */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Styles for the NotFoundScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full height of the screen
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    padding: 20, // Add padding around the content
  },
  link: {
    marginTop: 15, // Add space above the link
    paddingVertical: 15, // Add vertical padding inside the link
  },
});
