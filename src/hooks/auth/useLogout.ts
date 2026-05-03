import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { postLogout } from "../../services/authService";

// 로그아웃 훅
export const useLogout = () => {
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const mutation = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      // 로그아웃 성공 시
      localStorage.clear();
      setLoggedIn(false);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      // 로그아웃 API 실패해도 로컬 상태는 정리
      console.error("로그아웃 API 호출 실패:", error);
      localStorage.clear();
      setLoggedIn(false);
      navigate("/login", { replace: true });
    },
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
    isLoggingOut: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

