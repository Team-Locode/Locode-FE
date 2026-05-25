import { flowers } from "../constants/flowers";
import {
  wrapperBackImages,
  wrapperFrontImages,
  paperDesignMap,
  uniqueWrapperNames,
} from "../constants/wrappers";

import {
  classicFlowerPositions,
  uniqueFlowerPositions,
} from "../constants/positions";

import { createBouquet } from "../api/bouquet";

import { useState } from "react";
import Card from "./Card";
import { FlowerItem } from "../types/flowers";


// 백엔드 응답 Body와 똑같은 구조로 인터페이스 정의
export interface BouquetResponse {
  bouquetId: number;
  summary: {
    purpose: string;
    style: string;
    flowers: string[]; // ["장미(레드)", "장미(블랙)", ...]
    paper: string; // "분홍"
    colorTone: string[]; // ["컬러풀"]
  };
}

export default function CompleteFlower({
  selectedColor,
  person,
  onComplete,
}: {
  selectedColor: string;
  person: string;
  onComplete: (data: BouquetResponse) => void;
}) {
  const [selectedFlowers, setSelectedFlowers] = useState<FlowerItem[]>([]);
  const isUniqueWrapper = uniqueWrapperNames.includes(selectedColor);

  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;

  const handleAddFlower = (flower: FlowerItem) => {
    if (selectedFlowers.length >= 5) return;
    setSelectedFlowers((prev) => [...prev, flower]);
  };

  const handleReset = () => {
    setSelectedFlowers([]);
  };

  const handleRemoveFlower = (removeIndex: number) => {
    setSelectedFlowers((prev) =>
      prev.filter((_, index) => index !== removeIndex),
    );
  };



  const handleComplete = async () => {
  const body = {
    purpose: `${person}을(를) 위한 꽃다발`,
    flowers: selectedFlowers.map((flower) => ({
      type: flower.type,
      color: flower.color,
    })),
    paperStyle: isUniqueWrapper ? "UNIQUE" : "CLASSIC",
    paperDesign: paperDesignMap[selectedColor],
  };

  console.log(body);

  try {
    const data = await createBouquet(body);

    console.log("response:", data);

    onComplete(data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Card
      title="미리보기"
      className="mb-5 min-w-75"
      rightElement={
        <button onClick={handleReset} className="text-sm text-pink-3">
          초기화
        </button>
      }
    >
      <div className="flex flex-col items-center gap-6">
        {/* 꽃다발 이미지 영역 */}
        <div className="w-full aspect-square max-w-[300px] bg-[#fcf7f6] border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
          <div className="relative w-full h-full max-w-[380px] max-h-[380px]">
            {/* 선택된 꽃들 */}
            {selectedFlowers.map((flower, index) => {

              return (
                <img
                  key={index}
                  src={flower.image}
                  onClick={() => handleRemoveFlower(index)}
                  alt="선택한 꽃"
                  className={`
                    absolute object-contain z-20 cursor-pointer
                    ${
                      isUniqueWrapper
                        ? "w-30 h-30"
                        : "w-40 h-40"
                    }
                  `}
                  style={{
                    left: currentFlowerPositions[index].left,
                    top: currentFlowerPositions[index].top,
                    transform: `translateX(-50%) rotate(${currentFlowerPositions[index].rotate})`,
                  }}
                />
              );
            })}

            {/* 포장지 뒷면 */}
            <img
              src={wrapperBackImages[selectedColor]}
              alt="포장지 뒷면"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-10"
            />

            {/* 포장지 앞면 */}
            <img
              src={wrapperFrontImages[selectedColor]}
              alt="포장지 앞면"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-30 pointer-events-none"
            />
          </div>
        </div>

        {/* 카드 안에 들어갈 꽃 선택 카드 */}
        <Card
          title="꽃 선택하기"
          className="w-full max-w-[300px]"
          rightElement={
            <button className="text-sm text-pink-3">
              {selectedFlowers.length}/5개 선택됨
            </button>
          }
        >
          <p className="text-sm text-pink-3 mb-4">
            꽃을 클릭하여 꽃다발에 추가해주세요
            <br />
            ※완성된 꽃다발에서 꽃을 클릭하여 취소할 수 있어요!
          </p>

          <div className="max-h-[360px] overflow-y-auto pr-2">
            {Object.entries(flowers).map(([category, flowerList]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-pink-4 mb-2">
                  {category}
                </h4>

                <div className="flex flex-wrap gap-3 mb-4">
                  {flowerList.map((flower, index) => (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => handleAddFlower(flower)}
                      disabled={selectedFlowers.length >= 5}
                      className="w-14 h-14 rounded-2xl border-2 border-pink-2 bg-white flex items-center
                      justify-center cursor-pointer hover:scale-105 hover:scale-105 active:scale-95 active:bg-pink-100
                      transition-all overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <img
                        src={flower.image}
                        alt={category}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <button
          onClick={handleComplete}
          disabled={!person.trim()}
          className={`
            w-full py-4 text-white font-bold rounded-2xl
            flex items-center justify-center transition-all shadow-sm
            ${
              person.trim()
                ? "bg-pink-400 hover:opacity-90"
                : "bg-[#ffcbd5] cursor-not-allowed"
            }
          `}
        >
          ✨ 꽃다발 완성하기
        </button>

        <div>
          <p className="text-pink-3 text-sm">
            ❕받는 분을 입력하고 꽃을 선택해주세요❕
          </p>
        </div>
      </div>
    </Card>
  );
}
