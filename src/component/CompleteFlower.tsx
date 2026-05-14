import { useState } from "react";
import Card from "./Card";

import canationPink from "../assets/flowers/canationPink.png";
import gerbaraBlue from "../assets/flowers/gerbaraBlue.png";
import gerbaraPink from "../assets/flowers/gerbaraPink.png";
import gerbaraYellow from "../assets/flowers/gerbaraYellow.png";
import lavenderPurple from "../assets/flowers/lavenderPurple.png";
import tulipRed from "../assets/flowers/tulipRed.png";
import tulipYellow from "../assets/flowers/tulipYellow.png";
import lisianthusPink from "../assets/flowers/LisianthusPink.png";
import lisianthusPurple from "../assets/flowers/LisianthusPurple.png";
import pomponBlue from "../assets/flowers/PomponBlue.png";
import pomponYellow from "../assets/flowers/pomponYellow.png";
import roseBlack from "../assets/flowers/roseBlack.png";
import roseBlue from "../assets/flowers/roseBlue.png";
import rosePink from "../assets/flowers/rosePink.png";
import roseRed from "../assets/flowers/roseRed.png";
import roseWhite from "../assets/flowers/roseWhite.png";

{/* 꽃다발 뒷배경 */}
import wrapperPinkBack from "../assets/seeWrapper/classic/wrapperPinkBack.png";
import wrapperYellowBack from "../assets/seeWrapper/classic/wrapperYellowBack.png";
import wrapperWhiteBack from "../assets/seeWrapper/classic/wrapperWhiteBack2.png";
import wrapperPurpleBack from "../assets/seeWrapper/classic/wrapperPurpleBack.png";
import wrapperGreenBack from "../assets/seeWrapper/classic/wrapperGreenBack.png";
import wrapperBrownBack from "../assets/seeWrapper/classic/wrapperBrownBack.png";
import wrapperBlueBack from "../assets/seeWrapper/classic/wrapperBlueBack.png";

import wrapperEastBack from "../assets/seeWrapper/unique/wrapperEastBack.png";
import wrapperWestBack from "../assets/seeWrapper/unique/wrapperWestBack.png";
import wrapperBlackBack from "../assets/seeWrapper/unique/wrapperBlackBack.png";

{/* 꽃다발 앞덮개 */}
import wrapperPinkFront from "../assets/seeWrapper/classic/wrapperPinkFront.png";
import wrapperYellowFront from "../assets/seeWrapper/classic/wrapperYellowFront.png";
import wrapperWhiteFront from "../assets/seeWrapper/classic/wrapperWhiteFront.png";
import wrapperPurpleFront from "../assets/seeWrapper/classic/wrapperPurpleFront.png";
import wrapperGreenFront from "../assets/seeWrapper/classic/wrapperGreenFront.png";
import wrapperBrownFront from "../assets/seeWrapper/classic/wrapperBrownFront.png";
import wrapperBlueFront from "../assets/seeWrapper/classic/wrapperBlueFront.png";

import wrapperEastFront from "../assets/seeWrapper/unique/wrapperEastFront.png";
import wrapperWestFront from "../assets/seeWrapper/unique/wrapperWestFront.png";
import wrapperBlackFront from "../assets/seeWrapper/unique/wrapperBlackFront.png";

const flowers = {
  장미: [roseRed, rosePink, roseWhite, roseBlue, roseBlack],
  튤립: [tulipRed, tulipYellow],
  거베라: [gerbaraPink, gerbaraYellow, gerbaraBlue],
  리시안셔스: [lisianthusPink, lisianthusPurple],
  폼폼국화: [pomponBlue, pomponYellow],
  라벤더: [lavenderPurple],
  카네이션: [canationPink],
};

const classicFlowerPositions = [
  { left: "50%", top: "0%", rotate: "-10deg" },
  { left: "36%", top: "6%", rotate: "-25deg" },
  { left: "64%", top: "6%", rotate: "20deg" },
  { left: "43%", top: "18%", rotate: "-8deg" },
  { left: "57%", top: "18%", rotate: "12deg" },
];

const uniqueFlowerPositions = [
  { left: "53%", top: "6%", rotate: "-5deg" },
  { left: "43%", top: "11%", rotate: "-18deg" },
  { left: "62%", top: "11%", rotate: "18deg" },
  { left: "48%", top: "20%", rotate: "-6deg" },
  { left: "58%", top: "20%", rotate: "8deg" },
];

const uniqueWrapperNames = ["동양풍", "서양풍", "검정색"];

const wrapperBackImages: Record<string, string> = {
  분홍색: wrapperPinkBack,
  노란색: wrapperYellowBack,
  하얀색: wrapperWhiteBack,
  보라색: wrapperPurpleBack,
  연두색: wrapperGreenBack,
  갈색: wrapperBrownBack,
  하늘색: wrapperBlueBack,
  동양풍: wrapperEastBack,
  서양풍: wrapperWestBack,
  검정색: wrapperBlackBack,
};

const wrapperFrontImages: Record<string, string> = {
  분홍색: wrapperPinkFront,
  노란색: wrapperYellowFront,
  하얀색: wrapperWhiteFront,
  보라색: wrapperPurpleFront,
  연두색: wrapperGreenFront,
  갈색: wrapperBrownFront,
  하늘색: wrapperBlueFront,

  동양풍: wrapperEastFront,
  서양풍: wrapperWestFront,
  검정색: wrapperBlackFront,
};

export default function CompleteFlower({
  selectedColor,
}: {
  selectedColor: string;
}) {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const isUniqueWrapper = uniqueWrapperNames.includes(selectedColor);

  const currentFlowerPositions = isUniqueWrapper
    ? uniqueFlowerPositions
    : classicFlowerPositions;
  
  const handleAddFlower = (flower: string) => {
    if (selectedFlowers.length >= 5) return;

    setSelectedFlowers((prev) => [...prev, flower]);
  };

  const handleReset = () => {
    setSelectedFlowers([]);
  };

  const handleRemoveFlower = (removeIndex: number) => {
    setSelectedFlowers((prev) =>
      prev.filter((_, index) => index !== removeIndex)
    );
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
            {selectedFlowers.map((flower, index) => (
              <img
                key={index}
                src={flower}
                onClick={() => handleRemoveFlower(index)}
                alt="선택한 꽃"
                className={`
                  absolute object-contain z-20 cursor-pointer
                  ${isUniqueWrapper ? "w-28 h-28" : "w-40 h-40"}
                `}
                style={{
                  left: currentFlowerPositions[index].left,
                  top: currentFlowerPositions[index].top,
                  transform: `translateX(-50%) rotate(${currentFlowerPositions[index].rotate})`,
                }}
              />
            ))}

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
            꽃을 클릭하여 꽃다발에 추가해주세요<br/>
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
                      className="w-14 h-14 rounded-2xl border-2 border-pink-2 bg-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <img
                        src={flower}
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

        <button className="w-full py-4 bg-pink-5 text-white font-bold rounded-2xl flex items-center justify-center transition-all shadow-sm">
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