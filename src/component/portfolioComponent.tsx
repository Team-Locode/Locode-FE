import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// 1. 포트폴리오 데이터 (서버 대신 프론트에 저장해둔 이미지들)
const portfolioData = [
  { src: "/images/port1.jpg", tags: ["핑크"] },
  { src: "/images/port2.jpg", tags: ["핑크", "화이트"] },
  { src: "/images/port3.jpg", tags: ["블랙", "레드"] },
  { src: "/images/port4.jpg", tags: ["컬러풀"] },
  { src: "/images/port5.jpg", tags: ["옐로우"] },
];

// 2. 🎯 부모 컴포넌트로부터 넘어오는 컬러톤 데이터를 Props로 받습니다!
interface PortfolioComponentProps {
  requestedTones: string[]; // 예: ["핑크", "화이트"]
}

export default function PortfolioComponent({
  requestedTones = [],
}: PortfolioComponentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 3. 🎯 필터링 로직은 컴포넌트 내부에서 처리하여 props가 바뀔 때마다 재계산되게 합니다.
  // 1순위: 모두 포함(AND)
  let displayImages = portfolioData.filter((image) =>
    requestedTones.every((tone) => image.tags.includes(tone)),
  );

  // 2순위: 하나라도 포함(OR)
  if (displayImages.length === 0) {
    displayImages = portfolioData.filter((image) =>
      requestedTones.some((tone) => image.tags.includes(tone)),
    );
  }

  // 3순위: 아예 없으면 전체 보여주기
  if (displayImages.length === 0) {
    displayImages = portfolioData;
  }

  // 4. 🎯 filteredImages 대신 displayImages 사용
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const downloadImage = (imageUrl?: string) => {
    if (!imageUrl) return;

    fetch(imageUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) throw new Error("네트워크 응답이 좋지 않습니다.");
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "portfolio_image.jpg");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("다운로드 중 오류 발생:", err);
        alert(
          "이미지를 다운로드할 수 없습니다. 서버 보안 정책을 확인해주세요.",
        );
      });
  };

  return (
    <div className="w-full">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="font-bold text-gray-800 text-lg">
          사장님 포트폴리오
        </span>
        <button
          onClick={() =>
            window.open(
              "https://www.instagram.com/towbflower131/",
              "_blank",
              "noopener,noreferrer",
            )
          }
          className="text-pink-500 text-sm flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          더 보기 <FaExternalLinkAlt size={12} />
        </button>
      </div>

      {/* 갤러리 메인 컨테이너 */}
      <div className="relative w-full aspect-square max-w-[400px] mx-auto rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
        {/* 이미지 - 🎯 객체에서 .src를 꼭 뽑아서 써야 합니다! */}
        <img
          src={displayImages[currentImageIndex]?.src}
          alt={`Portfolio ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          style={{ WebkitTouchCallout: "default" }}
        />

        {/* 다운로드 버튼 - 🎯 .src 추가 */}
        <button
          onClick={() => downloadImage(displayImages[currentImageIndex]?.src)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white text-gray-700 rounded-full shadow-sm backdrop-blur-sm transition-all"
          aria-label="사진 저장하기"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
        </button>

        {/* 네비게이션 버튼 */}
        <button
          onClick={handlePrevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 hover:bg-white text-gray-700 rounded-full shadow-sm backdrop-blur-sm transition-all"
        >
          &lt;
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 hover:bg-white text-gray-700 rounded-full shadow-sm backdrop-blur-sm transition-all"
        >
          &gt;
        </button>

        {/* 인디케이터 (점) */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5">
          {displayImages.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-4"
                  : "bg-white/50 w-1.5"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3 font-light">
        사진을 꾹 누르거나 우측 상단 아이콘을 눌러 저장할 수 있어요
      </p>
    </div>
  );
}
