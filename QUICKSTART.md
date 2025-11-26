# Quick Start Guide

Get your Programming Online School app running in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies
```powershell
cd c:\Users\Valon\Desktop\ProgramingOnlineSchool\programming-school-app
npm install
```

### 2. Start Development Server
```powershell
npx expo start
```

### 3. Open on Your Device
- **Android**: Scan QR code with Expo Go app
- **iOS**: Scan QR code with Camera app
- **Emulator**: Press `a` (Android) or `i` (iOS)

## 🎯 Test the App

### Demo Login
```
Email: test@example.com
Password: password123
```

Or create a new account using the Register screen.

## 📱 Main Features to Try

1. **Browse Courses**
   - See featured and popular courses on Home tab
   - Use search bar to find specific courses
   - Filter by category (Python, Web Dev, Mobile Dev, etc.)

2. **Enroll in a Course**
   - Click any course card
   - Read course details and curriculum
   - Click "Enroll Now"
   - Course appears in "My Courses" tab

3. **Watch Videos**
   - Go to "My Courses" tab
   - Click enrolled course
   - Click any lesson in curriculum
   - Video player opens with progress tracking
   - Progress auto-saves every 5 seconds

4. **Track Progress**
   - Watch at least 90% of a video
   - Lesson automatically marked complete
   - Check "My Courses" for progress bars
   - View stats in Profile tab

5. **Dark Mode**
   - Go to Profile tab
   - Toggle "Dark Mode" switch
   - See theme change across all screens

## 🐛 Troubleshooting

### Issue: "Cannot find module 'expo-av'"
**Solution:**
```powershell
npx expo install expo-av
```

### Issue: "Cannot find module 'zustand'"
**Solution:**
```powershell
npm install zustand
```

### Issue: Metro bundler cache issues
**Solution:**
```powershell
npx expo start -c
```

### Issue: App crashes on startup
**Solution:**
1. Clear app data in Expo Go
2. Restart Metro bundler with cache clear
3. Reinstall node_modules:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

## 📂 File Structure Overview

```
app/
├── (tabs)/          # Bottom tab navigation
│   ├── home.tsx     # Home screen
│   ├── courses.tsx  # All courses
│   ├── my-courses.tsx
│   └── profile.tsx
├── auth/            # Login/Register
├── course/[id].tsx  # Course details
└── video/[id].tsx   # Video player

components/          # Reusable UI
├── Button.tsx
├── CourseCard.tsx
├── SearchBar.tsx
├── CategoryChip.tsx
└── LessonItem.tsx

store/              # State management
├── authStore.ts    # User auth
├── courseStore.ts  # Courses & enrollment
└── progressStore.ts # Video progress

data/               # JSON data
├── courses.json    # 8 courses
├── users.json      # Demo user
└── categories.json # 8 categories
```

## 🔑 Key Components

### Button
4 variants (primary, secondary, outline, ghost) and 3 sizes

### CourseCard
3 display modes (featured, popular, list)

### LessonItem
Shows lesson with completion status

## 🚀 Next Steps

After testing the app:

1. **Customize Courses**: Edit `data/courses.json` to add your own courses
2. **Add Categories**: Update `data/categories.json` with your categories
3. **Backend Integration**: Follow README.md for Firebase setup
4. **Build for Production**: Run `npx expo build` when ready

## 📖 Full Documentation

See `README.md` for complete documentation including:
- Full feature list
- Component API reference
- State management guide
- Firebase integration steps
- Future enhancement roadmap

## 💡 Tips

- **Development**: Use `npx expo start` with QR code for fastest testing
- **Debugging**: Press `m` in terminal to open developer menu
- **Reloading**: Shake device or press `r` to reload
- **Performance**: Test on real device for accurate performance

---

Happy coding! 🎉
