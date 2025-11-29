import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TiltCard from '../../components/TiltCard';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';
import LessonItem from '../../components/LessonItem';
import TaskItem from '../../components/TaskItem';
import Button from '../../components/Button';

export default function CourseDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { courses, enrolledCourses, enrollInCourse } = useCourseStore();
  const { isAuthenticated } = useAuthStore();
  const { getCourseTaskProgress } = useTaskStore();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'curriculum' | 'tasks'>('overview');
  
  const taskProgress = getCourseTaskProgress(id as string);

  const course = courses.find(c => c.id === id);
  const isEnrolled = enrolledCourses.includes(id as string);

  useEffect(() => {
    if (!course) {
      Alert.alert('Error', 'Course not found');
      router.back();
    }
  }, [course]);

  if (!course) return null;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please login to enroll in this course',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => router.push('/auth/login') }
        ]
      );
      return;
    }

    enrollInCourse(course.id);
    Alert.alert('Success', 'You have been enrolled in this course!');
  };

  const handleStartCourse = () => {
    if (course.curriculum.length > 0) {
      router.push(`/video/${course.id}?lessonId=${course.curriculum[0].id}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Course Info */}
        <TiltCard style={[styles.courseInfo3D, { backgroundColor: colors.primary }]}> 
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseInstructor}>by {course.instructor}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.metaText}>{course.rating}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people" size={16} color={COLORS.white} />
              <Text style={styles.metaText}>{course.students.toLocaleString()}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={16} color={COLORS.white} />
              <Text style={styles.metaText}>{course.duration}h</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="chart-bar" size={16} color={COLORS.white} />
              <Text style={styles.metaText}>{course.level}</Text>
            </View>
          </View>
        </TiltCard>

        {/* Tabs */}
        <View style={[styles.tabContainer, { backgroundColor: colors.cardBg }]}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              selectedTab === 'overview' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setSelectedTab('overview')}
          >
            <Text style={[
              styles.tabText, 
              { color: selectedTab === 'overview' ? colors.primary : colors.textLight }
            ]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab,
              selectedTab === 'curriculum' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setSelectedTab('curriculum')}
          >
            <Text style={[
              styles.tabText,
              { color: selectedTab === 'curriculum' ? colors.primary : colors.textLight }
            ]}>
              Curriculum
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab,
              selectedTab === 'tasks' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setSelectedTab('tasks')}
          >
            <Text style={[
              styles.tabText,
              { color: selectedTab === 'tasks' ? colors.primary : colors.textLight }
            ]}>
              Tasks
              {course.tasks && course.tasks.length > 0 && (
                <Text style={[styles.tabBadge, { color: colors.primary }]}>
                  {' '}({course.tasks.length})
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {selectedTab === 'overview' ? (
            <View style={styles.overviewSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>About This Course</Text>
              <Text style={[styles.description, { color: colors.textLight }]}>
                {course.description || `Master ${course.title} with comprehensive lessons covering all essential topics. This course is designed for ${course.level.toLowerCase()} learners and includes hands-on projects and real-world examples.`}
              </Text>

              <Text style={[styles.sectionTitle, { color: colors.text, marginTop: SIZES.xl }]}>
                What You'll Learn
              </Text>
              <View style={styles.bulletList}>
                <Text style={[styles.bulletItem, { color: colors.textLight }]}>
                  ✓ Comprehensive understanding of {course.title}
                </Text>
                <Text style={[styles.bulletItem, { color: colors.textLight }]}>
                  ✓ Hands-on projects and real-world examples
                </Text>
                <Text style={[styles.bulletItem, { color: colors.textLight }]}>
                  ✓ Best practices and industry standards
                </Text>
                <Text style={[styles.bulletItem, { color: colors.textLight }]}>
                  ✓ Certificate of completion
                </Text>
              </View>

              <Text style={[styles.sectionTitle, { color: colors.text, marginTop: SIZES.xl }]}>
                Instructor
              </Text>
              <TiltCard style={[styles.instructorCard3D, { backgroundColor: colors.cardBg }]}> 
                <View style={styles.instructorAvatar}>
                  <Text style={styles.instructorInitials}>
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.instructorInfo}>
                  <Text style={[styles.instructorName, { color: colors.text }]}>
                    {course.instructor}
                  </Text>
                  <Text style={[styles.instructorBio, { color: colors.textLight }]}>
                    Expert {course.category} Developer
                  </Text>
                </View>
              </TiltCard>
            </View>
          ) : selectedTab === 'curriculum' ? (
            <View style={styles.curriculumSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Course Curriculum ({course.curriculum.length} lessons)
              </Text>
              {course.curriculum.map((lesson, index) => (
                <TiltCard key={lesson.id} style={{ marginBottom: SIZES.sm }} onPress={() => {
                  if (isEnrolled) {
                    router.push(`/video/${course.id}?lessonId=${lesson.id}`);
                  } else {
                    Alert.alert('Enroll Required', 'Please enroll in this course to access lessons');
                  }
                }}>
                  <LessonItem
                    lesson={lesson}
                    lessonNumber={index + 1}
                    onPress={() => {
                      if (isEnrolled) {
                        router.push(`/video/${course.id}?lessonId=${lesson.id}`);
                      } else {
                        Alert.alert('Enroll Required', 'Please enroll in this course to access lessons');
                      }
                    }}
                  />
                </TiltCard>
              ))}
            </View>
          ) : (
            <View style={styles.tasksSection}>
              {/* Task Statistics */}
              <View style={[styles.statsContainer, { backgroundColor: colors.cardBg }]}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.primary }]}>
                    {taskProgress?.completedTasks.length || 0}/{course.tasks?.length || 0}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textLight }]}>Completed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.warning }]}>
                    {taskProgress?.totalPoints || 0}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.textLight }]}>Points Earned</Text>
                </View>
              </View>

              <Text style={[styles.sectionTitle, { color: colors.text, marginTop: SIZES.xl }]}>
                Practical Coding Tasks ({course.tasks?.length || 0})
              </Text>
              
              {course.tasks && course.tasks.length > 0 ? (
                <>
                  <Text style={[styles.sectionDescription, { color: colors.textLight }]}>
                    Practice what you've learned with hands-on coding challenges
                  </Text>
                  
                  {course.tasks.map((task, index) => {
                    const isTaskCompleted = taskProgress?.completedTasks.includes(task.id) || false;
                    return (
                      <TiltCard key={task.id} style={{ marginBottom: SIZES.sm }}>
                        <TaskItem
                          task={{ ...task, completed: isTaskCompleted }}
                          taskNumber={index + 1}
                          onPress={() => {
                            if (isEnrolled) {
                              router.push(`/task/${task.id}?courseId=${course.id}`);
                            } else {
                              Alert.alert('Enroll Required', 'Please enroll in this course to access tasks');
                            }
                          }}
                        />
                      </TiltCard>
                    );
                  })}
                </>
              ) : (
                <View style={[styles.emptyState, { backgroundColor: colors.cardBg }]}>
                  <Ionicons name="code-slash" size={64} color={colors.textLight} />
                  <Text style={[styles.emptyStateText, { color: colors.textLight }]}>
                    No tasks available yet
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.cardBg }]}>
        {!isEnrolled ? (
          <Button
            title="Enroll Now"
            onPress={handleEnroll}
            variant="primary"
            style={styles.actionButton}
          />
        ) : (
          <Button
            title="Continue Learning"
            onPress={handleStartCourse}
            variant="primary"
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: SIZES.xxxl,
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  courseInfo: {
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xxl,
  },
  courseInfo3D: {
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xxl,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    borderBottomLeftRadius: SIZES.radiusLg,
    borderBottomRightRadius: SIZES.radiusLg,
  },
  courseTitle: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.sm,
  },
  courseInstructor: {
    fontSize: SIZES.md,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: SIZES.lg,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  metaIcon: {
    fontSize: 16,
  },
  metaText: {
    fontSize: SIZES.sm,
    color: COLORS.white,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.md,
    alignItems: 'center',
  },
  tabText: {
    fontSize: SIZES.md,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.lg,
  },
  overviewSection: {},
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.md,
  },
  description: {
    fontSize: SIZES.md,
    lineHeight: SIZES.md * 1.5,
  },
  bulletList: {
    gap: SIZES.sm,
  },
  bulletItem: {
    fontSize: SIZES.md,
    lineHeight: SIZES.md * 1.5,
  },
  instructorCard3D: {
    flexDirection: 'row',
    padding: SIZES.md,
    borderRadius: SIZES.radiusLg,
    gap: SIZES.md,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructorInitials: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  instructorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  instructorName: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructorBio: {
    fontSize: SIZES.sm,
  },
  curriculumSection: {},
  tasksSection: {},
  statsContainer: {
    flexDirection: 'row',
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SIZES.lg,
  },
  statValue: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  statLabel: {
    fontSize: SIZES.small,
  },
  sectionDescription: {
    fontSize: SIZES.small,
    marginBottom: SIZES.lg,
    lineHeight: SIZES.small * 1.4,
  },
  tabBadge: {
    fontSize: SIZES.tiny,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xxxl,
    borderRadius: SIZES.radiusLg,
    marginTop: SIZES.lg,
  },
  emptyStateText: {
    fontSize: SIZES.body,
    marginTop: SIZES.base,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.lg,
    ...SHADOWS.medium,
  },
  actionButton: {
    width: '100%',
  },
});
