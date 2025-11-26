import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function CertificatesScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      courseName: 'React Native Fundamentals',
      issueDate: 'November 15, 2025',
      instructor: 'Dr. Sarah Chen',
      grade: 'A+',
      color: COLORS.gradients.primary,
    },
    {
      id: 2,
      courseName: 'Advanced JavaScript',
      issueDate: 'October 20, 2025',
      instructor: 'Prof. Mike Johnson',
      grade: 'A',
      color: COLORS.gradients.secondary,
    },
  ];

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
          <Text style={styles.headerTitle}>My Certificates</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Ionicons name="trophy" size={32} color={COLORS.primary} />
            <Text style={[styles.statNumber, { color: colors.text }]}>{certificates.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>Earned</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Ionicons name="star" size={32} color={COLORS.secondary} />
            <Text style={[styles.statNumber, { color: colors.text }]}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>In Progress</Text>
          </View>
        </View>

        {/* Certificates List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Achievements</Text>
          
          {certificates.map((cert) => (
            <TouchableOpacity
              key={cert.id}
              style={[styles.certificateCard, { backgroundColor: colors.cardBg }]}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={cert.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.certificateBadge}
              >
                <Ionicons name="ribbon" size={32} color="white" />
              </LinearGradient>
              
              <View style={styles.certificateContent}>
                <Text style={[styles.certificateName, { color: colors.text }]}>
                  {cert.courseName}
                </Text>
                <Text style={[styles.certificateInstructor, { color: colors.textLight }]}>
                  Instructor: {cert.instructor}
                </Text>
                <View style={styles.certificateFooter}>
                  <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textLight} />
                    <Text style={[styles.certificateDate, { color: colors.textLight }]}>
                      {cert.issueDate}
                    </Text>
                  </View>
                  <View style={[styles.gradeBadge, { backgroundColor: COLORS.success + '20' }]}>
                    <Text style={[styles.gradeText, { color: COLORS.success }]}>
                      Grade: {cert.grade}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.downloadButton}>
                <Ionicons name="download-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State for No Certificates */}
        {certificates.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="ribbon-outline" size={80} color={colors.textLight} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Certificates Yet
            </Text>
            <Text style={[styles.emptyText, { color: colors.textLight }]}>
              Complete courses to earn your certificates
            </Text>
          </View>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    gap: SIZES.base,
    marginBottom: SIZES.xl,
  },
  statCard: {
    flex: 1,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: SIZES.sm,
  },
  statLabel: {
    fontSize: SIZES.small,
    marginTop: SIZES.xs,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.base,
  },
  certificateCard: {
    flexDirection: 'row',
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.base,
    ...SHADOWS.small,
  },
  certificateBadge: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  certificateContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  certificateName: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  certificateInstructor: {
    fontSize: SIZES.tiny,
    marginBottom: SIZES.xs,
  },
  certificateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  certificateDate: {
    fontSize: SIZES.tiny,
  },
  gradeBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  gradeText: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
  downloadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxxl * 2,
  },
  emptyTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginTop: SIZES.xl,
    marginBottom: SIZES.sm,
  },
  emptyText: {
    fontSize: SIZES.body,
    textAlign: 'center',
  },
});
