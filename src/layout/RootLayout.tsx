// src/layout/root-layout.tsx
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const RootLayout = () => {
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 로그인 페이지에 접근했는데 이미 로그인되어 있으면 홈으로 리다이렉트
  if (location.pathname === '/login' && isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className='flex min-h-screen w-screen bg-violet-100 font-[Pretendard]'>
      <div className='flex flex-1 w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;