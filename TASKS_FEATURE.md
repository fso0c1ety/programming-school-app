# 🎯 Coding Tasks Feature

## Overview

A comprehensive practical coding challenges system has been added to the programming school app. Students can now practice what they've learned through hands-on coding exercises with varying difficulty levels.

## ✨ Features

### 1. **Task System**
- **Difficulty Levels**: Easy, Medium, Hard
- **Points System**: Earn points for completing tasks (50-200 points per task)
- **Progress Tracking**: Track completed tasks and total points earned
- **Code Editor**: Built-in code editor for writing solutions
- **Hints System**: Progressive hints to help students when stuck
- **Test Cases**: Sample inputs and expected outputs for each task

### 2. **Task Components**

#### TaskItem Component (`components/TaskItem.tsx`)
- Displays task preview with:
  - Task number badge (checkmark when completed)
  - Title and description
  - Difficulty badge (color-coded)
  - Points indicator
  - Completion status

#### TaskDetail Screen (`app/task/[id].tsx`)
- Full task details with:
  - Task description and requirements
  - Difficulty and points badges
  - Test cases section
  - Progressive hints system (reveal one at a time)
  - Code editor with syntax highlighting placeholder
  - Save draft functionality
  - Submit solution button
  - Completion badge for finished tasks

### 3. **Task Store** (`store/taskStore.ts`)
Manages task progress with:
- `completeTask()`: Mark task as complete and award points
- `updateTaskCode()`: Save code drafts
- `incrementTaskAttempt()`: Track number of attempts
- `getCourseTaskProgress()`: Get progress for a specific course
- Persistent storage via AsyncStorage

### 4. **Course Integration**

#### Course Detail Screen Updates
- New "Tasks" tab alongside Overview and Curriculum
- Task statistics showing:
  - Completed tasks count
  - Total points earned
- List of all available tasks for the course
- Enrollment required to access tasks

#### Profile Screen Updates
- Displays total tasks completed across all courses
- Shows total points earned
- Task stats appear when user has completed at least one task

## 📚 Sample Tasks Added

### Python Course (6 Tasks)
1. **FizzBuzz Challenge** (Easy - 50pts)
2. **Palindrome Checker** (Easy - 75pts)
3. **List Comprehension Exercise** (Medium - 100pts)
4. **Dictionary Word Counter** (Medium - 125pts)
5. **Prime Number Generator** (Hard - 150pts)
6. **Bank Account Class** (Hard - 200pts)

### React Native Course (5 Tasks)
1. **Custom Button Component** (Easy - 75pts)
2. **Card List with FlatList** (Medium - 125pts)
3. **Form with Validation** (Medium - 150pts)
4. **Dark Mode Toggle** (Hard - 175pts)
5. **API Integration** (Hard - 200pts)

### JavaScript Course (4 Tasks)
1. **Array Methods Practice** (Easy - 75pts)
2. **Object Destructuring** (Easy - 50pts)
3. **Promise and Async/Await** (Medium - 125pts)
4. **Closure and Currying** (Hard - 175pts)

## 🎮 User Flow

1. **Browse Course** → Navigate to course detail
2. **View Tasks Tab** → See all available coding challenges
3. **Select Task** → Click on a task to view details
4. **Read Requirements** → Understand the problem and test cases
5. **Use Hints (Optional)** → Reveal hints progressively if stuck
6. **Write Code** → Use the built-in code editor
7. **Save Draft** → Save progress at any time
8. **Submit Solution** → Submit when ready
9. **Earn Points** → Get points awarded upon completion
10. **Track Progress** → View stats in Profile and Course tabs

## 🔐 Access Control

- Tasks are only accessible to enrolled students
- Non-enrolled users see a prompt to enroll when clicking tasks
- Login required to enroll in courses

## 💾 Data Structure

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  hints?: string[];
  testCases?: string[];
}
```

### Task Progress Interface
```typescript
interface TaskProgress {
  taskId: string;
  completed: boolean;
  completedAt?: Date;
  attempts: number;
  code?: string;
}

interface CourseTaskProgress {
  courseId: string;
  completedTasks: string[];
  totalPoints: number;
  tasks: Record<string, TaskProgress>;
}
```

## 🎨 UI/UX Features

- **Color-Coded Difficulty**:
  - Easy: Green
  - Medium: Yellow/Orange
  - Hard: Red

- **Progressive Hints**: Students can reveal hints one at a time to avoid getting too much help at once

- **Persistence**: All progress, code drafts, and completions are saved locally

- **Visual Feedback**: 
  - Checkmark badges for completed tasks
  - Trophy icon for points
  - Progress statistics in multiple places

## 🚀 Future Enhancements

Potential additions:
- [ ] Actual code execution and automated testing
- [ ] Solution comparison with best practices
- [ ] Leaderboard system
- [ ] Task difficulty rating by students
- [ ] Discussion forum per task
- [ ] Video solution walkthroughs
- [ ] Code sharing with peers
- [ ] Task completion certificates
- [ ] Daily coding challenges
- [ ] Streak tracking

## 📱 Files Added/Modified

### New Files
- `components/TaskItem.tsx` - Task list item component
- `store/taskStore.ts` - Task progress state management
- `app/task/[id].tsx` - Task detail screen with code editor
- `TASKS_FEATURE.md` - This documentation

### Modified Files
- `app/course/[id].tsx` - Added Tasks tab
- `app/(tabs)/profile.tsx` - Added task statistics
- `app/_layout.tsx` - Registered task route
- `store/courseStore.ts` - Added Task interface
- `data/courses.json` - Added tasks to courses

## 🎓 Educational Value

This feature transforms the learning experience from passive video watching to active coding practice, which:
- Reinforces concepts learned in videos
- Builds muscle memory for syntax and patterns
- Provides immediate feedback
- Gamifies learning with points system
- Encourages problem-solving skills
- Offers scaffolded learning with hints

---

**Students can now learn by doing, not just watching!** 🚀
