import { StyleSheet } from 'react-native';

// Using the same color palette as your main styles
export const COLORS = {
  primary: '#1E3A8A', // Deep Blue - Primary color for buttons and links
  secondary: '#FACC15', // Bright Yellow - Secondary color for highlights
  accent: '#DC2626', // Traffic Red - Used for error messages
  background: '#F3F4F6', // Light Gray - Background color for screens
  white: '#FFFFFF', // White - Used for inputs and text
  success: '#16A34A', // Green - Used for success messages
  darkMode: '#111827', // Dark Gray - Background for dark mode
  text: '#1F2937', // Dark text for light mode
  textLight: '#F9FAFB', // Light text for dark mode
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container fill the screen
    backgroundColor: COLORS.background, // Sets the background color
    padding: 24, // Adds padding around the content
    justifyContent: 'center', // Centers content vertically
  },
  title: {
    fontSize: 28, // Large font size for the title
    fontWeight: 'bold', // Bold text for emphasis
    color: COLORS.text, // Dark text color for readability
    marginBottom: 32, // Space below the title
    textAlign: 'center', // Centers the title text
  },
  input: {
    backgroundColor: COLORS.white, // White background for input fields
    borderRadius: 8, // Rounded corners
    padding: 16, // Padding inside the input
    marginBottom: 16, // Space below each input
    fontSize: 16, // Font size for input text
    color: COLORS.text, // Text color inside the input
    shadowColor: '#000', // Shadow color for elevation
    shadowOpacity: 0.05, // Light shadow opacity
    shadowRadius: 3, // Shadow blur radius
    elevation: 2, // Elevation for Android shadow
  },
  button: {
    backgroundColor: COLORS.primary, // Primary color for buttons
    borderRadius: 8, // Rounded corners
    padding: 16, // Padding inside the button
    alignItems: 'center', // Centers text inside the button
    marginTop: 8, // Space above the button
    marginBottom: 24, // Space below the button
    shadowColor: '#000', // Shadow color for elevation
    shadowOpacity: 0.1, // Slightly stronger shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
  },
  buttonText: {
    color: COLORS.white, // White text for contrast
    fontSize: 16, // Font size for button text
    fontWeight: '600', // Semi-bold text for emphasis
  },
  link: {
    alignSelf: 'center', // Centers the link horizontally
    padding: 8, // Padding around the link
  },
  linkText: {
    color: COLORS.primary, // Primary color for links
    fontSize: 14, // Font size for link text
    fontWeight: '500', // Medium weight for link text
  },
  errorText: {
    color: COLORS.accent, // Red color for error messages
    marginBottom: 16, // Space below the error text
    fontSize: 14, // Font size for error text
  }
});

export default styles;