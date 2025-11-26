import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

type Scores = Record<string, number>;

const langs = [
  { key: 'python', name: 'Python', icon: 'language-python', total: 8 },
  { key: 'javascript', name: 'JavaScript', icon: 'language-javascript', total: 8 },
  { key: 'java', name: 'Java', icon: 'language-java', total: 8 },
  { key: 'cpp', name: 'C++', icon: 'language-cpp', total: 8 },
];

export default function Progress() {
  const [scores, setScores] = useState<Scores>({});
  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      const loaded: Scores = {};
      for (const lang of langs) {
        const s = await AsyncStorage.getItem(`quiz:${lang.key}:score`);
        loaded[lang.key] = s ? Number(s) : 0;
      }
      setScores(loaded);
    })();
  }, []);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = langs.length * 8;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.cardBg }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Your Progress</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Overall Progress */}
      <View style={[styles.overall, { backgroundColor: colors.primary }]}>
        <Text style={styles.percentageText}>{percentage}%</Text>
        <Text style={styles.percentageLabel}>Overall Completion</Text>
        <Text style={styles.scoreText}>{totalScore} / {maxScore} points</Text>
      </View>
      {langs.map((l) => {
        const score = scores[l.key] || 0;
        const pct = Math.round((score / l.total) * 100);
        return (
          <View key={l.key} style={[styles.card, { backgroundColor: colors.cardBg }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.langIconContainer, { backgroundColor: COLORS.primary + '15' }]}> 
                  <MaterialCommunityIcons name={l.icon as any} size={20} color={colors.primary} />
                </View>
              <Text style={[styles.langName, { color: colors.text }]}>{l.name}</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={[styles.scoreLabel, { color: colors.textLight }]}>{score} / {l.total} correct ({pct}%)</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: SIZES.xl, paddingBottom: SIZES.xxxl, paddingTop: SIZES.xxxl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SIZES.lg },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.small },
  backIcon: { fontSize: 24, color: COLORS.text },
  headerTitle: { fontSize: SIZES.h2, fontWeight: 'bold', color: COLORS.text },
  overall: { backgroundColor: COLORS.primary, paddingVertical: SIZES.lg, paddingHorizontal: SIZES.base, borderRadius: SIZES.radiusLg, alignItems: 'center', marginBottom: SIZES.lg, ...SHADOWS.medium },
  percentageText: { fontSize: 36, fontWeight: 'bold', color: COLORS.white },
  percentageLabel: { fontSize: SIZES.body, color: 'rgba(255,255,255,0.9)', marginTop: SIZES.xs },
  scoreText: { fontSize: SIZES.small, color: 'rgba(255,255,255,0.8)', marginTop: SIZES.sm },
  card: { backgroundColor: COLORS.white, padding: SIZES.base, borderRadius: SIZES.radiusMd, marginBottom: SIZES.base, ...SHADOWS.small },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.sm },
  langIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  langName: { fontSize: SIZES.h4, fontWeight: 'bold', color: COLORS.text },
  progressBar: { height: 10, backgroundColor: COLORS.background, borderRadius: 6, overflow: 'hidden', marginBottom: SIZES.sm },
  progressFill: { height: '100%', backgroundColor: COLORS.primary },
  scoreLabel: { fontSize: SIZES.small, color: COLORS.textLight },
});
