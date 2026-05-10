import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// 포트폴리오 이미지 데이터 배열
const portfolioImages = [
  "path/to/your/image1.jpg",
  "path/to/your/image2.jpg",
  "path/to/your/image3.jpg",
  // ... 추가 이미지 경로
];

export default function PortfolioComponent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이전 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? portfolioImages.length - 1 : prevIndex - 1,
    );
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === portfolioImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // 이미지 다운로드 함수
  const downloadImage = ({ imageUrl }: { imageUrl?: string }) => {
    // 1. URL이 없으면 함수 종료 (방어 코드)
    if (!imageUrl) return;

    fetch(imageUrl, {
      method: "GET",
      // 2. 외부 서버 이미지일 경우 브라우저 정책에 따라 불가능할 수 있음
    })
      .then((response) => {
        // 3. 응답이 성공(200 OK)했는지 확인
        if (!response.ok) throw new Error("네트워크 응답이 좋지 않습니다.");
        return response.blob(); // arrayBuffer보다 blob()이 직접적이고 편합니다.
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "portfolio_image.jpg");
        document.body.appendChild(link);
        link.click();

        // 4. 메모리 관리를 위해 사용한 객체 URL 해제
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("다운로드 중 오류 발생:", err);
        // 사용자에게 알림을 주면 더 좋습니다.
        alert(
          "이미지를 다운로드할 수 없습니다. 서버 보안 정책을 확인해주세요.",
        );
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold text-gray-800">사장님 포트폴리오</span>
        <button className="text-pink-500 text-sm flex items-center gap-1 hover:underline">
          더 보기 <FaExternalLinkAlt size={12} />
        </button>
      </div>

      <div className="relative border border-gray-200 rounded-lg p-2 bg-gray-50 flex flex-col items-center justify-center">
        {/* 이미지 컨테이너 */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-6 overflow-hidden rounded-lg">
          <img
            src={portfolioImages[currentImageIndex]}
            alt={`Portfolio ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* 이전 버튼 */}
          <button
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2.5 shadow-md hover:bg-white/90 transition-colors"
          >
            &lt;
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2.5 shadow-md hover:bg-white/90 transition-colors"
          >
            &gt;
          </button>
        </div>

        {/* 인디케이터 (점) */}
        <div className="flex gap-2.5 mb-6">
          {portfolioImages.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-pink-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* 사진 저장하기 버튼 */}
        <button
          onClick={() => downloadImage(portfolioImages[currentImageIndex])}
          className="bg-white border border-gray-200 rounded-lg px-8 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          사진 저장하기
        </button>
      </div>
    </div>
  );
}
