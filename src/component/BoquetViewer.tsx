import { FLOWER_MAP } from "../constants/FlowerMap";
import {
  wrapperBackImages,
  wrapperFrontImages,
  classicFlowerPositions,
  uniqueFlowerPositions,
  uniqueWrapperNames,
} from "./CompleteFlower";

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
};

const FLOWER_NAME_MAP: Record<string, string> = {
  장미: "ROSE",
  튤립: "TULIP",
  거베라: "GERBERA", // 올바른 맞춤법
  게베라: "GERBERA", // 🎯 백엔드가 보내는 오타 완벽 방어 추가!
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

interface BouquetViewerProps {
  selectedFlowers: string[];
  selectedColor: string;
}

export default function BouquetViewer({
  selectedFlowers,
  selectedColor,
}: BouquetViewerProps) {
  const finalColorKey =
    PAPER_NAME_MAP[selectedColor] || selectedColor || "분홍색";

  const isUniqueWrapper =
    ["동양풍", "서양풍", "검정색"].includes(finalColorKey) ||
    ["오리엔탈", "프렌치빈티지", "검정"].includes(selectedColor);

  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;

  if (!Array.isArray(selectedFlowers)) return null;

  return (
    <div className="w-full aspect-square max-w-[300px] mx-auto flex items-center justify-center overflow-visible">
      <div className="relative w-full h-full max-w-[380px] max-h-[380px] flex-shrink-0 ">
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
              // 🎯 3. Tailwind의 -translate-x-1/2는 인라인 style의 transform과 충돌하므로 제거했습니다.
              className={`
                absolute object-contain z-20
                ${
                  isTulip
                    ? isUniqueWrapper
                      ? "w-40 h-40"
                      : "w-50 h-50"
                    : isUniqueWrapper
                      ? "w-28 h-28"
                      : "w-40 h-40"
                }
              `}
              style={{
                left: position.left,
                top: position.top,
                // 🎯 4. style에 transform을 명시적으로 선언하여 좌표를 고정합니다.
                transform: `translateX(-50%) translateY(-1px) rotate(${position.rotate})`,
              }}
              alt={flowerStr}
            />
          );
        })}

        {/* 🎯 5. 포장지도 380px 컨테이너 기준 하단 중앙에 배치되도록 강제 고정 */}
        <img
          src={wrapperBackImages[finalColorKey] || wrapperBackImages["분홍색"]}
          className="absolute bottom-4 left-1/2 w-[280px] z-10"
          style={{ transform: "translateX(-50%)" }}
          alt="포장지 뒷면"
        />
        <img
          src={
            wrapperFrontImages[finalColorKey] || wrapperFrontImages["분홍색"]
          }
          className="absolute bottom-4 left-1/2 w-[280px] z-30 pointer-events-none"
          style={{ transform: "translateX(-50%)" }}
          alt="포장지 앞면"
        />
      </div>
    </div>
  );
}
