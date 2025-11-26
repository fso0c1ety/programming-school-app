import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [courseReminders, setCourseReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [downloadQuality, setDownloadQuality] = useState('HD');

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'push',
          icon: 'notifications-outline',
          label: 'Push Notifications',
          value: notifications,
          onToggle: setNotifications,
          type: 'toggle',
        },
        {
          id: 'email',
          icon: 'mail-outline',
          label: 'Email Updates',
          value: emailUpdates,
          onToggle: setEmailUpdates,
          type: 'toggle',
        },
        {
          id: 'reminders',
          icon: 'alarm-outline',
          label: 'Course Reminders',
          value: courseReminders,
          onToggle: setCourseReminders,
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'dark',
          icon: 'moon-outline',
          label: 'Dark Mode',
          value: darkMode,
          onToggle: setDarkMode,
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          icon: 'person-outline',
          label: 'Edit Profile',
          type: 'navigate',
          route: '/profile',
        },
        {
          id: 'password',
          icon: 'lock-closed-outline',
          label: 'Change Password',
          type: 'navigate',
        },
        {
          id: 'privacy',
          icon: 'shield-checkmark-outline',
          label: 'Privacy Settings',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          icon: 'help-circle-outline',
          label: 'Help Center',
          type: 'navigate',
        },
        {
          id: 'feedback',
          icon: 'chatbubble-outline',
          label: 'Send Feedback',
          type: 'navigate',
        },
        {
          id: 'about',
          icon: 'information-circle-outline',
          label: 'About',
          type: 'navigate',
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    if (item.type === 'toggle') {
      return (
        <View key={item.id} style={[styles.settingItem, { backgroundColor: colors.cardBg }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '15' }]}>
              <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.border, true: COLORS.primary }}
            thumbColor={item.value ? 'white' : colors.background}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.settingItem, { backgroundColor: colors.cardBg }]}
        onPress={() => item.route && router.push(item.route)}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '15' }]}>
            <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
          </View>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={COLORS.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => renderSettingItem(item))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: COLORS.error + '15' }]}
          onPress={() => router.push('/auth/login')}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
          <Text style={[styles.logoutText, { color: COLORS.error }]}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={[styles.versionText, { color: colors.textLight }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...SHADOWS.glow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: SIZES.xl,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
  },
  sectionContent: {
    gap: SIZES.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.small,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  settingLabel: {
    fontSize: SIZES.body,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginTop: SIZES.xl,
    gap: SIZES.sm,
  },
  logoutText: {
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: SIZES.small,
    marginTop: SIZES.xl,
    marginBottom: SIZES.xl,
  },
});
