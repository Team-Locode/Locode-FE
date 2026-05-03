import { CommonResponse } from "./CommonResponse";
import { BadgeInfo } from "./user";

// Card API DTO

// Start Today Study Set Request
export interface StartTodayStudySetRequest {
  selectedCategories?: string[];
}

// Study Card
export interface StudyCard {
  cardId: number;
  category: string;
  term: string;
  descript: string;
  example: string;
  tip: string;
  relatedTerms: string[];
}

// Quiz Choice
export interface QuizChoice {
  term: string;
}

// Quiz Question
export interface QuizQuestion {
  cardId: number;
  question: string;
  choices: QuizChoice[];
  commentary: string;
}

// Today Study Set Response
export interface TodayStudySet {
  cards: StudyCard[];
  quizzes: QuizQuestion[];
}

export type StartTodayStudySetResponse = CommonResponse<TodayStudySet>;

// Confirm Card Request
export interface ConfirmCardRequest {
  dontKnow: boolean;
}

// Submit Quiz Answer Request
export interface SubmitQuizAnswerRequest {
  selectedTerm: string;
}

// Quiz Answer Response
export interface QuizAnswer {
  isCorrect: boolean;
  commentary: string;
  correctAnswer: string;
}

export type SubmitQuizAnswerResponse = CommonResponse<QuizAnswer>;

// Study Complete Response
export interface StudyComplete {
  correctCount: number;
  gainedXp: number;
  correctTerms: string[];
  wrongTerms: string[];
  newBadges: BadgeInfo[];
}

export type CompleteStudyResponse = CommonResponse<StudyComplete>;

