import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export interface Lesson {
  id: string;
  title: string;
  duration: string; // Duration as string like "15:30" minutes
  completed?: boolean;
  videoUrl?: string;
}

interface LessonItemProps {
  lesson: Lesson;
  index?: number; // Optional for backward compatibility
  lessonNumber?: number; // Alternative to index
  onPress: () => void;
  isCurrentLesson?: boolean;
  isActive?: boolean; // Alternative to isCurrentLesson
}

export default function LessonItem({ 
  lesson, 
  index, 
  lessonNumber,
  onPress, 
  isCurrentLesson = false,
  isActive = false
}: LessonItemProps) {
  const { colors } = useTheme();
  
  const number = lessonNumber ?? ((index ?? 0) + 1);
  const highlighted = isActive || isCurrentLesson;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: highlighted ? colors.primary + '15' : colors.cardBg,
          borderColor: highlighted ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.numberCircle,
            {
              backgroundColor: lesson.completed ? colors.success : colors.border,
            },
          ]}
        >
          {lesson.completed ? (
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
          ) : (
            <Text style={[styles.number, { color: colors.text }]}>{number}</Text>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {lesson.title}
          </Text>
          <Text style={[styles.duration, { color: colors.textLight }]}>{lesson.duration}</Text>
        </View>
      </View>
      <View style={styles.playButton}>
        {lesson.completed ? (
          <Ionicons name="refresh" size={18} color={colors.text} />
        ) : (
          <Ionicons name="play" size={18} color={colors.text} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
    borderWidth: 1,
    ...SHADOWS.small,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  number: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.body,
    fontWeight: '600',
    marginBottom: SIZES.xs / 2,
  },
  duration: {
    fontSize: SIZES.tiny,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
  },
});

export { LessonItem };
