// Design System - Modern Theme Configuration

export const COLORS = {
  primary: '#6366F1', // Modern Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#EC4899', // Vibrant Pink
  secondaryDark: '#DB2777',
  accent: '#8B5CF6', // Purple
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#0F172A',
  textLight: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  purple: '#8B5CF6',
  gradient1: ['#6366F1', '#8B5CF6'],
  gradient2: ['#EC4899', '#F97316'],
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    secondary: ['#EC4899', '#F97316'],
    purple: ['#8B5CF6', '#A78BFA'],
    blue: ['#3B82F6', '#60A5FA'],
  },
  cardBg: '#FFFFFF',
  
  // Dark mode
  darkBackground: '#0F172A',
  darkCard: '#1E293B',
  darkText: '#F1F5F9',
  darkTextLight: '#94A3B8',
  darkBorder: '#334155',
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  
  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 20,
  radiusFull: 999,
  
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  body: 16,
  small: 14,
  tiny: 12,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const SHADOWS = {
  small: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  large: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
};
