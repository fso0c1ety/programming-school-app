import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import coursesData from '../data/courses.json';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  hints?: string[];
  testCases?: string[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviews: number;
  students: string;
  price: number;
  level: string;
  duration: string;
  category: string;
  thumbnail: string;
  color: string;
  description: string;
  featured: boolean;
  popular: boolean;
  whatYouLearn: string[];
  curriculum: Lesson[];
  tasks?: Task[];
}

interface CourseState {
  courses: Course[];
  enrolledCourses: string[];
  completedCourses: string[];
  currentCourse: Course | null;
  searchQuery: string;
  selectedCategory: string | null;
  
  // Actions
  loadCourses: () => void;
  getCourseById: (id: string) => Course | undefined;
  getFeaturedCourses: () => Course[];
  getPopularCourses: () => Course[];
  getFilteredCourses: () => Course[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  enrollInCourse: (courseId: string) => void;
  completeCourse: (courseId: string) => void;
  setCurrentCourse: (course: Course | null) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: [],
      enrolledCourses: [],
      completedCourses: [],
      currentCourse: null,
      searchQuery: '',
      selectedCategory: null,

      loadCourses: () => {
        set({ courses: coursesData as Course[] });
      },

      getCourseById: (id: string) => {
        return get().courses.find((course) => course.id === id);
      },

      getFeaturedCourses: () => {
        return get().courses.filter((course) => course.featured);
      },

      getPopularCourses: () => {
        return get().courses.filter((course) => course.popular);
      },

      getFilteredCourses: () => {
        const { courses, searchQuery, selectedCategory } = get();
        let filtered = courses;

        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (course) =>
              course.title.toLowerCase().includes(query) ||
              course.instructor.toLowerCase().includes(query) ||
              course.category.toLowerCase().includes(query) ||
              course.description.toLowerCase().includes(query)
          );
        }

        // Filter by category
        if (selectedCategory) {
          filtered = filtered.filter((course) => course.category === selectedCategory);
        }

        return filtered;
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category: string | null) => {
        set({ selectedCategory: category });
      },

      enrollInCourse: (courseId: string) => {
        set((state) => ({
          enrolledCourses: state.enrolledCourses.includes(courseId)
            ? state.enrolledCourses
            : [...state.enrolledCourses, courseId],
        }));
      },

      completeCourse: (courseId: string) => {
        set((state) => ({
          completedCourses: state.completedCourses.includes(courseId)
            ? state.completedCourses
            : [...state.completedCourses, courseId],
        }));
      },

      setCurrentCourse: (course: Course | null) => {
        set({ currentCourse: course });
      },
    }),
    {
      name: 'course-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        enrolledCourses: state.enrolledCourses,
        completedCourses: state.completedCourses,
      }),
    }
  )
);
