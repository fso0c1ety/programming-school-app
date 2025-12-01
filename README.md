# Programming Online School App

A fully functional React Native mobile application for online programming courses, built with Expo and React Native. Features include course browsing, video playback, progress tracking, user authentication, and dark mode support.

## 🚀 Features

### Core Functionality
- **User Authentication**: Email/password login and registration with session persistence
- **Course Catalog**: Browse 8+ programming courses across multiple categories
- **Search & Filter**: Real-time search and category-based filtering
- **Video Player**: Full-featured video player with progress tracking
- **Progress Tracking**: Track lesson completion and watch duration
- **Coding Tasks**: Practical coding challenges with hints, test cases, and points system
- **Dark Mode**: Complete theme support with light/dark mode toggle
- **Responsive UI**: Beautiful, consistent design across all screens

### Screens
1. **Authentication**
   - Login screen with email/password
   - Register screen with validation
   - Session persistence with AsyncStorage

2. **Home Tab**
   - Featured courses carousel
   - Popular courses section
   - Search bar with real-time filtering
   - Category chips for quick filtering

3. **Courses Tab**
   - All courses list
   - Search functionality
   - Category filter
   - Course count display

4. **My Courses Tab**
   - Enrolled courses with progress bars
   - Completed courses section
   - Statistics cards (enrolled, completed, hours)
   - Empty state for new users

5. **Profile Tab**
   - User information display
   - Course statistics
   - Dark mode toggle
   - Notification settings
   - Logout functionality

6. **Course Detail**
   - Complete course information
   - Overview, Curriculum, and Tasks tabs
   - Instructor details
   - Enroll/Continue buttons
   - Lesson list with completion status
   - Practical coding challenges section

7. **Coding Tasks**
   - Hands-on coding challenges
   - Difficulty levels (Easy, Medium, Hard)
   - Points system (50-200 points per task)
   - Progressive hints system
   - Test cases for each task
   - Built-in code editor
   - Save draft functionality
   - Task completion tracking

8. **Video Player**
   - Full video playback with native controls
   - Progress tracking with auto-save
   - Next/Previous lesson navigation
   - Course curriculum sidebar
   - Auto-completion at 90% watch time

## 📁 Project Structure

```
programming-school-app/
├── app/
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── _layout.tsx      # Tab navigator configuration
│   │   ├── home.tsx         # Home screen with featured courses
│   │   ├── courses.tsx      # All courses with search/filter
│   │   ├── my-courses.tsx   # User's enrolled courses
│   │   └── profile.tsx      # User profile and settings
│   ├── auth/                # Authentication screens
│   │   ├── login.tsx        # Login screen
│   │   └── register.tsx     # Registration screen
│   ├── course/              # Course-related screens
│   │   └── [id].tsx         # Course detail screen (dynamic route)
│   └── video/               # Video player screens
│       └── [id].tsx         # Video player (dynamic route)
├── components/              # Reusable components
│   ├── Button.tsx           # Custom button (4 variants, 3 sizes)
│   ├── CourseCard.tsx       # Course card (3 variants)
│   ├── SearchBar.tsx        # Search input component
│   ├── CategoryChip.tsx     # Category filter chips
│   └── LessonItem.tsx       # Lesson list item
├── store/                   # Zustand state management
│   ├── authStore.ts         # Authentication state
│   ├── courseStore.ts       # Course data and filtering
│   └── progressStore.ts     # Lesson progress tracking
├── data/                    # JSON data files
│   ├── courses.json         # 8 courses with full details
│   ├── users.json           # Demo user data
│   └── categories.json      # 8 course categories
├── constants/               # App constants
│   └── theme.ts             # Theme colors and sizes
└── context/                 # React contexts
    └── ThemeContext.tsx     # Theme provider for dark mode
```

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile framework
- **Expo SDK 54**: Development platform and runtime
- **Expo Router**: File-based navigation system
- **Zustand**: Lightweight state management
- **AsyncStorage**: Local data persistence
- **Expo AV**: Video playback functionality
- **TypeScript**: Type-safe development

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app on your mobile device (for testing)

### Setup Steps

1. **Clone or navigate to the project directory**
```powershell
cd c:\Users\Valon\Desktop\ProgramingOnlineSchool\programming-school-app
```

2. **Install dependencies**
```powershell
npm install
```

3. **Start the development server**
```powershell
npx expo start
```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 🎨 Components Library

### Button Component
```tsx
<Button
  title="Enroll Now"
  onPress={handleEnroll}
  variant="primary" // primary | secondary | outline | ghost
  size="large"      // small | medium | large
  loading={false}
  disabled={false}
/>
```

### CourseCard Component
```tsx
<CourseCard
  course={courseData}
  variant="featured" // featured | popular | list
/>
```

### SearchBar Component
```tsx
<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search courses..."
/>
```

### CategoryChip Component
```tsx
<CategoryChip
  category={category}
  selected={selectedCategory === category.id}
  onPress={() => setSelectedCategory(category.id)}
/>
```

### LessonItem Component
```tsx
<LessonItem
  lesson={lessonData}
  lessonNumber={1}
  isActive={currentLesson === lessonData.id}
  onPress={() => navigateToLesson(lessonData.id)}
/>
```

## 🔄 State Management

### Auth Store
```typescript
const { user, isAuthenticated, login, register, logout } = useAuthStore();

// Login
await login(email, password);

// Register
await register(name, email, password);

// Logout
logout();
```

### Course Store
```typescript
const { 
  courses, 
  enrolledCourses, 
  searchQuery, 
  selectedCategory,
  setSearchQuery,
  setSelectedCategory,
  enrollInCourse,
  completeCourse 
} = useCourseStore();

// Enroll in course
enrollInCourse(courseId);

// Filter courses
const filtered = getFilteredCourses();
```

### Progress Store
```typescript
const { 
  progress, 
  updateLessonProgress, 
  completeLesson, 
  setCurrentLesson 
} = useProgressStore();

// Update progress
updateLessonProgress(courseId, lessonId, watchedSeconds, totalSeconds);

// Complete lesson
completeLesson(courseId, lessonId);

// Set current lesson
setCurrentLesson(courseId, lessonId);
```

## 📊 Data Models

### Course Model
```typescript
{
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviews: number;
  students: string;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
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

### Lesson Model
```typescript
{
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}
```

### User Model
```typescript
{
  id: string;
  name: string;
  email: string;
  password: string;
  enrolledCourses: string[];
  completedCourses: string[];
  avatar?: string;
}
```

## 🎯 Key Features Implementation

### Video Progress Tracking
- Automatic progress saving during playback
- Auto-completion at 90% watch time
- Lesson completion badges
- Progress bars on enrolled courses

### Search & Filter
- Real-time search across course titles
- Category-based filtering
- Combined search + category filter
- Search term highlighting

### Dark Mode
- System-wide theme toggle
- Persistent theme preference
- Smooth theme transitions
- All components theme-aware

### Navigation Flow
```
Login/Register → Home (Tabs)
                  ├─ Home Tab
                  ├─ Courses Tab → Course Detail → Video Player
                  ├─ My Courses Tab → Course Detail → Video Player
                  └─ Profile Tab → Logout → Login
```

## 🔐 Authentication

Currently uses local JSON-based authentication with AsyncStorage persistence. 

### Demo Credentials
```
Email: test@example.com
Password: password123
```

### Future Enhancement: Firebase Integration
To integrate Firebase authentication:

1. **Install Firebase**
```powershell
npm install firebase
```

2. **Update authStore.ts**
```typescript
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// In login function:
const userCredential = await signInWithEmailAndPassword(auth, email, password);

// In register function:
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
```

3. **Add Firebase config**
Create `config/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 🎨 Theming

### Color Palette
```typescript
// Light Mode
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
  warning: '#FFC107'
}

// Dark Mode
{
  primary: '#4A6CF7',
  secondary: '#8B5CF6',
  background: '#121212',
  white: '#FFFFFF',
  text: '#FFFFFF',
  textLight: '#B0B0B0',
  border: '#333333',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107'
}
```

## 🧪 Testing the App

### Test User Flow
1. Open app → See login screen
2. Register with email/password
3. Browse featured courses on home
4. Search for "Python"
5. Filter by "Web Dev" category
6. Click a course card → See course details
7. Click "Enroll Now"
8. Go to "My Courses" tab → See enrolled course
9. Click course → Click lesson → Watch video
10. Video progress automatically saves
11. Go to Profile → Toggle dark mode
12. Logout → Return to login screen

### Demo Courses
- Complete Python Bootcamp (Beginner, 12h)
- React Native Masterclass (Intermediate, 18h)
- JavaScript Essentials (Beginner, 10h)
- Java for Beginners (Beginner, 14h)
- SwiftUI Fundamentals (Intermediate, 16h)
- Data Structures & Algorithms (Advanced, 20h)
- Machine Learning Basics (Intermediate, 15h)
- SQL Database Design (Beginner, 8h)

## 🚧 Future Enhancements

- [ ] Firebase/Supabase backend integration
- [ ] Google OAuth authentication
- [ ] Apple Sign In
- [ ] Payment integration (Stripe/PayPal)
- [ ] Course ratings and reviews
- [ ] Discussion forums per course
- [ ] Certificate generation
- [ ] Offline video download
- [ ] Push notifications for new courses
- [ ] Course recommendations based on history
- [ ] Instructor dashboard
- [ ] Quiz/assessment system
- [ ] Code playground integration
- [ ] Social sharing

## 📱 Build iOS IPA in GitHub Actions

You can generate an iOS `.ipa` for personal/internal use without publishing to the App Store using Expo EAS on GitHub Actions.

### Requirements
- Apple Developer account (Individual or Company)
- Register your iPhone UDID in Apple Developer portal (Devices)
- Expo account and EAS token (`eas token:create`)

### One-time setup
1. Install and login locally:
  - `npm install -g eas-cli`
  - `eas login`
2. Configure EAS in the project:
  - `eas build:configure`
  - `eas credentials` → let EAS manage iOS certs/profiles (Ad Hoc/Internal)
3. Create an EAS token:
  - `eas token:create` → copy the token

### GitHub Secrets
Add repository secrets: `EAS_TOKEN` (required). Optionally `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` if not using EAS-managed flow.

### Trigger the build
1. Open GitHub → Actions → "Build iOS IPA (EAS)"
2. Click "Run workflow" → choose profile (default `development`)
3. Wait until completion; download the `.ipa` artifact.

### Install on device
- Use the internal distribution link from Expo (`expo.dev`) and open on your iPhone, or
- Download the `.ipa` and install via Apple Configurator 2 (drag-drop) on macOS. Ensure your device UDID is registered.

Notes:
- Changing bundle identifier or app name may require regenerating credentials via `eas credentials`.
- Ad-hoc/internal installs fail if the device is not in the provisioning profile.

## 📱 Build Android APK in GitHub Actions

You can generate an Android APK for installation on any Android device using Expo EAS on GitHub Actions.

### Requirements
- Expo account and EAS token (`eas token:create`)

### One-time setup
1. Install and login locally:
   - `npm install -g eas-cli`
   - `eas login`
2. Create an EAS token:
   - `eas token:create` → copy the token

### GitHub Secrets
Add repository secret: `EAS_TOKEN` (the token from `eas token:create`)

### Trigger the build
1. Open GitHub → Actions → "Build Android APK (EAS)"
2. Click "Run workflow" → choose profile (default `development`)
3. Wait until completion; download the `.apk` artifact

### Install on device
- Download the `.apk` artifact from GitHub Actions
- Transfer to your Android device (email, USB, cloud storage, etc.)
- Open the APK on your device and allow installation from unknown sources when prompted
- The app will install with your custom icon (logo2.png)

Notes:
- APK builds don't require signing for development/testing
- For production distribution via Play Store, you'll need to build an AAB instead

## 📝 License

This project is created for educational purposes.

## 👥 Credits

Built with ❤️ using React Native and Expo

---

**Need Help?** Check the Expo documentation at https://docs.expo.dev
