import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Learn to Code\nAnytime, Anywhere',
    description: 'Master programming with interactive lessons designed for all skill levels',
    emoji: '💻',
  },
  {
    id: 2,
    title: 'Build Real\nProjects',
    description: 'Apply your knowledge with hands-on coding challenges and quizzes',
    emoji: '🚀',
  },
  {
    id: 3,
    title: 'Track Your\nProgress',
    description: 'Monitor your learning journey and earn certificates as you grow',
    emoji: '📊',
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { colors } = useTheme();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/auth/login');
    }
  };

  const handleSkip = () => {
    router.push('/auth/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textLight }]}>Skip</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <View style={[styles.emojiContainer, { backgroundColor: colors.cardBg }]}>
          <Text style={styles.emoji}>{slides[currentIndex].emoji}</Text>
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>{slides[currentIndex].title}</Text>
        <Text style={[styles.description, { color: colors.textLight }]}>{slides[currentIndex].description}</Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: colors.border },
              index === currentIndex && { backgroundColor: colors.primary, width: 24 },
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.xxxl,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: SIZES.sm,
  },
  skipText: {
    color: COLORS.textLight,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xxxl,
    ...SHADOWS.large,
  },
  emoji: {
    fontSize: 120,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.base,
    lineHeight: 40,
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SIZES.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.sm,
    marginBottom: SIZES.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontWeight: 'bold',
  },
});
