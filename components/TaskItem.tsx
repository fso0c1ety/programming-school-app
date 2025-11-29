import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  completed: boolean;
  hints?: string[];
  testCases?: string[];
}

interface TaskItemProps {
  task: Task;
  taskNumber: number;
  onPress: () => void;
  isActive?: boolean;
}

export default function TaskItem({ task, taskNumber, onPress, isActive = false }: TaskItemProps) {
  const { colors } = useTheme();

  const getDifficultyColor = () => {
    switch (task.difficulty) {
      case 'Easy':
        return colors.success;
      case 'Medium':
        return colors.warning;
      case 'Hard':
        return colors.error;
      default:
        return colors.textLight;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.cardBg, borderColor: colors.border },
        isActive && { borderColor: colors.primary, borderWidth: 2 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.numberBadge, { backgroundColor: task.completed ? colors.success : colors.primary }]}>
          {task.completed ? (
            <Ionicons name="checkmark" size={16} color={COLORS.white} />
          ) : (
            <Text style={styles.numberText}>{taskNumber}</Text>
          )}
        </View>
        
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, { color: colors.text }]} numberOfLines={1}>
            {task.title}
          </Text>
          <Text style={[styles.taskDescription, { color: colors.textLight }]} numberOfLines={2}>
            {task.description}
          </Text>
          
          <View style={styles.metaRow}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
                {task.difficulty}
              </Text>
            </View>
            
            <View style={styles.pointsContainer}>
              <Ionicons name="trophy" size={14} color={colors.warning} />
              <Text style={[styles.pointsText, { color: colors.textLight }]}>
                {task.points} pts
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Ionicons 
        name={task.completed ? "checkmark-circle" : "chevron-forward"} 
        size={24} 
        color={task.completed ? colors.success : colors.textLight} 
      />
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
    borderWidth: 1,
    ...SHADOWS.small,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SIZES.md,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  taskInfo: {
    flex: 1,
    gap: SIZES.xs,
  },
  taskTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: SIZES.small,
    lineHeight: SIZES.small * 1.4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    marginTop: SIZES.xs,
  },
  difficultyBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
  },
  difficultyText: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
});
