import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'Forever',
    features: [
      'Access to 3 free courses',
      'Basic video lessons',
      'Community support',
      'Progress tracking',
      'Limited coding tasks'
    ],
    popular: false,
    color: '#94A3B8',
  },
  {
    id: 'monthly',
    name: 'Pro',
    price: 9.99,
    period: 'month',
    features: [
      'Unlimited access to all courses',
      'HD video lessons',
      'Priority support',
      'Advanced progress analytics',
      'All coding tasks & challenges',
      'Downloadable resources',
      'Certificate of completion'
    ],
    popular: true,
    color: '#4A6CF7',
  },
  {
    id: 'yearly',
    name: 'Pro Annual',
    price: 99.99,
    period: 'year',
    originalPrice: 119.88,
    features: [
      'Everything in Pro',
      'Save 17% compared to monthly',
      '1-on-1 mentorship sessions',
      'Exclusive community access',
      'Early access to new courses',
      'Lifetime updates',
      'Career guidance & support'
    ],
    popular: false,
    color: '#8B5CF6',
  },
];

export default function Subscription() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuthStore();
  const { subscribe } = useSubscriptionStore();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleContinue = () => {
    // Save the selected subscription plan
    subscribe(selectedPlan as 'free' | 'monthly' | 'yearly');
    
    if (selectedPlan === 'free') {
      // Skip subscription, go to main app
      router.replace('/(tabs)/home');
    } else {
      // In a real app, this would integrate with payment provider (Stripe, RevenueCat, etc.)
      // For now, just navigate to home
      router.replace('/(tabs)/home');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: colors.textLight }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            Choose Your Plan
          </Text>
          <Text style={[styles.subtitle, { color: colors.textLight }]}>
            Start learning with the perfect plan for you
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { 
                  backgroundColor: colors.cardBg,
                  borderColor: selectedPlan === plan.id ? plan.color : colors.border,
                  borderWidth: selectedPlan === plan.id ? 2 : 1,
                },
                plan.popular && styles.popularPlan
              ]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: plan.color }]}>
                  <Ionicons name="star" size={12} color={COLORS.white} />
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}

              {/* Radio Button */}
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  { borderColor: selectedPlan === plan.id ? plan.color : colors.border }
                ]}>
                  {selectedPlan === plan.id && (
                    <View style={[styles.radioInner, { backgroundColor: plan.color }]} />
                  )}
                </View>
              </View>

              {/* Plan Details */}
              <View style={styles.planHeader}>
                <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
                <View style={styles.priceContainer}>
                  {plan.originalPrice && (
                    <Text style={[styles.originalPrice, { color: colors.textLight }]}>
                      ${plan.originalPrice}
                    </Text>
                  )}
                  <Text style={[styles.price, { color: plan.color }]}>
                    ${plan.price}
                  </Text>
                  <Text style={[styles.period, { color: colors.textLight }]}>
                    /{plan.period}
                  </Text>
                </View>
              </View>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Ionicons 
                      name="checkmark-circle" 
                      size={18} 
                      color={selectedPlan === plan.id ? plan.color : colors.success} 
                    />
                    <Text style={[styles.featureText, { color: colors.textLight }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trust Indicators */}
        <View style={[styles.trustSection, { backgroundColor: colors.cardBg }]}>
          <View style={styles.trustItem}>
            <Ionicons name="lock-closed" size={20} color={colors.success} />
            <Text style={[styles.trustText, { color: colors.textLight }]}>
              Secure payment
            </Text>
          </View>
          <View style={styles.trustItem}>
            <Ionicons name="refresh" size={20} color={colors.success} />
            <Text style={[styles.trustText, { color: colors.textLight }]}>
              Cancel anytime
            </Text>
          </View>
          <View style={styles.trustItem}>
            <Ionicons name="shield-checkmark" size={20} color={colors.success} />
            <Text style={[styles.trustText, { color: colors.textLight }]}>
              30-day guarantee
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.cardBg, borderTopColor: colors.border }]}>
        <Button
          title={selectedPlan === 'free' ? 'Start Free' : 'Continue'}
          onPress={handleContinue}
          variant="primary"
          fullWidth
        />
        <Text style={[styles.disclaimer, { color: colors.textLight }]}>
          {selectedPlan !== 'free' && 'Your subscription will renew automatically. Cancel anytime.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxxl,
  },
  skipButton: {
    padding: SIZES.sm,
  },
  skipText: {
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  titleSection: {
    paddingHorizontal: SIZES.xl,
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    textAlign: 'center',
    lineHeight: SIZES.body * 1.5,
  },
  plansContainer: {
    paddingHorizontal: SIZES.xl,
    gap: SIZES.base,
  },
  planCard: {
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    marginBottom: SIZES.base,
    position: 'relative',
    ...SHADOWS.medium,
  },
  popularPlan: {
    ...SHADOWS.large,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: SIZES.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
  },
  popularText: {
    color: COLORS.white,
    fontSize: SIZES.tiny,
    fontWeight: 'bold',
  },
  radioContainer: {
    position: 'absolute',
    top: SIZES.xl,
    right: SIZES.xl,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  planHeader: {
    marginBottom: SIZES.base,
  },
  planName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  originalPrice: {
    fontSize: SIZES.small,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  period: {
    fontSize: SIZES.body,
  },
  featuresContainer: {
    gap: SIZES.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  featureText: {
    fontSize: SIZES.small,
    flex: 1,
  },
  trustSection: {
    marginHorizontal: SIZES.xl,
    marginTop: SIZES.xl,
    padding: SIZES.base,
    borderRadius: SIZES.radiusMd,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: SIZES.tiny,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.xl,
    borderTopWidth: 1,
    ...SHADOWS.large,
  },
  disclaimer: {
    fontSize: SIZES.tiny,
    textAlign: 'center',
    marginTop: SIZES.sm,
  },
});
