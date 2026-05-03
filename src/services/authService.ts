import axiosInstance from "./axiosInstance";
import type {
  RefreshTokenResponse,
  LogoutResponse,
} from "../types/dto/auth";

export const postRefreshToken = async () => {
  const { data } = await axiosInstance.post<RefreshTokenResponse>("/api/auth/refresh");
  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post<LogoutResponse>("/api/auth/logout");
  return data;
};
