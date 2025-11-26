import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: SIZES.radiusMd,
      ...SHADOWS.small,
    };

    // Size variants
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: { paddingVertical: SIZES.sm, paddingHorizontal: SIZES.base },
      medium: { paddingVertical: SIZES.base, paddingHorizontal: SIZES.lg },
      large: { paddingVertical: SIZES.md, paddingHorizontal: SIZES.xl },
    };

    // Color variants
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: { backgroundColor: colors.primary },
      secondary: { backgroundColor: colors.secondary },
      outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary },
      ghost: { backgroundColor: 'transparent' },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && { opacity: 0.5 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<ButtonSize, TextStyle> = {
      small: { fontSize: SIZES.small },
      medium: { fontSize: SIZES.body },
      large: { fontSize: SIZES.h4 },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: { color: COLORS.white },
      secondary: { color: COLORS.white },
      outline: { color: colors.primary },
      ghost: { color: colors.primary },
    };

    return {
      fontWeight: 'bold',
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'secondary' ? COLORS.white : colors.primary} />
      ) : (
        <>
          {icon}
          <Text style={[getTextStyle(), textStyle, icon && { marginLeft: SIZES.sm }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
