import { useState } from "react";
import Card from "../component/Card";
import { Outlet } from "react-router-dom";
import CompleteFlower from "../component/CompleteFlower";
import ColorWrapper from "../component/ColorWrapper";
import FlowerStyle from "../component/FlowerStyle";
import ModalPage from "./modalPage";

// src/pages/MainPage.tsx
export default function MainPage() {
  const [person, setPerson] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("classic");
  const [selectedColor, setSelectedColor] = useState("분홍색");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center w-full p-8">
      <Outlet />
      <h2 className="text-pink-4 text-2xl font-bold mb-4 text-center">
        🤍 소중한 사람을 위한 <br />
        꽃다발 만들기
      </h2>
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
      <p className="text-pink-3 text-sm mt-2">
        누구를 위한 꽃다발인지 입력해주세요
      </p>

      {/* 카드 섹션 - 꽃다발 스타일(유니크/클래식)*/}
      <FlowerStyle
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />

      {/* 카드 섹션 - 포장지컬러 */}
      <ColorWrapper
        selectedStyle={selectedStyle}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      {/* 카드 섹션 - 꽃 완성 */}
      <CompleteFlower
        selectedColor={selectedColor}
        person={person}
        onComplete={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <ModalPage onClose={() => setIsModalOpen(false)} />
      )}

      {/* 안내문 */}
      <div className="box-border w-[300px] min-w-[340px] flex-shrink-0 rounded-[25px] border border-pink-2 bg-notice p-5 flex items-start gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-pink-4">
            ❤️ 플라워토브와 함께
          </h2>

          <p className="text-xs text-pink-3 ml-6">
            특별한 날, 소중한 사람에게 마음을 전하세요. 완성된 꽃다발 이미지로
            상담을 시작할 수 있어요.
          </p>
        </div>
      </div>
    </div>
  );
}
