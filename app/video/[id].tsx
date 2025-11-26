import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { VideoView, useVideoPlayer } from 'expo-video';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useCourseStore } from '../../store/courseStore';
import { useProgressStore } from '../../store/progressStore';
import LessonItem from '../../components/LessonItem';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');
const videoHeight = (width * 9) / 16; // 16:9 aspect ratio

export default function VideoPlayer() {
  const router = useRouter();
  const { id, lessonId } = useLocalSearchParams<{ id: string; lessonId: string }>();
  const { colors } = useTheme();
  const { courses } = useCourseStore();
  const { 
    progress, 
    updateLessonProgress, 
    completeLesson, 
    setCurrentLesson 
  } = useProgressStore();

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const course = courses.find(c => c.id === id);
  const lesson = course?.curriculum.find(l => l.id === lessonId);
  const lessonIndex = course?.curriculum.findIndex(l => l.id === lessonId) ?? -1;
  const lessonProgress = id && lessonId ? progress[id]?.[lessonId] : undefined;

  // Use local video file for all lessons as demo
  const localVideo = require('./#1 Python Tutorial for Beginners  Introduction to Python - Telusko (720p, h264).mp4');
  const videoSource = localVideo;
  
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.currentTime && player.duration) {
        const positionMillis = player.currentTime * 1000;
        const durationMillis = player.duration * 1000;
        
        setPosition(positionMillis);
        setDuration(durationMillis);

        const watchedSeconds = Math.floor(positionMillis / 1000);
        const totalSeconds = Math.floor(durationMillis / 1000);
        const percentage = (watchedSeconds / totalSeconds) * 100;

        if (course && lesson) {
          updateLessonProgress(course.id, lesson.id, watchedSeconds, totalSeconds);

          if (percentage >= 90 && !lessonProgress?.completed) {
            completeLesson(course.id, lesson.id);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, course, lesson, lessonProgress]);

  useEffect(() => {
    if (course && lesson) {
      setCurrentLesson(course.id, lesson.id);
    }
  }, [course?.id, lesson?.id]);

  useEffect(() => {
    if (!course || !lesson) {
      Alert.alert('Error', 'Video not found');
      router.back();
    }
  }, [course, lesson]);

  if (!course || !lesson) return null;

  const handleNextLesson = () => {
    if (lessonIndex < course.curriculum.length - 1) {
      const nextLesson = course.curriculum[lessonIndex + 1];
      router.replace(`/video/${course.id}?lessonId=${nextLesson.id}`);
    } else {
      Alert.alert(
        'Course Completed!',
        'Congratulations! You have completed all lessons in this course.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };

  const handlePreviousLesson = () => {
    if (lessonIndex > 0) {
      const prevLesson = course.curriculum[lessonIndex - 1];
      router.replace(`/video/${course.id}?lessonId=${prevLesson.id}`);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {course.title}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        {Platform.OS === 'web' ? (
          // HTML5 video fallback for web
          <video
            src={videoSource}
            style={{ width: '100%', height: videoHeight, backgroundColor: 'black' }}
            controls
            playsInline
          />
        ) : (
          <VideoView
            player={player}
            style={styles.video}
            nativeControls={true}
            contentFit="contain"
          />
        )}
      </View>

      {/* Lesson Info */}
      <View style={styles.lessonInfo}>
        <View style={styles.lessonHeader}>
          <View style={styles.lessonBadge}>
            <Text style={styles.lessonBadgeText}>Lesson {lessonIndex + 1}</Text>
          </View>
          {lessonProgress?.completed && (
            <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
              <Text style={styles.completedText}>✓ Completed</Text>
            </View>
          )}
        </View>
        <Text style={[styles.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
        <Text style={[styles.lessonDuration, { color: colors.textLight }]}>
          {lesson.duration} minutes
        </Text>

        {/* Progress Bar */}
        {lessonProgress && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: colors.primary 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textLight }]}>
              {formatTime(position)} / {formatTime(duration)}
            </Text>
          </View>
        )}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <Button
          title="← Previous"
          onPress={handlePreviousLesson}
          variant="outline"
          disabled={lessonIndex === 0}
          style={styles.navButton}
        />
        <Button
          title="Next →"
          onPress={handleNextLesson}
          variant="primary"
          disabled={lessonIndex === course.curriculum.length - 1}
          style={styles.navButton}
        />
      </View>

      {/* Curriculum List */}
      <ScrollView style={styles.curriculumList} showsVerticalScrollIndicator={false}>
        <Text style={[styles.curriculumTitle, { color: colors.text }]}>
          Course Curriculum
        </Text>
        {course.curriculum.map((curriculumLesson, index) => (
          <LessonItem
            key={curriculumLesson.id}
            lesson={curriculumLesson}
            lessonNumber={index + 1}
            isActive={curriculumLesson.id === lessonId}
            onPress={() => {
              if (curriculumLesson.id !== lessonId) {
                router.replace(`/video/${course.id}?lessonId=${curriculumLesson.id}`);
              }
            }}
          />
        ))}
        <View style={{ height: SIZES.xl }} />
      </ScrollView>
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
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.md,
    ...SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: SIZES.sm,
  },
  videoContainer: {
    width: '100%',
    height: videoHeight,
    backgroundColor: '#000000',
  },
  video: {
    flex: 1,
  },
  lessonInfo: {
    padding: SIZES.lg,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
    gap: SIZES.sm,
  },
  lessonBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: SIZES.xs,
  },
  lessonBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.xs,
    fontWeight: 'bold',
  },
  completedBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: SIZES.xs,
  },
  completedText: {
    color: COLORS.white,
    fontSize: SIZES.xs,
    fontWeight: 'bold',
  },
  lessonTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  lessonDuration: {
    fontSize: SIZES.sm,
  },
  progressContainer: {
    marginTop: SIZES.md,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: SIZES.xs,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: SIZES.xs,
    textAlign: 'right',
  },
  navigationButtons: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    gap: SIZES.md,
    marginBottom: SIZES.md,
  },
  navButton: {
    flex: 1,
  },
  curriculumList: {
    flex: 1,
    paddingHorizontal: SIZES.lg,
  },
  curriculumTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.md,
  },
});
