import { StyleSheet } from 'react-native';

// Colors based on your specification
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  finesList: {
    flex: 1,
    padding: 16,
    marginBottom: 15,
  },
  fineCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  fineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  fineCardHeaderContent: {
    flexDirection: 'row',
    flex: 1,
  },
  fineStatusIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fineCardHeaderInfo: {
    flex: 1,
  },
  fineDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  fineMetaInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  fineCardDetail: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  fineCardDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fineCardDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  fineCardDetailValue: {
    fontSize: 14,
    color: COLORS.text,
    flex: 2,
    textAlign: 'right',
    fontWeight: '500',
  },
  fineCardDetailValueAlert: {
    color: COLORS.accent,
  },
  fineStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: COLORS.success + '20', // 20% opacity
  },
  fineStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.success,
  },
  fineCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  fineCardButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  fineCardButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  fineCardButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 48,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  
  // Updated filter chip styles
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginVertical: 4,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipInactive: {
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
  },
  filterChipDark: {
    backgroundColor: 'rgba(55, 65, 81, 0.7)',
    borderColor: 'rgba(75, 85, 99, 1)',
  },
  filterChipIconContainer: {
    marginRight: 4,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  filterChipTextInactive: {
    color: COLORS.text,
  },
  filterChipTextDark: {
    color: '#E5E7EB',
  },
  filterChipCount: {
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 4,
  },
  filterChipCountActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterChipCountInactive: {
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
  },
  filterChipCountDark: {
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
  },
  filterChipCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterChipCountTextActive: {
    color: COLORS.white,
  },
  filterChipCountTextInactive: {
    color: COLORS.text,
  },
  filterContainer: {
    flexDirection: 'row',  // Align items horizontally
    padding: 10,    // Add some space below the chips
    paddingHorizontal: 10, // Optional: Adds some left & right spacing
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});

export default styles;