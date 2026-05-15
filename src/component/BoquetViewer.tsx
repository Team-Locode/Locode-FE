import { FLOWER_MAP } from "../constants/FlowerMap";
import {
  wrapperBackImages,
  wrapperFrontImages,
  classicFlowerPositions,
  uniqueFlowerPositions,
  uniqueWrapperNames,
} from "./CompleteFlower";

interface FlowerData {
  type: string;
  color: string;
}

export default function BouquetViewer({
  selectedFlowers,
  selectedColor,
}: {
  // 2. string[] 대신 FlowerData[] 또는 any[]로 변경
  selectedFlowers: FlowerData[];
  selectedColor: string;
}) {
  const isUniqueWrapper = uniqueWrapperNames.includes(selectedColor);
  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;

  return (
    <div className="relative w-full h-full max-w-[300px] aspect-square mx-auto">
      {selectedFlowers.map((flower, index) => {
        // 이제 TypeScript가 flower가 객체인 것을 알기 때문에 에러가 나지 않습니다.
        const flowerImgSrc = FLOWER_MAP[flower.type]?.[flower.color];

        if (!flowerImgSrc) return null;

        return (
          <img
            key={index}
            src={flowerImgSrc}
            className={`absolute object-contain z-20 ${isUniqueWrapper ? "w-28 h-28" : "w-40 h-40"}`}
            style={{
              left: currentFlowerPositions[index]?.left,
              top: currentFlowerPositions[index]?.top,
              transform: `translateX(-50%) rotate(${currentFlowerPositions[index]?.rotate})`,
            }}
            alt={`${flower.type} ${flower.color}`}
          />
        );
      })}

      {/* 포장지 렌더링은 이전과 동일 */}
      <img
        src={wrapperBackImages[selectedColor]}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-10"
        alt=""
      />
      <img
        src={wrapperFrontImages[selectedColor]}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-30 pointer-events-none"
        alt=""
      />
    </div>
  );
}
