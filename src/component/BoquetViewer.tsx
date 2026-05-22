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

const FLOWER_NAME_MAP: Record<string, string> = {
  장미: "ROSE",
  튤립: "TULIP",
  거베라: "GERBERA",
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
    uniqueWrapperNames.includes(finalColorKey) ||
    ["오리엔탈", "프렌치빈티지", "검정", "블랙"].includes(selectedColor);

  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;

  if (!Array.isArray(selectedFlowers)) return null;

  return (
    <div className="w-full aspect-square max-w-[380px] mx-auto flex items-center justify-center overflow-visible">
      <div className="relative w-full h-full flex-shrink-0">
        {selectedFlowers.map((flowerStr, index) => {
          const match = flowerStr.match(/^([^(]+)\(([^)]+)\)$/);

          let type = "";
          let color = "";

          if (match) {
            type = FLOWER_NAME_MAP[match[1].trim()] || "";
            color = FLOWER_COLOR_MAP[match[2].trim()] || "";
          }

          const flowerImgSrc = FLOWER_MAP[type]?.[color];

          if (!flowerImgSrc) return null;

          const position = currentFlowerPositions[index] || {
            left: "50%",
            top: "10%",
            rotate: "0deg",
          };

          // 🎯 튤립 조건(isTulip)을 없애고, 포장지 스타일로만 크기를 결정하도록 깔끔하게 합쳤습니다.
          // 전체적인 꽃 크기를 더 키우고 싶다면 아래 숫자를 조절해 주시면 됩니다! (예: 30% -> 35%)
          const sizeClass = isUniqueWrapper
            ? "w-[40%] h-[40%]"
            : "w-[51%] h-[51%]";

          return (
            <img
              key={index}
              src={flowerImgSrc}
              className={`absolute object-contain z-20 ${sizeClass}`}
              style={{
                left: position.left,
                top: position.top,
                transform: `translate(-50%, 10%) rotate(${position.rotate})`,
              }}
              alt={flowerStr}
            />
          );
        })}

        <img
          src={wrapperBackImages[finalColorKey] || wrapperBackImages["분홍색"]}
          className="absolute bottom-[4%] left-1/2 w-[90%] z-10"
          style={{ transform: "translateX(-50%)" }}
          alt="포장지 뒷면"
        />
        <img
          src={
            wrapperFrontImages[finalColorKey] || wrapperFrontImages["분홍색"]
          }
          className="absolute bottom-[4%] left-1/2 w-[90%] z-30 pointer-events-none"
          style={{ transform: "translateX(-50%)" }}
          alt="포장지 앞면"
        />
      </div>
    </div>
  );
}
