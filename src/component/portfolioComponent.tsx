import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
//클래식
import portc1 from "../assets/portfolio/classic/portc1.png";
import portc2 from "../assets/portfolio/classic/portc2.png";
import portc3 from "../assets/portfolio/classic/portc3.png";
import portc4 from "../assets/portfolio/classic/portc4.png";
import portc5 from "../assets/portfolio/classic/portc5.png";
import portc6 from "../assets/portfolio/classic/portc6.png";
import portc7 from "../assets/portfolio/classic/portc7.png";
import portc8 from "../assets/portfolio/classic/portc8.png";
import portc9 from "../assets/portfolio/classic/portc9.png";
import portc10 from "../assets/portfolio/classic/portc10.png";
import portc11 from "../assets/portfolio/classic/portc11.png";
import portc12 from "../assets/portfolio/classic/portc12.png";
import portc13 from "../assets/portfolio/classic/portc13.png";
import portc14 from "../assets/portfolio/classic/portc14.png";
import portc15 from "../assets/portfolio/classic/portc15.png";
import portc16 from "../assets/portfolio/classic/portc16.png";

//유니크
import portu1 from "../assets/portfolio/unique/portu1.png";
import portu2 from "../assets/portfolio/unique/portu2.png";
import portu3 from "../assets/portfolio/unique/portu3.png";
import portu4 from "../assets/portfolio/unique/portu4.png";
import portu5 from "../assets/portfolio/unique/portu5.png";
import portu6 from "../assets/portfolio/unique/portu6.png";
import portu7 from "../assets/portfolio/unique/portu7.png";
import portu8 from "../assets/portfolio/unique/portu8.png";
import portu9 from "../assets/portfolio/unique/portu9.png";
import portu10 from "../assets/portfolio/unique/portu10.png";

// 1.데이터에 style(클래식/유니크) 속성 추가
const portfolioData = [
  {
    src: portc1,
    tags: ["핑크", "화이트"],
    style: "클래식",
  },
  {
    src: portc16,
    tags: ["옐로우"],
    style: "클래식",
  },
  {
    src: portc12,
    tags: ["옐로우"],
    style: "클래식",
  },
  {
    src: portc2,
    tags: ["옐로우"],
    style: "클래식",
  },
  {
    src: portc3,
    tags: ["핑크", "화이트"],
    style: "클래식",
  },
  {
    src: portc4,
    tags: ["핑크"],
    style: "클래식",
  },
  {
    src: portc5,
    tags: ["블루", "화이트"],
    style: "클래식",
  },
  {
    src: portc6,
    tags: ["퍼플", "화이트"],
    style: "클래식",
  },
  {
    src: portc8,
    tags: ["컬러풀"],
    style: "클래식",
  },
  {
    src: portc7,
    tags: ["컬러풀"],
    style: "클래식",
  },
  {
    src: portc9,
    tags: ["화이트", "퍼플"],
    style: "클래식",
  },
  {
    src: portc10,
    tags: ["화이트", "핑크"],
    style: "클래식",
  },
  {
    src: portc11,
    tags: ["핑크"],
    style: "클래식",
  },
  {
    src: portc13,
    tags: ["핑크", "퍼플"],
    style: "클래식",
  },
  {
    src: portc14,
    tags: ["레드"],
    style: "클래식",
  },
  {
    src: portc15,
    tags: ["블루", "퍼플"],
    style: "클래식",
  },
  ,
  { src: portu1, tags: ["블루", "화이트"], style: "유니크" },
  { src: portu5, tags: ["블루", "화이트"], style: "유니크" },
  {
    src: portu2,
    tags: ["컬러풀"],
    style: "유니크",
  },
  {
    src: portu3,
    tags: ["퍼플", "화이트"],
    style: "유니크",
  },
  {
    src: portu4,
    tags: ["레드"],
    style: "유니크",
  },

  {
    src: portu6,
    tags: ["블루", "퍼플"],
    style: "유니크",
  },
  {
    src: portu8,
    tags: ["레드"],
    style: "유니크",
  },
  {
    src: portu7,
    tags: ["핑크"],
    style: "유니크",
  },
  {
    src: portu9,
    tags: ["블랙"],
    style: "유니크",
  },
  {
    src: portu10,
    tags: ["옐로우"],
    style: "유니크",
  },
];
// 레드: "RED",
//   핑크: "PINK",
//   화이트: "WHITE",
//   블루: "BLUE",
//   블랙: "BLACK",
//   옐로우: "YELLOW",
//   보라: "PURPLE",
//   퍼플: "PURPLE",
// 2. 🎯 부모 컴포넌트로부터 넘어오는 Props에 requestedStyle 추가
interface PortfolioComponentProps {
  requestedTones: string[]; // 예: ["핑크", "화이트"]
  requestedStyle: string; // 예: "클래식" 또는 "유니크"
}

export default function PortfolioComponent({
  requestedTones = [],
  requestedStyle = "클래식", // 기본값
}: PortfolioComponentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🎯 부모에서 옵션을 바꾸면 사진 인덱스를 다시 0(처음)으로 리셋 (에러 방지용)
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [requestedTones, requestedStyle]);

  // 3. 🎯 2단계 필터링 로직
  // [1단계] 사용자가 선택한 스타일(클래식/유니크)의 사진만 먼저 싹 모읍니다.
  const styleFilteredImages = portfolioData.filter(
    (image) => image.style === requestedStyle,
  );

  // (방어 코드: 혹시 해당 스타일의 사진이 아예 없다면 전체 사진을 기준으로 삼음)
  const baseImages =
    styleFilteredImages.length > 0 ? styleFilteredImages : portfolioData;

  // [2단계] 모아둔 스타일 사진들 안에서 컬러톤을 필터링합니다.

  // 1순위: 교집합(AND) - 요청한 컬러톤이 모두 들어간 완벽 매칭 사진
  let displayImages = baseImages.filter((image) =>
    requestedTones.every((tone) => image.tags.includes(tone)),
  );

  // 2순위: 완벽하게 겹치는 사진이 없다면? 하나라도 겹치는(OR) 사진들을 보여줌
  if (displayImages.length === 0) {
    displayImages = baseImages.filter((image) =>
      requestedTones.some((tone) => image.tags.includes(tone)),
    );
  }

  // 3순위: 하나라도 겹치는 컬러 사진조차 없다면? 해당 스타일의 전체 사진을 보여줌
  if (displayImages.length === 0) {
    displayImages = baseImages;
  }

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
      <div className="relative w-full aspect-[3/4] max-w-[400px] mx-auto rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
        {/* 이미지 */}
        <img
          src={displayImages[currentImageIndex]?.src}
          alt={`Portfolio ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          style={{ WebkitTouchCallout: "default" }}
        />

        {/* 다운로드 버튼 */}
        <button
          onClick={() => downloadImage(displayImages[currentImageIndex]?.src)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white text-gray-700 rounded-full shadow-sm backdrop-blur-sm transition-all"
          aria-label="사진 저장하기"
        >
          <svg
            width="18"
            height="40"
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

        {/* 네비게이션 버튼 (사진이 2장 이상일 때만 보임) */}
        {displayImages.length > 1 && (
          <>
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
          </>
        )}

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
