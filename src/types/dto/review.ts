import { CommonResponse } from "./CommonResponse";

// Review API DTO

export type CategoryType = "INTEREST_RATE" | "INFLATION" | "INVESTMENT" | "FISCAL";

export interface ReviewCard {
  term: string;
  category: CategoryType;
  descript: string;
  tip: string;
  example: string;
}

export interface ReviewPage {
  totalReviewCount: number;
  reviewCardList: ReviewCard[];
  estimatedDurationMinutes: number;
}

export type ReviewPageResponse = CommonResponse<ReviewPage>;

