import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/authStore';

export default function Index() {
  const router = useRouter();
  const { colors } = useTheme();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Small delay to ensure layout is mounted
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/auth/login');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}


