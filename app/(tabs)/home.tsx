import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import categoriesData from '../../data/categories.json';
import SearchBar from '../../components/SearchBar';
import CourseCard from '../../components/CourseCard';
import CategoryChip from '../../components/CategoryChip';
import TiltCard from '../../components/TiltCard';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuthStore();
  const { 
    loadCourses, 
    getFeaturedCourses, 
    getPopularCourses,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory 
  } = useCourseStore();

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const featuredCourses = getFeaturedCourses();
  const popularCourses = getPopularCourses();
  const filteredCourses = useCourseStore.getState().getFilteredCourses();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[COLORS.gradients.primary[0], COLORS.gradients.primary[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'Learner'}!</Text>
            <Text style={styles.tagline}>What do you want to learn today?</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Ionicons name="person-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: SIZES.xl, marginBottom: SIZES.xl }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search courses..."
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categoriesData.map((cat: any) => (
            <CategoryChip
              key={cat.id}
              name={cat.name}
              icon={cat.icon}
              color={cat.color}
              selected={selectedCategory === cat.name}
              onPress={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results or Featured */}
      { (searchQuery?.trim() || selectedCategory) ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Results</Text>
            {!!filteredCourses.length && (
              <Text style={[styles.seeAll, { color: colors.textLight }]}>{filteredCourses.length} found</Text>
            )}
          </View>
          <View style={{ paddingHorizontal: SIZES.xl }}>
            {filteredCourses.length === 0 ? (
              <Text style={{ color: colors.textLight }}>No courses match your search.</Text>
            ) : (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} variant="list" />
              ))
            )}
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Courses</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/courses')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} variant="featured" />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Popular Courses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Courses</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/courses')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: SIZES.xl }}>
          {popularCourses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} variant="popular" />
          ))}
        </View>
      </View>

      <View style={{ height: SIZES.xxxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerGradient: {
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.xl,
    marginBottom: SIZES.lg,
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: SIZES.body,
    color: 'rgba(255,255,255,0.9)',
    marginTop: SIZES.xs,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.small,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
    marginBottom: SIZES.base,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingHorizontal: SIZES.xl,
    gap: SIZES.base,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radiusMd,
    borderLeftWidth: 4,
    alignItems: 'center',
    minWidth: 100,
    ...SHADOWS.small,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: SIZES.xs,
  },
  categoryName: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
  },
  featuredScroll: {
    paddingHorizontal: SIZES.xl,
    gap: SIZES.base,
  },
  featuredCard: {
    width: width * 0.7,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.large,
  },
  featuredContent: {
    flex: 1,
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
  popularCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.xl,
    marginBottom: SIZES.base,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.small,
  },
  popularImage: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  popularInstructor: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
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
    color: COLORS.text,
  },
  levelBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
  },
  levelText: {
    fontSize: SIZES.tiny,
    color: COLORS.primary,
    fontWeight: '600',
  },
  priceTag: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.success,
  },
});
