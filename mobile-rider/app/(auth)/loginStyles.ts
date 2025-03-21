import { StyleSheet } from 'react-native';

// Using the same color palette as your main styles
export const COLORS = {
  primary: '#1E3A8A', // Deep Blue
  secondary: '#FACC15', // Bright Yellow
  accent: '#DC2626', // Traffic Red
  background: '#F3F4F6', // Light Gray
  white: '#FFFFFF',
  success: '#16A34A', // Green
  darkMode: '#111827', // Dark Gray
  text: '#1F2937', // Dark text for light mode
  textLight: '#F9FAFB', // Light text for dark mode
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  // Add these to your existing styles
inputError: {
  borderColor: 'red',
},

buttonDisabled: {
  backgroundColor: '#cccccc',
},
helpContainer: {
  marginTop: 15,
  alignItems: 'center',
  gap: 10,
},
demoInfoContainer: {
  marginTop: 30,
  padding: 15,
  backgroundColor: '#f0f0f0',
  borderRadius: 5,
},
demoInfoText: {
  fontSize: 12,
  color: '#666',
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    alignSelf: 'center',
    padding: 8,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: COLORS.accent,
    marginBottom: 16,
    fontSize: 14,
  }
});

export default loginStyles;