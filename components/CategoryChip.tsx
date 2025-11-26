import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

interface CategoryChipProps {
  name: string;
  icon: string; // MaterialCommunityIcons name, e.g. 'language-python'
  color: string;
  selected?: boolean;
  onPress: () => void;
}

export default function CategoryChip({ name, icon, color, selected = false, onPress }: CategoryChipProps) {
  const { colors } = useTheme();

  const emojiToMdi: Record<string, string> = {
    '🌐': 'web',
    '📱': 'cellphone',
    '🤖': 'robot',
    '🐍': 'language-python',
    '☕': 'language-java',
    '⚙️': 'cog',
    '🎯': 'target',
    '🔒': 'lock',
  };
  const resolvedIcon = emojiToMdi[icon] || icon;

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { 
          backgroundColor: selected ? color : colors.cardBg,
          borderColor: selected ? color : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons name={resolvedIcon as any} size={18} color={selected ? COLORS.white : colors.text} style={styles.icon} />
      <Text style={[styles.name, { color: selected ? COLORS.white : colors.text }]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radiusLg,
    marginRight: SIZES.sm,
    borderWidth: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: SIZES.xs,
  },
  name: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
});
