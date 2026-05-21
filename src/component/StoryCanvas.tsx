// src/component/StoryCanvas.tsx
import React, { forwardRef } from "react";
import { FLOWER_MAP } from "../constants/FlowerMap";
import {
  classicFlowerPositions,
  uniqueFlowerPositions,
} from "../constants/positions";
import {
  wrapperBackImages, 
  wrapperFrontImages,
  uniqueWrapperNames,
} from "../constants/wrappers";

interface StoryCanvasProps {
  displayData: {
    summary: {
      purpose: string;
      paper: string;
      flowers: string[]; // ✨ 서버 응답 스펙에 맞춰 string[]로 변경
    };
  };
}

// 🎯 백엔드 응답 단어와 프론트엔드 이미지 키값을 완벽하게 매핑
const PAPER_NAME_MAP: Record<string, string> = {
  분홍: "분홍색",
  노랑: "노란색",
  노란: "노란색",
  하양: "하얀색",
  하얀: "하얀색",
  보라: "보라색",
  연두: "연두색",
  갈색: "갈색",
  하늘: "하늘색",
  오리엔탈: "동양풍",
  프렌치빈티지: "서양풍",
  검정: "검정색",
  블랙: "검정색",
};

// 🎯 서버 한글 데이터를 FLOWER_MAP 영문 키값으로 치환하기 위한 매핑 테이블
const FLOWER_NAME_MAP: Record<string, string> = {
  장미: "ROSE",
  튤립: "TULIP",
  게베라: "GERBERA",
  리시안셔스: "LISIANTHUS",
  폼폼국화: "POMPON",
  라벤더: "LAVENDER",
  카네이션: "CARNATION",
};

const FLOWER_COLOR_MAP: Record<string, string> = {
  레드: "RED",
  핑크: "PINK",
  화이트: "WHITE",
  블루: "BLUE",
  블랙: "BLACK",
  옐로우: "YELLOW",
  보라: "PURPLE",
  퍼플: "PURPLE",
};

export const StoryCanvas = forwardRef<HTMLDivElement, StoryCanvasProps>(
  ({ displayData }, ref) => {
    const finalColorKey =
      PAPER_NAME_MAP[displayData.summary.paper] ||
      displayData.summary.paper ||
      "분홍색";

    return (
      <div className="absolute -top-[9999px] left-0">
        <div
          ref={ref}
          className="w-[1080px] h-[1920px] flex flex-col items-center justify-between p-24 relative"
          style={{ backgroundColor: "#fcf7f6" }}
        >
          {/* 상단 로고 영역 */}
          <div className="text-center mt-28">
            <p className="text-4xl tracking-widest text-pink-400 font-semibold mb-3">
              FLOWERTOWB
            </p>
            <div className="w-24 h-[3px] bg-pink-300 mx-auto"></div>
          </div>

          {/* 인스타 스토리 이미지 중앙 도화지 영역 (비율 고정용) */}
          <div className="w-[760px] h-[760px] flex items-center justify-center relative overflow-visible">
            <StoryBouquetViewer
              selectedFlowers={displayData.summary.flowers}
              selectedColor={displayData.summary.paper}
            />
          </div>

          {/* 하단 문구 영역 */}
          <div className="text-center mb-36 w-full px-12">
            <h1 className="text-6xl font-extrabold text-gray-800 mb-8 tracking-wide">
              ✨ {displayData.summary.purpose} ✨
            </h1>
            <p className="text-3xl text-gray-400 tracking-wider font-light">
              나만의 커스터마이징 플라워 | 플라워토브
            </p>
          </div>
        </div>
      </div>
    );
  },
);

StoryCanvas.displayName = "StoryCanvas";

// 🎯 Story 전용 Scaled BouquetViewer 컴포넌트 (모든 픽셀 값을 2.53배 키움)
const StoryBouquetViewer = ({
  selectedFlowers,
  selectedColor,
}: {
  selectedFlowers: string[];
  selectedColor: string;
}) => {
  const finalColorKey =
    PAPER_NAME_MAP[selectedColor] || selectedColor || "분홍색";

  const isUniqueWrapper =
    ["동양풍", "서양풍", "검정색"].includes(finalColorKey) ||
    ["오리엔탈", "프렌치빈티지", "검정", "블랙"].includes(selectedColor);

  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;

  if (!Array.isArray(selectedFlowers)) return null;

  return (
    <div className="relative w-[960px] h-[960px] flex-shrink-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-full z-20">
        {selectedFlowers.map((flowerStr, index) => {
          const match = flowerStr.match(/^([^(]+)\(([^)]+)\)$/);

          let type = "";
          let color = "";

          if (match) {
            const koreanName = match[1].trim();
            const koreanColor = match[2].trim();

            type = FLOWER_NAME_MAP[koreanName] || "";
            color = FLOWER_COLOR_MAP[koreanColor] || "";
          }

          const flowerImgSrc = FLOWER_MAP[type]?.[color];

          if (!flowerImgSrc) return null;

          const isTulip = type === "TULIP";
          const position = currentFlowerPositions[index] || {
            left: "50%",
            top: "10%",
            rotate: "0deg",
          };

          return (
            <img
              key={index}
              src={flowerImgSrc}
              className={`
                absolute object-contain
                ${
                  isTulip
                    ? isUniqueWrapper
                      ? "w-[405px] h-[405px]"
                      : "w-[506px] h-[506px]"
                    : isUniqueWrapper
                      ? "w-[283px] h-[283px]"
                      : "w-[405px] h-[405px]"
                }
              `}
              style={{
                left: position.left,
                top: position.top,
                // 이전 단계에서 내렸던 높이(180px) 유지
                transform: `translateX(-50%) translateY(193px) rotate(${position.rotate})`,
              }}
              alt={flowerStr}
            />
          );
        })}
      </div>

      {/* 포장지 렌더링 (포장지는 원래 너비인 960px 캔버스를 기준으로 큼직하게 유지) */}
      <img
        src={wrapperBackImages[finalColorKey] || wrapperBackImages["분홍색"]}
        className="absolute bottom-4 left-1/2 w-[708px] z-10"
        style={{ transform: "translateX(-50%)" }}
        alt="포장지 뒷면"
      />
      <img
        src={wrapperFrontImages[finalColorKey] || wrapperFrontImages["분홍색"]}
        className="absolute bottom-4 left-1/2 w-[708px] z-30 pointer-events-none"
        style={{ transform: "translateX(-50%)" }}
        alt="포장지 앞면"
      />
    </div>
  );
};
