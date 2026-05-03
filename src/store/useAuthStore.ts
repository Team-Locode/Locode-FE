import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

// localStorage에서 초기값 불러오기
const getInitialIsLoggedIn = (): boolean => {
  const stored = localStorage.getItem("isLoggedIn");
  return stored === "true";
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: getInitialIsLoggedIn(),
  setLoggedIn: (value: boolean) => {
    set({ isLoggedIn: value });
    // localStorage에 직접 저장
    localStorage.setItem("isLoggedIn", String(value));
  },
}));

