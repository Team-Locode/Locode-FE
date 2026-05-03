import axiosInstance from "./axiosInstance";
import type {
  StartTodayStudySetRequest,
  StartTodayStudySetResponse,
  ConfirmCardRequest,
  SubmitQuizAnswerRequest,
  SubmitQuizAnswerResponse,
  CompleteStudyResponse,
} from "../types/dto/card";

export const postStartTodayStudySet = async (request?: StartTodayStudySetRequest) => {
  const { data } = await axiosInstance.post<StartTodayStudySetResponse>(
    "/api/cards/study-sessions/today",
    null,
    {
      params: request?.selectedCategories
        ? { selectedCategories: request.selectedCategories }
        : undefined,
    }
  );
  return data;
};

export const postConfirmCard = async (cardId: number, payload: ConfirmCardRequest) => {
  await axiosInstance.post(`/api/cards/${cardId}/confirm`, payload);
};

export const postSubmitQuizAnswer = async (cardId: number, payload: SubmitQuizAnswerRequest) => {
  const { data } = await axiosInstance.post<SubmitQuizAnswerResponse>(
    `/api/cards/${cardId}/quiz/answer`,
    payload
  );
  return data;
};

export const postCompleteStudy = async () => {
  const { data } = await axiosInstance.post<CompleteStudyResponse>(
    "/api/cards/study-sessions/today/complete"
  );
  return data;
};
