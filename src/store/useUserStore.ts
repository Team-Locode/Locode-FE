import { create } from "zustand";

interface UserState {
  level: number;
  reviewCount: number;
  progress: number;

  getStatus: () => "before" | "ongoing" | "done";
  increaseProgress: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  level: 3,
  reviewCount: 2,
  progress: 0,

  getStatus: () => {
    const progress = get().progress;

    if (progress === 0) return "before";
    if (progress >= 100) return "done";
    return "ongoing";
  },

  increaseProgress: () =>
    set((state) => ({
      progress: Math.min(state.progress + 20, 100),
    })),
}));

