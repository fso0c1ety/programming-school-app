import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  watchedDuration: number;
  totalDuration: number;
  lastWatchedAt: Date;
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  currentLessonId: string | null;
  progressPercentage: number;
  totalLessons: number;
  lessons: Record<string, LessonProgress>;
}

interface ProgressState {
  progress: Record<string, CourseProgress>;
  
  // Actions
  getCourseProgress: (courseId: string) => CourseProgress | null;
  updateLessonProgress: (courseId: string, lessonId: string, watchedDuration: number, totalDuration: number) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  setCurrentLesson: (courseId: string, lessonId: string) => void;
  calculateProgress: (courseId: string, totalLessons: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      getCourseProgress: (courseId: string) => {
        return get().progress[courseId] || null;
      },

      updateLessonProgress: (courseId: string, lessonId: string, watchedDuration: number, totalDuration: number) => {
        set((state) => {
          const courseProgress = state.progress[courseId] || {
            courseId,
            completedLessons: [],
            currentLessonId: lessonId,
            progressPercentage: 0,
            totalLessons: 0,
            lessons: {},
          };

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                currentLessonId: lessonId,
                lessons: {
                  ...courseProgress.lessons,
                  [lessonId]: {
                    lessonId,
                    completed: watchedDuration >= totalDuration * 0.9, // 90% watched = completed
                    watchedDuration,
                    totalDuration,
                    lastWatchedAt: new Date(),
                  },
                },
              },
            },
          };
        });
      },

      completeLesson: (courseId: string, lessonId: string) => {
        set((state) => {
          const courseProgress = state.progress[courseId];
          if (!courseProgress) return state;

          const completedLessons = courseProgress.completedLessons.includes(lessonId)
            ? courseProgress.completedLessons
            : [...courseProgress.completedLessons, lessonId];

          const progressPercentage = Math.round(
            (completedLessons.length / courseProgress.totalLessons) * 100
          );

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                completedLessons,
                progressPercentage,
              },
            },
          };
        });
      },

      setCurrentLesson: (courseId: string, lessonId: string) => {
        set((state) => {
          const courseProgress = state.progress[courseId];
          if (!courseProgress) return state;

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                currentLessonId: lessonId,
              },
            },
          };
        });
      },

      calculateProgress: (courseId: string, totalLessons: number) => {
        set((state) => {
          const courseProgress = state.progress[courseId];
          if (!courseProgress) {
            return {
              progress: {
                ...state.progress,
                [courseId]: {
                  courseId,
                  completedLessons: [],
                  currentLessonId: null,
                  progressPercentage: 0,
                  totalLessons,
                  lessons: {},
                },
              },
            };
          }

          const progressPercentage = Math.round(
            (courseProgress.completedLessons.length / totalLessons) * 100
          );

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                totalLessons,
                progressPercentage,
              },
            },
          };
        });
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
