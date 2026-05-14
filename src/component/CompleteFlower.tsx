import { useState } from "react";
import Card from "./Card";

import wrapperBack from "../assets/flowers/wrapperBack.png";
import canationPink from "../assets/flowers/canationPink.png";
import gerbaraBlue from "../assets/flowers/gerbaraBlue.png";
import gerbaraPink from "../assets/flowers/gerbaraPink.png";
import gerbaraYellow from "../assets/flowers/gerbaraYellow.png";
import lavenderPurple from "../assets/flowers/lavenderPurple.png";
import lisianthusPink from "../assets/flowers/LisianthusPink.png";
import pomponBlue from "../assets/flowers/PomponBlue.png";
import pomponYellow from "../assets/flowers/pomponYellow.png";
import roseBlack from "../assets/flowers/roseBlack.png";
import roseBlue from "../assets/flowers/roseBlue.png";
import rosePink from "../assets/flowers/rosePink.png";
import rosePurple from "../assets/flowers/rosePurple.png";
import roseRed from "../assets/flowers/roseRed.png";
import roseWhite from "../assets/flowers/roseWhite.png";

const flowers = {
  장미: [roseRed, rosePink, roseWhite, rosePurple, roseBlue, roseBlack],
  거베라: [gerbaraPink, gerbaraYellow, gerbaraBlue],
  리시안셔스: [lisianthusPink],
  폼폰: [pomponBlue, pomponYellow],
  라벤더: [lavenderPurple],
  카네이션: [canationPink],
};

const flowerPositions = [
  { left: "50%", top: "0%", rotate: "-10deg" },
  { left: "36%", top: "6%", rotate: "-25deg" },
  { left: "64%", top: "6%", rotate: "20deg" },
  { left: "43%", top: "18%", rotate: "-8deg" },
  { left: "57%", top: "18%", rotate: "12deg" },
];

export default function CompleteFlower() {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);

  const handleAddFlower = (flower: string) => {
    if (selectedFlowers.length >= 5) return;

    setSelectedFlowers((prev) => [...prev, flower]);
  };

  const handleReset = () => {
    setSelectedFlowers([]);
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
                alt="선택한 꽃"
                className="absolute w-30 h-30 object-contain z-30"
                style={{
                  left: flowerPositions[index].left,
                  top: flowerPositions[index].top,
                  transform: `translateX(-50%) rotate(${flowerPositions[index].rotate})`,
                }}
              />
            ))}

            {/* 포장지 */}
            <img
              src={wrapperBack}
              alt="포장지 앞면"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[280px] z-20"
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
            꽃을 클릭하거나 꽃다발로 드래그해주세요
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