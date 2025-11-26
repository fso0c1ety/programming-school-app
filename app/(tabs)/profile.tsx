import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';
import { useCourseStore } from '../../store/courseStore';

export default function Profile() {
  const router = useRouter();
  const { isDark, toggleTheme, colors } = useTheme();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { courses, enrolledCourses, completedCourses } = useCourseStore();
  const [notifications, setNotifications] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  // Calculate user stats
  const enrolledCoursesCount = enrolledCourses.length;
  const completedCoursesCount = completedCourses.length;
  const parseDurationToHours = (duration: any) => {
    if (typeof duration === 'number') return duration;
    if (typeof duration !== 'string') return 0;
    // Examples: "12 hours", "10 hrs", "18h" -> extract numeric hours
    const hoursMatch = duration.match(/(\d+)(?=\s*hour|\s*hrs?|\s*h)/i);
    if (hoursMatch) return Number(hoursMatch[1]);
    // Examples: "35:20" (mm:ss) or "1:30" (hh:mm)
    const timeMatch = duration.match(/^(\d+):(\d{2})$/);
    if (timeMatch) {
      const a = Number(timeMatch[1]);
      const b = Number(timeMatch[2]);
      // Heuristic: if first segment >= 60, treat as minutes:seconds -> convert to hours
      // else treat as hours:minutes
      if (a >= 60) {
        return +(a / 60).toFixed(2);
      }
      return +(a + b / 60).toFixed(2);
    }
    return 0;
  };

  const totalHours = enrolledCourses.reduce((sum, courseId) => {
    const course = courses.find(c => c.id === courseId);
    return sum + parseDurationToHours(course?.duration);
  }, 0);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    { id: 1, title: 'My Courses', icon: '📚', route: '/(tabs)/my-courses' },
    { id: 2, title: 'Certificates', icon: '🏆', route: '/certificates' },
    { id: 3, title: 'Progress', icon: '📊', route: '/progress' },
    { id: 4, title: 'Settings', icon: '⚙️', route: '/settings' },
  ];

  const TiltCard = ({ children, style, onPress }: { children: React.ReactNode; style?: any; onPress?: () => void }) => {
    const tilt = new Animated.Value(0);
    const rotate = tilt.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '2deg'] });
    const elevation = tilt.interpolate({ inputRange: [0, 1], outputRange: [4, 12] });
    const onPressIn = () => {
      Animated.spring(tilt, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
    };
    const onPressOut = () => {
      Animated.spring(tilt, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
    };
    return (
      <TouchableOpacity activeOpacity={0.95} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
        <Animated.View style={[style, { transform: [{ perspective: 600 }, { rotateX: '0deg' }, { rotateY: rotate }, { scale: tilt.interpolate({ inputRange: [0,1], outputRange: [1, 0.997] }) }]}] }>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.cardBg }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <TiltCard style={[styles.profileCard3D, { backgroundColor: colors.cardBg }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
          </Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'User'}</Text>
        <Text style={[styles.email, { color: colors.textLight }]}>{user?.email || 'user@example.com'}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{enrolledCoursesCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Courses</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{completedCoursesCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Completed</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{Math.round(totalHours)}</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Hours</Text>
          </View>
        </View>
      </TiltCard>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>General</Text>
        {menuItems.map((item) => (
          <TiltCard
            key={item.id}
            style={[styles.menuItem3D, { backgroundColor: colors.cardBg }]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
                {item.title === 'My Courses' && (<Ionicons name="book-outline" size={18} color={colors.primary} />)}
                {item.title === 'Certificates' && (<Ionicons name="trophy-outline" size={18} color={colors.primary} />)}
                {item.title === 'Progress' && (<Ionicons name="bar-chart-outline" size={18} color={colors.primary} />)}
                {item.title === 'Settings' && (<Ionicons name="settings-outline" size={18} color={colors.primary} />)}
              </View>
              <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
          </TiltCard>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        
        <TiltCard style={[styles.settingItem3D, { backgroundColor: colors.cardBg }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
              <Ionicons name="moon-outline" size={18} color={colors.primary} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </TiltCard>

        <TiltCard style={[styles.settingItem3D, { backgroundColor: colors.cardBg }]}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
              <Ionicons name="notifications-outline" size={18} color={colors.primary} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </TiltCard>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: SIZES.xxxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  profileCard3D: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  name: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  email: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    marginBottom: SIZES.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  statValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.xs,
  },
  statLabel: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
  },
  section: {
    marginBottom: SIZES.xl,
    paddingHorizontal: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
    ...SHADOWS.small,
  },
  menuItem3D: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  menuTitle: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
    ...SHADOWS.small,
  },
  settingItem3D: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    marginHorizontal: SIZES.xl,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
});
