# API Reference

Complete reference for all stores, components, and their usage.

## 📦 State Management (Zustand Stores)

### Auth Store

**Import:**
```typescript
import { useAuthStore } from '../store/authStore';
```

**State:**
```typescript
{
  user: User | null;           // Current user object or null
  isAuthenticated: boolean;     // Authentication status
}
```

**Actions:**

#### `login(email: string, password: string): Promise<void>`
Authenticate user with email and password.

```typescript
const { login } = useAuthStore();

try {
  await login('user@example.com', 'password123');
  // Success - user is logged in
} catch (error) {
  // Handle error
}
```

#### `register(name: string, email: string, password: string): Promise<void>`
Register a new user account.

```typescript
const { register } = useAuthStore();

try {
  await register('John Doe', 'john@example.com', 'password123');
  // Success - user is registered and logged in
} catch (error) {
  // Handle error
}
```

#### `logout(): void`
Log out the current user and clear session.

```typescript
const { logout } = useAuthStore();

logout();
// User is logged out, session cleared
```

---

### Course Store

**Import:**
```typescript
import { useCourseStore } from '../store/courseStore';
```

**State:**
```typescript
{
  courses: Course[];              // All available courses
  enrolledCourses: string[];      // IDs of enrolled courses
  completedCourses: string[];     // IDs of completed courses
  searchQuery: string;            // Current search term
  selectedCategory: string | null; // Selected category ID
}
```

**Actions:**

#### `loadCourses(): Promise<void>`
Load all courses from JSON data.

```typescript
const { loadCourses } = useCourseStore();

useEffect(() => {
  loadCourses();
}, []);
```

#### `setSearchQuery(query: string): void`
Update search query for filtering.

```typescript
const { setSearchQuery } = useCourseStore();

setSearchQuery('Python');
```

#### `setSelectedCategory(categoryId: string | null): void`
Set selected category for filtering.

```typescript
const { setSelectedCategory } = useCourseStore();

setSelectedCategory('python'); // or null for all
```

#### `getFilteredCourses(): Course[]`
Get courses filtered by search and category.

```typescript
const { getFilteredCourses } = useCourseStore();

const filteredCourses = getFilteredCourses();
```

#### `getFeaturedCourses(): Course[]`
Get all featured courses.

```typescript
const { getFeaturedCourses } = useCourseStore();

const featuredCourses = getFeaturedCourses();
```

#### `getPopularCourses(): Course[]`
Get all popular courses.

```typescript
const { getPopularCourses } = useCourseStore();

const popularCourses = getPopularCourses();
```

#### `enrollInCourse(courseId: string): void`
Enroll user in a course.

```typescript
const { enrollInCourse } = useCourseStore();

enrollInCourse('1');
```

#### `completeCourse(courseId: string): void`
Mark a course as completed.

```typescript
const { completeCourse } = useCourseStore();

completeCourse('1');
```

---

### Progress Store

**Import:**
```typescript
import { useProgressStore } from '../store/progressStore';
```

**State:**
```typescript
{
  progress: Record<string, CourseProgress>; // Progress for each course
}
```

**Types:**
```typescript
interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  currentLessonId: string | null;
  progressPercentage: number;
  totalLessons: number;
  lessons: Record<string, LessonProgress>;
}

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  watchedDuration: number;
  totalDuration: number;
  lastWatchedAt: Date;
}
```

**Actions:**

#### `getCourseProgress(courseId: string): CourseProgress | null`
Get progress for a specific course.

```typescript
const { getCourseProgress } = useProgressStore();

const progress = getCourseProgress('1');
```

#### `updateLessonProgress(courseId: string, lessonId: string, watchedDuration: number, totalDuration: number): void`
Update progress for a lesson.

```typescript
const { updateLessonProgress } = useProgressStore();

updateLessonProgress('1', '1-1', 120, 180); // Watched 120 seconds of 180
```

#### `completeLesson(courseId: string, lessonId: string): void`
Mark a lesson as completed.

```typescript
const { completeLesson } = useProgressStore();

completeLesson('1', '1-1');
```

#### `setCurrentLesson(courseId: string, lessonId: string): void`
Set the current active lesson.

```typescript
const { setCurrentLesson } = useProgressStore();

setCurrentLesson('1', '1-1');
```

#### `calculateProgress(courseId: string, totalLessons: number): void`
Calculate overall progress percentage for a course.

```typescript
const { calculateProgress } = useProgressStore();

calculateProgress('1', 10);
```

---

## 🎨 Components

### Button

**Import:**
```typescript
import Button from '../components/Button';
```

**Props:**
```typescript
interface ButtonProps {
  title: string;                    // Button text
  onPress: () => void;              // Click handler
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Style variant
  size?: 'small' | 'medium' | 'large'; // Size
  loading?: boolean;                // Show loading spinner
  disabled?: boolean;               // Disable button
  icon?: string;                    // Optional emoji icon
  style?: ViewStyle;                // Additional styles
}
```

**Usage:**
```typescript
<Button
  title="Enroll Now"
  onPress={handleEnroll}
  variant="primary"
  size="large"
  loading={isLoading}
  disabled={isEnrolled}
  icon="🚀"
/>
```

**Variants:**
- `primary` - Blue background, white text
- `secondary` - Purple background, white text
- `outline` - Transparent background, blue border
- `ghost` - Transparent background, no border

---

### CourseCard

**Import:**
```typescript
import CourseCard from '../components/CourseCard';
```

**Props:**
```typescript
interface CourseCardProps {
  course: Course;                   // Course object
  variant?: 'featured' | 'popular' | 'list'; // Display variant
}
```

**Usage:**
```typescript
<CourseCard
  course={courseData}
  variant="featured"
/>
```

**Variants:**
- `featured` - Large card with colored background (280px wide)
- `popular` - Horizontal card with thumbnail
- `list` - Compact list item (default)

---

### SearchBar

**Import:**
```typescript
import SearchBar from '../components/SearchBar';
```

**Props:**
```typescript
interface SearchBarProps {
  value: string;                    // Current search value
  onChangeText: (text: string) => void; // Change handler
  placeholder?: string;             // Placeholder text
}
```

**Usage:**
```typescript
<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search courses..."
/>
```

---

### CategoryChip

**Import:**
```typescript
import CategoryChip from '../components/CategoryChip';
```

**Props:**
```typescript
interface CategoryChipProps {
  category: Category;               // Category object
  selected: boolean;                // Selected state
  onPress: () => void;              // Click handler
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
```

**Usage:**
```typescript
<CategoryChip
  category={categoryData}
  selected={selectedCategory === categoryData.id}
  onPress={() => setSelectedCategory(categoryData.id)}
/>
```

---

### LessonItem

**Import:**
```typescript
import LessonItem from '../components/LessonItem';
```

**Props:**
```typescript
interface LessonItemProps {
  lesson: Lesson;                   // Lesson object
  index?: number;                   // Lesson index (0-based)
  lessonNumber?: number;            // Alternative to index (1-based)
  onPress: () => void;              // Click handler
  isCurrentLesson?: boolean;        // Highlight as current
  isActive?: boolean;               // Alternative to isCurrentLesson
}

interface Lesson {
  id: string;
  title: string;
  duration: string;                 // e.g., "15:30"
  completed?: boolean;
  videoUrl?: string;
}
```

**Usage:**
```typescript
<LessonItem
  lesson={lessonData}
  lessonNumber={1}
  isActive={currentLesson === lessonData.id}
  onPress={() => navigateToLesson(lessonData.id)}
/>
```

---

## 🎯 Navigation

### Expo Router

**Navigate to screen:**
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to course detail
router.push(`/course/${courseId}`);

// Navigate to video player
router.push(`/video/${courseId}?lessonId=${lessonId}`);

// Navigate back
router.back();

// Replace current screen (no back)
router.replace('/auth/login');
```

**Get route parameters:**
```typescript
import { useLocalSearchParams } from 'expo-router';

const { id, lessonId } = useLocalSearchParams();
```

---

## 🎨 Theme

**Import:**
```typescript
import { useTheme } from '../context/ThemeContext';
```

**Usage:**
```typescript
const { colors, isDark, toggleTheme } = useTheme();

// Use colors
<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Hello</Text>
</View>

// Toggle theme
<Button title="Toggle Theme" onPress={toggleTheme} />
```

**Available Colors:**
```typescript
{
  primary: string;      // #4A6CF7
  secondary: string;    // #8B5CF6
  background: string;   // #F8F9FA (light) / #121212 (dark)
  white: string;        // #FFFFFF
  text: string;         // #1A1A1A (light) / #FFFFFF (dark)
  textLight: string;    // #6C757D (light) / #B0B0B0 (dark)
  border: string;       // #E0E0E0 (light) / #333333 (dark)
  success: string;      // #28A745
  error: string;        // #DC3545
  warning: string;      // #FFC107
  purple: string;       // #8B5CF6
  cardBg: string;       // #FFFFFF (light) / #1E1E1E (dark)
}
```

---

## 📊 Data Models

### Course
```typescript
interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviews: number;
  students: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  thumbnail: string;
  color: string;
  description: string;
  featured: boolean;
  popular: boolean;
  whatYouLearn: string[];
  curriculum: Lesson[];
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  enrolledCourses: string[];
  completedCourses: string[];
  avatar?: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
```

---

## 🔧 Constants

### Import Theme Constants
```typescript
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
```

**COLORS:**
```typescript
{
  primary: '#4A6CF7',
  secondary: '#8B5CF6',
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textLight: '#6C757D',
  border: '#E0E0E0',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  purple: '#8B5CF6',
  // ... dark mode colors
}
```

**SIZES:**
```typescript
{
  // Spacing
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  
  // Font sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  small: 14,
  tiny: 12,
  
  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 20,
}
```

**SHADOWS:**
```typescript
{
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
}
```

---

## 📱 Video Player (Expo AV)

**Import:**
```typescript
import { Video, ResizeMode } from 'expo-av';
```

**Basic Usage:**
```typescript
const videoRef = useRef<Video>(null);

<Video
  ref={videoRef}
  source={{ uri: videoUrl }}
  style={{ width: '100%', height: 200 }}
  useNativeControls
  resizeMode={ResizeMode.CONTAIN}
  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
/>
```

**Playback Control:**
```typescript
// Play
await videoRef.current?.playAsync();

// Pause
await videoRef.current?.pauseAsync();

// Seek
await videoRef.current?.setPositionAsync(30000); // 30 seconds
```

---

## 🔄 AsyncStorage

**Import:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

**Basic Operations:**
```typescript
// Save data
await AsyncStorage.setItem('key', JSON.stringify(data));

// Get data
const data = await AsyncStorage.getItem('key');
const parsed = JSON.parse(data);

// Remove data
await AsyncStorage.removeItem('key');

// Clear all
await AsyncStorage.clear();
```

---

## 🎯 Common Patterns

### Protected Route
```typescript
useEffect(() => {
  if (!isAuthenticated) {
    router.replace('/auth/login');
  }
}, [isAuthenticated]);
```

### Loading State
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await someAsyncAction();
  } finally {
    setLoading(false);
  }
};
```

### Alert Confirmation
```typescript
Alert.alert(
  'Confirm Action',
  'Are you sure?',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => handleConfirm() }
  ]
);
```

---

This API reference covers all major components, stores, and utilities in the app.
