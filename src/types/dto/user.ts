import { CommonResponse } from "./CommonResponse";

// User API DTO

export type CategoryType = "INTEREST_RATE" | "INFLATION" | "INVESTMENT" | "FISCAL";

// MyPage Response
export interface UserMyPage {
  title: string;
  imageUrl: string;
  currentLevel: number;
  currentXp: number;
  requiredXpForNextLevel: number;
  remainingXpToNextLevel: number;
  streak: number;
  totalLearnedCard: number;
  badges: BadgeStatus[];
  totalBookmarkedCard: number;
}

export type MyPageResponse = CommonResponse<UserMyPage>;

// Home Page Response
export interface CategoryCount {
  category: CategoryType;
  isLearnedCount: number;
}

export interface BadgeInfo {
  badgeId: number;
  title: string;
  comment: string;
}

export interface UserHomePage {
  streak: number;
  level: number;
  isLearned: boolean;
  dailyGoalCount: number;
  studyCompletedCardCount: number;
  quizCompletedCardCount: number;
  reviewRequiredCardCount: number;
  recommendedCategory: CategoryCount[];
  earnedBadge: BadgeInfo | null;
}

export type HomePageResponse = CommonResponse<UserHomePage>;

// Badge Status
export interface BadgeStatus {
  badgeId: number;
  title: string;
  earned: boolean;
}

export type GetUserBadgesResponse = CommonResponse<BadgeStatus[]>;

// Update Daily Study Request
export interface UpdateDailyStudyRequest {
  count: number;
}

export type UpdateDailyStudyResponse = CommonResponse<null>;

// Select Badges Request
export interface SelectBadgesRequest {
  badgeIds: number[];
}

export type SelectBadgesResponse = CommonResponse<null>;

