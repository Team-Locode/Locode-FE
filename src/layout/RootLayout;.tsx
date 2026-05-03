// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='flex min-h-screen w-screen bg-violet-100 font-[Pretendard]'>
      <div className='flex flex-1 w-full'>
        <Outlet />
      </div>
      
    </div>
  );
};

export default RootLayout;