// src/component/StoryCanvas.tsx
import React, { forwardRef } from "react";
import BouquetViewer from "./BoquetViewer"; // 모달 메인에서 쓰는 완벽한 컴포넌트

interface StoryCanvasProps {
  displayData: {
    summary: {
      purpose: string;
      paper: string;
      flowers: Array<{ type: string; color: string }>;
    };
  };
}

const StoryCanvas = forwardRef<HTMLDivElement, StoryCanvasProps>(
  ({ displayData }, ref) => {
    return (
      <div className="absolute -top-[9999px] left-0">
        <div
          ref={ref}
          className="w-[1080px] h-[1920px] bg-[#fcf7f6] flex flex-col items-center justify-between p-24 relative"
          style={{ backgroundColor: "#fcf7f6" }}
        >
          {/* 상단 로고 영역 */}
          <div className="text-center mt-28">
            <p className="text-4xl tracking-widest text-pink-400 font-semibold mb-3">
              FLOWERTOWB
            </p>
            <div className="w-24 h-[3px] bg-pink-300 mx-auto"></div>
          </div>

          {/* 💡 해결 포인트: BouquetViewer를 원래 비율이 안 깨지는 300px로 둡니다. */}
          {/* 대신 style={{ zoom: 2.2 }}를 주어 내부 좌표 연산의 뒤틀림 없이 통째로 2.2배 확대합니다! */}
          <div className="w-[660px] h-[660px] flex items-center justify-center relative">
            <div style={{ zoom: 3.2 }} className="w-[300px] h-[300px]">
              <BouquetViewer
                selectedFlowers={displayData.summary.flowers}
                selectedColor={displayData.summary.paper}
              />
            </div>
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
export default StoryCanvas;
