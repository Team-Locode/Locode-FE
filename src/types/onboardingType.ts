export interface OnboardingSlideType {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface OnboardingStateType {
  currentIndex: number;
  dailyCardCount: number;
  setIndex: (index: number) => void;
  setDailyCardCount: (count: number) => void;
}
