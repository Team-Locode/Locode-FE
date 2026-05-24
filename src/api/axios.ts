import axios from "axios";

export const api = axios.create({
  // 방금 .env에 적어둔 주소를 자동으로 불러옵니다.
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
