import { useState } from "react";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";

export default function ModalPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더: 닫기 버튼 */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">꽃다발 완성! 🎉</h2>
          <button onClick={() => navigate(-1)} className="text-2xl">
            ×
          </button>
        </div>

        {/* 컨텐츠 영역: 이미지 및 설명 */}
        <div className="p-6">
          <div className="bg-[#FFF5F6] rounded-2xl p-10 flex justify-center mb-6">
            {/* 여기에 꽃다발 이미지 */}
            <div className="w-40 h-40 bg-pink-2 rounded-t-full relative">
              <span className="absolute -top-10 left-1/2 -translate-x-1/2">
                🌸
              </span>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">엄마를 위한 꽃다발</h3>
            <div className="bg-orange-50 text-orange-600 text-sm p-3 rounded-xl mb-6">
              ⚠️ 실제와는 다를 수 있음. 자세한 요구는 상담 필요!!
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-bold border-t pt-4">주문 요약</p>
            {/* 긴 내용... (자동으로 스크롤 생김) */}
            <div className="h-40 bg-gray-50 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
