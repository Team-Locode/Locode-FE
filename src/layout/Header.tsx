export default function Header() {
  return (
    // fixed, 상단/좌측 0, 너비 100%, 헤더 높이(h-16), z-index, 배경색 지정
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-pink border-b border-pink-2 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        {/* 로고 영역 */}
        <h1 className="text-xl font-bold">💐 플라워 토브</h1>
        
        {/* 메뉴 영역 */}
        <nav>
          <ul className="flex gap-4">
            <li className="text-pink-3">당신을 위한 꽃다발 만들기</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
