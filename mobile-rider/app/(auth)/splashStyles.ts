import { StyleSheet } from 'react-native';

// Define a color palette for consistent styling across the app
export const COLORS = {
  primary: '#1E3A8A', // Deep Blue - used for primary buttons and titles
  secondary: '#FACC15', // Bright Yellow - used for highlights or secondary elements
  accent: '#DC2626', // Traffic Red - used for warnings or alerts
  background: '#F3F4F6', // Light Gray - used as the default background color
  white: '#FFFFFF', // Pure white - used for text or backgrounds
  success: '#16A34A', // Green - used for success messages or indicators
  darkMode: '#111827', // Dark Gray - used for dark mode backgrounds
  text: '#1F2937', // Dark text for light mode
  textLight: '#F9FAFB', // Light text for dark mode
};

const splashStyles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full screen
    backgroundColor: COLORS.background, // Sets the background color
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    padding: 24, // Adds padding around the content
  },
  title: {
    fontSize: 28, // Large font size for the title
    fontWeight: 'bold', // Makes the title bold
    color: COLORS.primary, // Sets the title color to the primary color
    textAlign: 'center', // Centers the text
    marginBottom: 48, // Adds space below the title
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for emphasis
    textShadowOffset: { width: 0, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
  },
  buttonContainer: {
    width: '100%', // Makes the container span the full width
    marginTop: 24, // Adds space above the container
    gap: 16, // Adds spacing between buttons
  },
  button: {
    backgroundColor: COLORS.primary, // Sets the button background color
    paddingVertical: 16, // Adds vertical padding
    paddingHorizontal: 24, // Adds horizontal padding
    borderRadius: 8, // Rounds the button corners
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically
    shadowColor: '#000', // Adds a shadow color
    shadowOpacity: 0.1, // Sets shadow opacity
    shadowRadius: 5, // Sets shadow blur radius
    elevation: 5, // Adds elevation for Android shadow
  },
  buttonText: {
    color: COLORS.white, // Sets the text color to white
    fontSize: 16, // Medium font size for button text
    fontWeight: '600', // Semi-bold text
  },
  logo: {
    width: 120, // Sets the logo width
    height: 120, // Sets the logo height
    marginBottom: 32, // Adds space below the logo
    resizeMode: 'contain', // Ensures the logo maintains its aspect ratio
  },
});

export default splashStyles;