import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSearch?: () => void;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search courses...', onSearch }: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[COLORS.gradients.primary[0], COLORS.gradients.primary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={[styles.container, { backgroundColor: colors.cardBg }]}>
          <Ionicons name="search" size={20} color={colors.textLight} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            returnKeyType="search"
          />
          {value.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color={colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  gradientBorder: {
    borderRadius: 25,
    padding: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: 24,
  },
  icon: {
    marginRight: SIZES.sm,
  },
  input: {
    flex: 1,
    fontSize: SIZES.body,
    paddingVertical: SIZES.xs,
  },
  clearButton: {
    marginLeft: SIZES.xs,
  },
});
