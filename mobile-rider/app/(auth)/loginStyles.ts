import { StyleSheet } from 'react-native';

// Define a color palette for consistent styling across the app
export const COLORS = {
  primary: '#1E3A8A', // Deep Blue for primary buttons and highlights
  secondary: '#FACC15', // Bright Yellow for secondary elements
  accent: '#DC2626', // Traffic Red for error messages or warnings
  background: '#F3F4F6', // Light Gray for background
  white: '#FFFFFF', // White for text or backgrounds
  success: '#16A34A', // Green for success messages
  darkMode: '#111827', // Dark Gray for dark mode backgrounds
  text: '#1F2937', // Dark text for light mode
  textLight: '#F9FAFB', // Light text for dark mode
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Set the background color for the login screen
    padding: 24, // Add padding around the content
    justifyContent: 'center', // Center the content vertically
  },
  inputError: {
    borderColor: 'red', // Highlight input fields with errors in red
  },
  buttonDisabled: {
    backgroundColor: '#cccccc', // Gray out disabled buttons
  },
  helpContainer: {
    marginTop: 15, // Add spacing above the help section
    alignItems: 'center', // Center align the help content
    gap: 10, // Add spacing between child elements
  },
  demoInfoContainer: {
    marginTop: 30, // Add spacing above the demo info section
    padding: 15, // Add padding inside the container
    backgroundColor: '#f0f0f0', // Light gray background for the demo info
    borderRadius: 5, // Round the corners of the container
  },
  demoInfoText: {
    fontSize: 12, // Small font size for demo info text
    color: '#666', // Gray color for the text
  },
  title: {
    fontSize: 28, // Large font size for the title
    fontWeight: 'bold', // Make the title bold
    color: COLORS.text, // Use the primary text color
    marginBottom: 32, // Add spacing below the title
    textAlign: 'center', // Center align the title
  },
  input: {
    backgroundColor: COLORS.white, // White background for input fields
    borderRadius: 8, // Round the corners of the input fields
    padding: 16, // Add padding inside the input fields
    marginBottom: 16, // Add spacing below each input field
    fontSize: 16, // Set font size for input text
    color: COLORS.text, // Use the primary text color
    shadowColor: '#000', // Add shadow for iOS
    shadowOpacity: 0.05, // Set shadow opacity
    shadowRadius: 3, // Set shadow radius
    elevation: 2, // Add elevation for Android
  },
  button: {
    backgroundColor: COLORS.primary, // Use the primary color for buttons
    borderRadius: 8, // Round the corners of the button
    padding: 16, // Add padding inside the button
    alignItems: 'center', // Center align the button text
    marginTop: 8, // Add spacing above the button
    marginBottom: 24, // Add spacing below the button
    shadowColor: '#000', // Add shadow for iOS
    shadowOpacity: 0.1, // Set shadow opacity
    shadowRadius: 5, // Set shadow radius
    elevation: 5, // Add elevation for Android
  },
  buttonText: {
    color: COLORS.white, // Use white color for button text
    fontSize: 16, // Set font size for button text
    fontWeight: '600', // Make the button text semi-bold
  },
  link: {
    alignSelf: 'center', // Center align the link
    padding: 8, // Add padding around the link
  },
  linkText: {
    color: COLORS.primary, // Use the primary color for links
    fontSize: 14, // Set font size for link text
    fontWeight: '500', // Make the link text medium weight
  },
  errorText: {
    color: COLORS.accent, // Use the accent color for error messages
    marginBottom: 16, // Add spacing below the error text
    fontSize: 14, // Set font size for error text
  },
});

export default loginStyles;