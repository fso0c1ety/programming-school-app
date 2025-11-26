import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { COLORS, SIZES } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useCourseStore } from '../../store/courseStore';
import SearchBar from '../../components/SearchBar';
import CourseCard from '../../components/CourseCard';
import CategoryChip from '../../components/CategoryChip';
import categoriesData from '../../data/categories.json';

export default function Courses() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const {
    loadCourses,
    getFilteredCourses,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCourseStore();

  useEffect(() => {
    loadCourses();
    if (params.category) {
      setSelectedCategory(params.category as string);
    }
  }, [params.category]);

  const filteredCourses = getFilteredCourses();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>All Courses</Text>
        <Text style={[styles.subtitle, { color: colors.textLight }]}>
          {filteredCourses.length} courses available
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by title, instructor..."
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryChip
            name="All"
            icon="🔥"
            color={COLORS.primary}
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
          />
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

      {/* Course List */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} variant="list" />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📚</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>No courses found</Text>
            <Text style={[styles.emptySubtext, { color: colors.textLight }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxxl,
    paddingBottom: SIZES.base,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.small,
  },
  searchSection: {
    paddingHorizontal: SIZES.xl,
    marginBottom: SIZES.base,
  },
  filterSection: {
    paddingHorizontal: SIZES.xl,
    marginBottom: SIZES.base,
  },
  listContainer: {
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.xl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxxl * 2,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: SIZES.base,
  },
  emptyText: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  emptySubtext: {
    fontSize: SIZES.body,
  },
});
