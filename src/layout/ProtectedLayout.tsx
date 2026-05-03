import { Outlet, useLocation, Navigate } from "react-router-dom"
import Sidebar from "../component/common/Sidebar";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedLayout = () => {
    const location = useLocation();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    // 사이드바를 숨길 경로 목록
    const hideSidebarPaths = ['/cardlearning', '/onboarding', '/reviewcard', '/learningCompleted','/quiz','/todaylearn'];

    // 현재 경로가 목록에 포함되어 있는지 여부
    const shouldHideSidebar = hideSidebarPaths.some((path) =>
        location.pathname.startsWith(path)
    );

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <div className="flex h-screen w-full bg-[#F3F6FB] font-[Pretendard]">
            {!shouldHideSidebar && 
                <div className="w-74">
                    <Sidebar />
                </div>
            }
            {/* 본문 영역 */}
            <div className="flex flex-1 overflow-y-scroll">
                <Outlet />
            </div>
        </div>
    )
}

export default ProtectedLayout