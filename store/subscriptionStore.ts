import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PlanType = 'free' | 'monthly' | 'yearly';

export interface Subscription {
  plan: PlanType;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  autoRenew: boolean;
}

interface SubscriptionState {
  subscription: Subscription | null;
  
  // Actions
  subscribe: (plan: PlanType) => void;
  cancelSubscription: () => void;
  updateAutoRenew: (autoRenew: boolean) => void;
  isSubscribed: () => boolean;
  isPremium: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: null,

      subscribe: (plan: PlanType) => {
        const startDate = new Date();
        let endDate: Date | undefined;

        if (plan === 'monthly') {
          endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (plan === 'yearly') {
          endDate = new Date();
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        set({
          subscription: {
            plan,
            startDate,
            endDate,
            isActive: true,
            autoRenew: plan !== 'free',
          },
        });
      },

      cancelSubscription: () => {
        set((state) => ({
          subscription: state.subscription
            ? { ...state.subscription, autoRenew: false }
            : null,
        }));
      },

      updateAutoRenew: (autoRenew: boolean) => {
        set((state) => ({
          subscription: state.subscription
            ? { ...state.subscription, autoRenew }
            : null,
        }));
      },

      isSubscribed: () => {
        const { subscription } = get();
        if (!subscription || !subscription.isActive) return false;
        if (!subscription.endDate) return subscription.plan === 'free';
        return new Date() < new Date(subscription.endDate);
      },

      isPremium: () => {
        const { subscription } = get();
        return subscription?.plan === 'monthly' || subscription?.plan === 'yearly';
      },
    }),
    {
      name: 'subscription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
