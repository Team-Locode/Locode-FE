import axiosInstance from "./axiosInstance";
import type { ReviewPageResponse } from "../types/dto/review";

export const getReviewPage = async () => {
  const { data } = await axiosInstance.get<ReviewPageResponse>("/api/review");
  return data;
};

export const postReviewCompleted = async() => {
  await axiosInstance.post("/api/review/complete");
}