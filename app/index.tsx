import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      
      // Small delay to ensure layout is mounted
      setTimeout(() => {
        if (!hasSeenOnboarding) {
          // First time user - show onboarding
          router.replace('/onboarding');
        } else if (isAuthenticated) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/auth/login');
        }
      }, 100);
    };
    
    checkFirstLaunch();
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}


