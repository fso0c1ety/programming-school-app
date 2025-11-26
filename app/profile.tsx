import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { isDark, toggleTheme, colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  const menuItems = [
    { id: 1, title: 'My Courses', icon: '📚', route: '/courses' },
    { id: 2, title: 'Certificates', icon: '🏆', route: '/certificates' },
    { id: 3, title: 'Progress', icon: '📊', route: '/progress' },
    { id: 4, title: 'Settings', icon: '⚙️', route: '/settings' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.cardBg }]} onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: colors.cardBg }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.textLight }]}>john.doe@example.com</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Courses</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>8</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Completed</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>156</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Hours</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>General</Text>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { backgroundColor: colors.cardBg }]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuTitle, { color: colors.text }]}>{item.title}</Text>
            </View>
            <Text style={[styles.chevron, { color: colors.textLight }]}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        
        <View style={[styles.settingItem, { backgroundColor: colors.cardBg }]}>
          <View style={styles.menuLeft}>
            <Text style={styles.menuIcon}>🌙</Text>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBg }]}>
          <View style={styles.menuLeft}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/auth/login')}>
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
  backIcon: {
    fontSize: 24,
    color: COLORS.text,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  editIcon: {
    fontSize: 20,
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: SIZES.md,
  },
  menuTitle: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 24,
    color: COLORS.textLight,
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
