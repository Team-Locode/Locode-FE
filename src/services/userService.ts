import axiosInstance from "./axiosInstance";
import type {
  MyPageResponse,
  HomePageResponse,
  GetUserBadgesResponse,
  UpdateDailyStudyResponse,
  SelectBadgesRequest,
  SelectBadgesResponse,
} from "../types/dto/user";

export const getMyPage = async () => {
  const { data } = await axiosInstance.get<MyPageResponse>("/api/mypage");
  return data;
};

export const getHome = async () => {
  const { data } = await axiosInstance.get<HomePageResponse>("/api/home");
  return data;
};

export const getUserBadges = async () => {
  const { data } = await axiosInstance.get<GetUserBadgesResponse>("/api/mypage/badges");
  return data;
};

export const patchDailyStudy = async (count: number) => {
  const { data } = await axiosInstance.patch<UpdateDailyStudyResponse>(
    "/api/dailyStudy",
    null,
    { params: { count } }
  );
  return data;
};

export const patchBadges = async (payload: SelectBadgesRequest) => {
  const { data } = await axiosInstance.patch<SelectBadgesResponse>(
    "/api/mypage/badges",
    payload
  );
  return data;
};
