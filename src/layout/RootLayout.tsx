// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const RootLayout = () => {
  return (
    // flex-col을 추가해서 헤더(위)와 본문(아래)이 세로로 배치되게 합니다.
    <div className='flex flex-col min-h-screen w-screen bg-[var(--color-pink)] font-[Pretendard]'>
      
      {/* 1. 여기에 헤더를 넣습니다! */}
      <Header />

      {/* 2. 본문 영역: 헤더가 fixed라면 pt-16 같은 여백을 줘야 본문이 안 가려집니다. */}
      <div className='flex flex-1 w-full pt-16'>
        <Outlet />
      </div>

      <Footer />
      
    </div>
  );
};

export default RootLayout;