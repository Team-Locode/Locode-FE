import { create } from "zustand";
import type { OnboardingStateType } from "../types/onboardingType";
export const useOnboardingStore = create<OnboardingStateType>((set) => ({
  currentIndex: 0,
  dailyCardCount: 5,

  setIndex: (index) => set({ currentIndex: index }),
  setDailyCardCount: (count) => set({ dailyCardCount: count }),
}));
