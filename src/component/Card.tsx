import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string; // 섹션 제목 (꽃다발 스타일, 포장지 색상 등)
  isSelected?: boolean; // 선택 여부
  onClick?: () => void; // 클릭 이벤트
  className?: string; // 추가 스타일
}

export default function Card({ children, title, isSelected, onClick, className = "" }: CardProps) {
  // 선택되었을 때와 아닐 때의 테두리/그림자 스타일
  const borderStyle = isSelected 
    ? "border-[#EB5468] border-2 bg-[#FFF5F6] shadow-[0_4px_10px_rgba(235,84,104,0.1)]" 
    : "border-gray-200 border-2 bg-white";

  return (
    <div className={`rounded-3xl ${title ? "p-5 bg-white shadow-sm border border-pink-2" : "p-2"} ${className}`}>
      {/* 제목이 있으면 섹션 카드로 동작 */}
      {title && <h3 className="text-base font-semibold mb-6 text-pink-4">{title}</h3>}
      
      {/* 실제 카드 내용 */}
      <div 
        onClick={onClick}
        className={`
          ${!title ? `cursor-pointer transition-all duration-200 rounded-2xl p-5 ${borderStyle}` : ""}
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}