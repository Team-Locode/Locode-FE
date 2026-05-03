import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const OAuthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                // 백엔드에서 쿠키를 설정했으므로 로그인 상태를 true로 설정
                setLoggedIn(true);

                // 홈으로 리다이렉트
                navigate("/onboarding", { replace: true });
            } catch (err: any) {
                console.error("OAuth 콜백 처리 실패:", err);
                setError(err.message || "로그인 처리 중 오류가 발생했습니다.");
                setTimeout(() => navigate("/login"), 2000);
            }
        };

        handleOAuthCallback();
    }, [searchParams, navigate, setLoggedIn]);

    return (
        <div className="flex w-full h-screen justify-center items-center bg-linear-to-t from-[#0F52B0] to-[#1575FB]">
            {error ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-red-500 text-medium-18">{error}</div>
                    <div className="text-gray-9 text-medium-15">로그인 페이지로 이동합니다...</div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-gray-9 text-medium-18">로그인 처리 중...</div>
                </div>
            )}
        </div>
    );
};

export default OAuthCallbackPage;


