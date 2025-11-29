import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useCourseStore } from '../../store/courseStore';
import { useTaskStore } from '../../store/taskStore';
import Button from '../../components/Button';
import { Task } from '../../components/TaskItem';

export default function TaskDetail() {
  const router = useRouter();
  const { id, courseId } = useLocalSearchParams();
  const { colors } = useTheme();
  const { courses } = useCourseStore();
  const { completeTask, getCourseTaskProgress, updateTaskCode, incrementTaskAttempt } = useTaskStore();
  
  const [code, setCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const course = courses.find(c => c.id === courseId);
  const task = course?.tasks?.find((t: Task) => t.id === id) as Task | undefined;
  const taskProgress = getCourseTaskProgress(courseId as string);
  const isCompleted = taskProgress?.completedTasks.includes(id as string) || false;

  useEffect(() => {
    if (task && taskProgress?.tasks[id as string]?.code) {
      setCode(taskProgress.tasks[id as string].code || '');
    }
  }, [task, taskProgress]);

  if (!task || !course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Task not found</Text>
      </View>
    );
  }

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

  const handleSubmit = () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please write your code before submitting');
      return;
    }

    incrementTaskAttempt(courseId as string, id as string);

    Alert.alert(
      'Submit Solution',
      'Are you sure you want to submit your solution?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            completeTask(courseId as string, id as string, task.points, code);
            Alert.alert(
              'Congratulations! 🎉',
              `You completed this task and earned ${task.points} points!`,
              [
                { text: 'OK', onPress: () => router.back() }
              ]
            );
          },
        },
      ]
    );
  };

  const handleSaveDraft = () => {
    updateTaskCode(courseId as string, id as string, code);
    Alert.alert('Saved', 'Your code has been saved as a draft');
  };

  const showNextHint = () => {
    if (task.hints && currentHintIndex < task.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBg, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {task.title}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Info */}
        <View style={[styles.taskCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.taskHeader}>
            <View style={styles.badges}>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() + '20' }]}>
                <Text style={[styles.difficultyText, { color: getDifficultyColor() }]}>
                  {task.difficulty}
                </Text>
              </View>
              
              <View style={[styles.pointsBadge, { backgroundColor: colors.warning + '20' }]}>
                <Ionicons name="trophy" size={16} color={colors.warning} />
                <Text style={[styles.pointsText, { color: colors.warning }]}>
                  {task.points} points
                </Text>
              </View>
            </View>

            {isCompleted && (
              <View style={[styles.completedBadge, { backgroundColor: colors.success + '20' }]}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={[styles.completedText, { color: colors.success }]}>Completed</Text>
              </View>
            )}
          </View>

          <Text style={[styles.taskTitle, { color: colors.text }]}>{task.title}</Text>
          <Text style={[styles.taskDescription, { color: colors.textLight }]}>
            {task.description}
          </Text>

          {/* Test Cases */}
          {task.testCases && task.testCases.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                <Ionicons name="code-slash" size={18} color={colors.primary} /> Test Cases
              </Text>
              {task.testCases.map((testCase, index) => (
                <View 
                  key={index} 
                  style={[styles.testCase, { backgroundColor: colors.background }]}
                >
                  <Text style={[styles.testCaseText, { color: colors.textLight }]}>
                    {testCase}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Hints */}
          {task.hints && task.hints.length > 0 && (
            <View style={styles.section}>
              <View style={styles.hintHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  <Ionicons name="bulb" size={18} color={colors.warning} /> Hints
                </Text>
                <TouchableOpacity onPress={() => setShowHints(!showHints)}>
                  <Text style={[styles.toggleText, { color: colors.primary }]}>
                    {showHints ? 'Hide' : 'Show'} Hints
                  </Text>
                </TouchableOpacity>
              </View>

              {showHints && (
                <View style={styles.hintsContainer}>
                  {task.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                    <View 
                      key={index}
                      style={[styles.hint, { backgroundColor: colors.background }]}
                    >
                      <Text style={[styles.hintNumber, { color: colors.primary }]}>
                        Hint {index + 1}:
                      </Text>
                      <Text style={[styles.hintText, { color: colors.textLight }]}>
                        {hint}
                      </Text>
                    </View>
                  ))}
                  
                  {currentHintIndex < task.hints.length - 1 && (
                    <TouchableOpacity 
                      style={[styles.moreHintsButton, { borderColor: colors.primary }]}
                      onPress={showNextHint}
                    >
                      <Text style={[styles.moreHintsText, { color: colors.primary }]}>
                        Show Next Hint ({currentHintIndex + 2}/{task.hints.length})
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}
        </View>

        {/* Code Editor */}
        <View style={[styles.editorCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.editorHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              <Ionicons name="code" size={18} color={colors.primary} /> Your Solution
            </Text>
            <TouchableOpacity onPress={handleSaveDraft}>
              <Text style={[styles.saveText, { color: colors.primary }]}>Save Draft</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.codeInput, { 
              backgroundColor: colors.background, 
              color: colors.text,
              borderColor: colors.border 
            }]}
            value={code}
            onChangeText={setCode}
            placeholder="Write your code here..."
            placeholderTextColor={colors.textLight}
            multiline
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { backgroundColor: colors.cardBg, borderTopColor: colors.border }]}>
        <Button
          title={isCompleted ? 'Resubmit Solution' : 'Submit Solution'}
          onPress={handleSubmit}
          variant="primary"
          style={styles.submitButton}
          icon={<Ionicons name="checkmark" size={20} color={COLORS.white} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.base,
    paddingHorizontal: SIZES.xl,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: SIZES.sm,
  },
  scrollView: {
    flex: 1,
  },
  taskCard: {
    margin: SIZES.xl,
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.medium,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  badges: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  difficultyBadge: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
  },
  difficultyText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
  },
  pointsText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
  },
  completedText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  taskTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.sm,
  },
  taskDescription: {
    fontSize: SIZES.body,
    lineHeight: SIZES.body * 1.5,
    marginBottom: SIZES.xl,
  },
  section: {
    marginTop: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    marginBottom: SIZES.md,
  },
  testCase: {
    padding: SIZES.md,
    borderRadius: SIZES.radiusSm,
    marginBottom: SIZES.sm,
  },
  testCaseText: {
    fontSize: SIZES.small,
    fontFamily: 'monospace',
  },
  hintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  toggleText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  hintsContainer: {
    gap: SIZES.sm,
  },
  hint: {
    padding: SIZES.md,
    borderRadius: SIZES.radiusSm,
  },
  hintNumber: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  hintText: {
    fontSize: SIZES.small,
    lineHeight: SIZES.small * 1.4,
  },
  moreHintsButton: {
    padding: SIZES.md,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  moreHintsText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  editorCard: {
    marginHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.medium,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  saveText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  codeInput: {
    minHeight: 300,
    padding: SIZES.base,
    borderRadius: SIZES.radiusSm,
    fontSize: SIZES.small,
    fontFamily: 'monospace',
    borderWidth: 1,
  },
  bottomBar: {
    padding: SIZES.xl,
    borderTopWidth: 1,
    ...SHADOWS.medium,
  },
  submitButton: {
    width: '100%',
  },
});
