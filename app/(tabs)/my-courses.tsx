import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';
import { useProgressStore } from '../../store/progressStore';
import CourseCard from '../../components/CourseCard';

export default function MyCourses() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, isAuthenticated } = useAuthStore();
  const { courses, loadCourses, enrolledCourses, completedCourses } = useCourseStore();
  const { progress } = useProgressStore();

  useEffect(() => {
    loadCourses();
  }, []);

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="lock-closed" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>Please login to view your courses</Text>
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const enrolledCoursesList = courses.filter(c => enrolledCourses.includes(c.id));
  const completedCoursesList = courses.filter(c => completedCourses.includes(c.id));
  const inProgressCourses = enrolledCoursesList.filter(c => !completedCourses.includes(c.id));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Courses</Text>
        <Text style={[styles.subtitle, { color: colors.textLight }]}>
          {enrolledCourses.length} enrolled • {completedCourses.length} completed
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="book" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{enrolledCourses.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textLight }]}>Enrolled</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="hourglass" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{inProgressCourses.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textLight }]}>In Progress</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
          <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          </View>
          <Text style={[styles.statNumber, { color: colors.text }]}>{completedCourses.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textLight }]}>Completed</Text>
        </View>
      </View>

      {/* In Progress Section */}
      {inProgressCourses.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Continue Learning</Text>
          {inProgressCourses.map((course) => {
            const courseProgress = progress[course.id];
            return (
              <View key={course.id}>
                <CourseCard course={course} variant="list" />
                {courseProgress && (
                  <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${courseProgress.progressPercentage}%`, backgroundColor: colors.primary },
                      ]}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Completed Section */}
      {completedCoursesList.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Completed Courses</Text>
          {completedCoursesList.map((course) => (
            <CourseCard key={course.id} course={course} variant="list" />
          ))}
        </View>
      )}

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <View style={styles.emptyContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="book-outline" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>No courses yet</Text>
          <Text style={[styles.emptySubtext, { color: colors.textLight }]}>
            Explore courses and start learning
          </Text>
          <TouchableOpacity 
            style={[styles.exploreButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)/courses')}
          >
            <Text style={styles.exploreButtonText}>Explore Courses</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: SIZES.xxxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.base,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.small,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
    gap: SIZES.base,
  },
  statCard: {
    flex: 1,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  statNumber: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.xs / 2,
  },
  statLabel: {
    fontSize: SIZES.tiny,
  },
  section: {
    paddingHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: -SIZES.xs,
    marginBottom: SIZES.base,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxxl * 2,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  emptyText: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  emptySubtext: {
    fontSize: SIZES.body,
    marginBottom: SIZES.xl,
  },
  exploreButton: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.medium,
  },
  exploreButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  loginButton: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.xl,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.medium,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
});
