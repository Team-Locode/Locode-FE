import { CommonResponse } from "./CommonResponse";

// Library API DTO

export type CategoryType = "INTEREST_RATE" | "INFLATION" | "INVESTMENT" | "FISCAL";

export interface LibraryCard {
  isBookmarked: boolean;
  term: string;
  descript: string;
  category: CategoryType;
  cardId: number;
}

export interface LibraryPage {
  categories: CategoryType[];
  libraryCardList: LibraryCard[];
}

export type LibraryPageResponse = CommonResponse<LibraryPage>;

