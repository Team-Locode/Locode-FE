import {
  wrapperBackImages,
  wrapperFrontImages,
  classicFlowerPositions,
  uniqueFlowerPositions,
  uniqueWrapperNames,
} from "./CompleteFlower";

export default function BouquetViewer({
  selectedFlowers,
  selectedColor,
}: {
  selectedFlowers: string[];
  selectedColor: string;
}) {
  const isUniqueWrapper = uniqueWrapperNames.includes(selectedColor);
  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;
  return (
    <div className="relative w-full h-full max-w-[300px] aspect-square mx-auto">
      {/* 1. 선택된 꽃들 */}
      {selectedFlowers.map((flower, index) => (
        <img
          key={index}
          src={flower}
          alt="꽃"
          className={`absolute object-contain z-20 ${isUniqueWrapper ? "w-28 h-28" : "w-40 h-40"}`}
          style={{
            left: currentFlowerPositions[index].left,
            top: currentFlowerPositions[index].top,
            transform: `translateX(-50%) rotate(${currentFlowerPositions[index].rotate})`,
          }}
        />
      ))}
      {/* 2. 포장지 뒷면 */}
      <img
        src={wrapperBackImages[selectedColor]}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-10"
        alt=""
      />
      {/* 3. 포장지 앞면 */}
      <img
        src={wrapperFrontImages[selectedColor]}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-30 pointer-events-none"
        alt=""
      />
    </div>
  );
}
