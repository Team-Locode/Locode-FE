import logo from '../assets/flowertowbLogo.png'; // 경로에 맞춰 수정

export default function Header() {
  return (
    // fixed, 상단/좌측 0, 너비 100%, 헤더 높이(h-16), z-index, 배경색 지정
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-pink border-b border-pink-2 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        {/* 로고 영역 */}
        <h1 className="text-xl font-bold flex items-center">
          <img src={logo} alt="꽃다발 DIY" className="w-8 h-8" />
          꽃다발 DIY</h1>
        
        {/* 메뉴 영역 */}
        <nav>
          <ul className="flex gap-4">
            <li className="text-pink-3">💐 플라워 토브</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
