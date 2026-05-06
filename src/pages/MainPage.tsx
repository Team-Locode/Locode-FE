import { useState } from "react";
import Card from "../component/Card";

// src/pages/MainPage.tsx
export default function MainPage() {
    const [person, setPerson] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('unique');

  return (
    <div className="flex flex-col items-center w-full p-8">
      <h2 className="text-pink-4 text-2xl font-bold mb-4">🤍 소중한 사람을 위한 꽃다발 만들기</h2>
      <div className="flex items-center gap-2 text-lg font-medium text-pink-4">
        {/* 인물 입력창 (밑줄 포인트) */}
        <div className="relative flex flex-col items-center border-b-2 border-pink-2 pb-1 focus-within:border-[var(--color-highlight)] shadow-[0_3px_4px_-2px_var(--color-pink-2)]">
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            placeholder="엄마, 여자친구, 선생님..."
            className="bg-transparent outline-none text-center w-40 text-sm placeholder:text-pink-3 transition-all focus:placeholder:opacity-0"
          />
        </div>

        {/* 고정 텍스트 */}
        <span>을 위한 꽃다발</span>
      </div>
      <p className="text-pink-3 text-sm mt-2">누구를 위한 꽃다발인지 입력해주세요</p>
      
      {/* 카드 섹션 - 꽃다발 스타일(유니크/클래식)*/}
      <Card title="꽃다발 스타일" className="mt-5 text-sm">
        <div className="flex gap-2">
          {/* 유니크 카드 */}
          <Card 
            isSelected={selectedStyle === 'unique'} 
            onClick={() => setSelectedStyle('unique')}
            className="flex-1"
          >
            <div className="flex justify-between items-start relative">
              <div className="flex-shrink-0">
                <h4 className="text-base font-semibold mb-2 text-pink-4">유니크</h4>
                <p className="text-pink-3 text-xs whitespace-nowrap">자유롭고 개성있는 스타일</p>
              </div>
              {selectedStyle === 'unique' && <span className="absolute -top-1 -right-1 text-highlight text-2xl leading">
                ✓
                </span>}
            </div>
          </Card>

          {/* 클래식 카드 */}
          <Card 
            isSelected={selectedStyle === 'classic'} 
            onClick={() => setSelectedStyle('classic')}
            className="flex-1 "
          >
            <div className="flex justify-between items-start relative">
              <div>
                <h4 className="text-base font-semibold mb-2 text-pink-4">클래식</h4>
                <p className="text-pink-3 text-xs whitespace-nowrap">정갈하고 우아한 스타일</p>
              </div>
              {selectedStyle === 'classic' && <span className="absolute -top-1 -right-1 text-highlight text-2xl leading">
                ✓
                </span>}
            </div>
          </Card>
        </div>
      </Card>

      {/* 카드 섹션 - 포장지컬러 */}
      <Card title="꽃다발 스타일" className="mt-5">
        <div className="flex gap-4 items-center">
          {/* 여기에 색상 원형 컴포넌트들을 넣으면 됩니다! */}
          <div className="w-12 h-12 rounded-full bg-pink-200 border-4 border-[#EB5468] cursor-pointer shadow-md flex items-center justify-center">
             <span className="text-xs">✓</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-pink-200 border-4 border-[#EB5468] cursor-pointer shadow-md flex items-center justify-center">
             <span className="text-xs">✓</span>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium">선택: 분홍색</p>
      </Card>

    </div>
  );
}