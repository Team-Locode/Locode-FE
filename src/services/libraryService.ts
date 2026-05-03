// services/libraryService.ts
import axiosInstance from "./axiosInstance";
import type { LibraryPageResponse, CategoryType } from "../types/dto/library";

export const getLibraryPage = async (category?: CategoryType) => {
  const { data } = await axiosInstance.get<LibraryPageResponse>(
    "/api/library",
    { params: category ? { category } : undefined }
  );
  return data;
};

export const toggleBookmark = async (cardId: number) => {
  const { data } = await axiosInstance.patch(
    `/api/user-card/${cardId}/bookmark`
  );
  return data;
};
