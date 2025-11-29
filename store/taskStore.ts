import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TaskProgress {
  taskId: string;
  completed: boolean;
  completedAt?: Date;
  attempts: number;
  code?: string;
}

export interface CourseTaskProgress {
  courseId: string;
  completedTasks: string[];
  totalPoints: number;
  tasks: Record<string, TaskProgress>;
}

interface TaskState {
  progress: Record<string, CourseTaskProgress>;
  
  // Actions
  getCourseTaskProgress: (courseId: string) => CourseTaskProgress | null;
  completeTask: (courseId: string, taskId: string, points: number, code?: string) => void;
  updateTaskCode: (courseId: string, taskId: string, code: string) => void;
  incrementTaskAttempt: (courseId: string, taskId: string) => void;
  resetCourseProgress: (courseId: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      progress: {},

      getCourseTaskProgress: (courseId: string) => {
        return get().progress[courseId] || null;
      },

      completeTask: (courseId: string, taskId: string, points: number, code?: string) => {
        set((state) => {
          const courseProgress = state.progress[courseId] || {
            courseId,
            completedTasks: [],
            totalPoints: 0,
            tasks: {},
          };

          const taskAlreadyCompleted = courseProgress.completedTasks.includes(taskId);
          const completedTasks = taskAlreadyCompleted
            ? courseProgress.completedTasks
            : [...courseProgress.completedTasks, taskId];

          const newPoints = taskAlreadyCompleted 
            ? courseProgress.totalPoints 
            : courseProgress.totalPoints + points;

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                completedTasks,
                totalPoints: newPoints,
                tasks: {
                  ...courseProgress.tasks,
                  [taskId]: {
                    taskId,
                    completed: true,
                    completedAt: new Date(),
                    attempts: (courseProgress.tasks[taskId]?.attempts || 0) + 1,
                    code,
                  },
                },
              },
            },
          };
        });
      },

      updateTaskCode: (courseId: string, taskId: string, code: string) => {
        set((state) => {
          const courseProgress = state.progress[courseId] || {
            courseId,
            completedTasks: [],
            totalPoints: 0,
            tasks: {},
          };

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                tasks: {
                  ...courseProgress.tasks,
                  [taskId]: {
                    ...(courseProgress.tasks[taskId] || {
                      taskId,
                      completed: false,
                      attempts: 0,
                    }),
                    code,
                  },
                },
              },
            },
          };
        });
      },

      incrementTaskAttempt: (courseId: string, taskId: string) => {
        set((state) => {
          const courseProgress = state.progress[courseId];
          if (!courseProgress) return state;

          return {
            progress: {
              ...state.progress,
              [courseId]: {
                ...courseProgress,
                tasks: {
                  ...courseProgress.tasks,
                  [taskId]: {
                    ...(courseProgress.tasks[taskId] || {
                      taskId,
                      completed: false,
                      attempts: 0,
                    }),
                    attempts: (courseProgress.tasks[taskId]?.attempts || 0) + 1,
                  },
                },
              },
            },
          };
        });
      },

      resetCourseProgress: (courseId: string) => {
        set((state) => {
          const newProgress = { ...state.progress };
          delete newProgress[courseId];
          return { progress: newProgress };
        });
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
