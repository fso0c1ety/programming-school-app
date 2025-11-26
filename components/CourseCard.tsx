import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import TiltCard from './TiltCard';
import { useTheme } from '../context/ThemeContext';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: string;
  thumbnail: string;
  color: string;
  level: string;
  duration: string;
  price: number;
}

interface CourseCardProps {
  course: Course;
  variant?: 'featured' | 'popular' | 'list';
}

export default function CourseCard({ course, variant = 'list' }: CourseCardProps) {
  const router = useRouter();
  const { colors } = useTheme();

  const emojiToMdi: Record<string, string> = {
    '🌐': 'web',
    '📱': 'cellphone',
    '🤖': 'robot',
    '🐍': 'language-python',
    '☕': 'language-java',
    '⚙️': 'language-cpp',
    '🎯': 'target',
    '🔒': 'lock',
    '⚡': 'language-javascript',
    '⚛️': 'react',
  };
  const thumbIcon = emojiToMdi[course.thumbnail] || course.thumbnail;

  const handlePress = () => {
    router.push(`/course/${course.id}`);
  };

  if (variant === 'featured') {
    return (
      <TiltCard style={styles.featuredCard} onPress={handlePress}>
        <LinearGradient
          colors={[COLORS.gradients.primary[0], COLORS.gradients.primary[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredIcon}>
            <MaterialCommunityIcons name={thumbIcon as any} size={36} color={COLORS.white} />
          </View>
          <Text style={styles.featuredTitle} numberOfLines={1} ellipsizeMode="tail">{course.title}</Text>
          <Text style={styles.featuredInstructor} numberOfLines={1} ellipsizeMode="tail">by {course.instructor}</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{course.rating}</Text>
            </View>
            <Text style={styles.studentsText}>{course.students} students</Text>
          </View>
        </LinearGradient>
      </TiltCard>
    );
  }

  if (variant === 'popular') {
    return (
      <TiltCard style={[styles.popularCard, { backgroundColor: colors.cardBg }]} onPress={handlePress}>
        <View style={[styles.popularImage, { backgroundColor: colors.background }]}>
          <MaterialCommunityIcons name={thumbIcon as any} size={40} color={colors.text} />
        </View>
        <View style={styles.popularContent}>
          <Text style={[styles.popularTitle, { color: colors.text }]}>{course.title}</Text>
          <Text style={[styles.popularInstructor, { color: colors.textLight }]}>{course.instructor}</Text>
          <View style={styles.popularFooter}>
            <View style={styles.popularRating}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={[styles.popularRatingText, { color: colors.text }]}>{course.rating}</Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: colors.background }]}>
              <Text style={[styles.levelText, { color: colors.primary }]}>{course.level}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceTag}>
          <Text style={[styles.priceText, { color: colors.primary }]}>
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </Text>
        </View>
      </TiltCard>
    );
  }

  // Default list variant
  return (
    <TiltCard style={[styles.listCard, { backgroundColor: colors.cardBg }]} onPress={handlePress}>
      <View style={[styles.listThumbnail, { backgroundColor: course.color }]}>
        <MaterialCommunityIcons name={thumbIcon as any} size={36} color={COLORS.white} />
      </View>
      <View style={styles.listContent}>
        <Text style={[styles.listTitle, { color: colors.text }]}>{course.title}</Text>
        <Text style={[styles.listInstructor, { color: colors.textLight }]}>{course.instructor}</Text>
        <View style={styles.listFooter}>
          <View style={styles.listRating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.listRatingText, { color: colors.text }]}>{course.rating}</Text>
          </View>
          <Text style={[styles.listDuration, { color: colors.textLight }]}>• {course.duration}</Text>
          <Text style={[styles.listLevel, { color: colors.primary }]}>• {course.level}</Text>
        </View>
      </View>
    </TiltCard>
  );
}

const styles = StyleSheet.create({
  // Featured variant
  featuredCard: {
    width: 280,
    borderRadius: SIZES.radiusLg,
    marginRight: SIZES.base,
    // custom softer shadow to avoid visible bottom line
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    height: 200, // ensure consistent card height across items
  },
  featuredGradient: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xl,
    height: '100%',
    justifyContent: 'space-between',
  },
  featuredIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  featuredIconText: {
    fontSize: 36,
  },
  featuredTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  featuredInstructor: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SIZES.base,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    gap: SIZES.xs,
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  studentsText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: SIZES.tiny,
  },

  // Popular variant
  popularCard: {
    flexDirection: 'row',
    marginBottom: SIZES.base,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.small,
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  popularEmoji: {
    fontSize: 40,
  },
  popularContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  popularTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  popularInstructor: {
    fontSize: SIZES.tiny,
    marginBottom: SIZES.xs,
  },
  popularFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  popularRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starSmall: {
    fontSize: 12,
  },
  popularRatingText: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
  levelBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
  },
  levelText: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
  priceTag: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },

  // List variant
  listCard: {
    flexDirection: 'row',
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.base,
    ...SHADOWS.small,
  },
  listThumbnail: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  listEmoji: {
    fontSize: 36,
  },
  listContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  listInstructor: {
    fontSize: SIZES.tiny,
    marginBottom: SIZES.xs,
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  listRatingText: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
  listDuration: {
    fontSize: SIZES.tiny,
  },
  listLevel: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
});
