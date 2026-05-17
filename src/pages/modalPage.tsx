import SummaryBox from "../component/SummaryBox";
import {
  FaCopy,
  FaCalendarCheck,
  FaComment,
  FaInstagram,
  FaImage,
} from "react-icons/fa"; // react-icons 설치 필요
import PortfolioComponent from "../component/portfolioComponent";
import BouquetViewer from "../component/BoquetViewer";
import { useRef } from "react";
import { toPng } from "html-to-image";

import StoryCanvas from "../component/StoryCanvas";

//TODO:네이버 예약,하단 네이버 버튼
// 사장님한테 링크 받아서 해야함(아니면 예약에서 튕김)
type ModalPageProps = {
  onClose: () => void;
  bouquetData: any; // API 응답 데이터를 받을 Props 추가
};
export default function ModalPage({ onClose, bouquetData }: ModalPageProps) {
  // 만약 props로 데이터가 안 넘어왔을 때를 대비한 기본값(테스트용)
  const displayData = bouquetData || {
    summary: {
      purpose: "엄마를 위한 꽃다발",
      style: "유니크한 형태",
      flowers: [
        {
          type: "ROSE",
          color: "RED",
        },
      ], // 여기에 꽃 이미지 URL 배열이 들어옴
      paper: "분홍색",
      colorTone: ["화이트/내추럴 계열"],
    },
  };

  // 꽃 이름을 문자열로 가공 (텍스트 주문서용)
  const flowerNames = displayData.summary.flowers
    .map((f: any) => `${f.type}(${f.color})`)
    .join(", ");

  // 요약에 들어갈 실제 내용 (예시 데이터)
  const formattedSummary = `[플라워토브 꽃다발 요청]
🎂 받는 분: ${displayData.summary.purpose}
💐 스타일: ${displayData.summary.style}
🌸 꽃 구성: ${Array.isArray(displayData.summary.flowers.type) ? displayData.summary.flowers.join(", ") : displayData.summary.flowers}
🎀 포장지: ${displayData.summary.paper}
🎨 컬러톤: ${displayData.summary.colorTone}

※ 커스터마이저로 제작된 이미지입니다.`;

  //복사하기 함수
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummary);
      alert("주문 내용이 클립보드에 복사되었습니다! 🎉");
      // 만약 토스트 메시지 라이브러리를 쓰신다면 alert 대신 쓰시면 더 예뻐요.
    } catch (err) {
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 💡 인스타 스토리용 숨겨진 영역을 가리킬 Ref
  const storyRef = useRef<HTMLDivElement>(null);

  // 💡 인스타 스토리 이미지 다운로드 함수
  const handleDownloadStoryImage = async () => {
    if (!storyRef.current) return;

    try {
      // 폰트가 완전히 로드될 때까지 대기
      await document.fonts.ready;

      // 이미지가 제자리에 렌더링될 수 있도록 300ms 대기 후 캡처
      const dataUrl = await new Promise<string>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const url = await toPng(storyRef.current!, {
              cacheBust: true,
              // 💡 컴포넌트에서 이미 크기를 키웠으므로 화질 개선용으로 2~3배만 고정해줍니다.
              pixelRatio: 2,
              skipFonts: true,
            });
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }, 300);
      });

      // 가짜 a 태그 생성 후 다운로드 실행
      const link = document.createElement("a");
      link.download = `story_${displayData.summary.purpose || "꽃다발"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("스토리 이미지 생성 중 오류 발생:", error);
      alert("이미지 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* 🔥 [💥 중요] 인스타그램 스토리용 9:16 숨겨진 캔버스 영역 */}
      <StoryCanvas ref={storyRef} displayData={displayData} />
      <div
        className="relative w-full max-w-md bg-pink rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더: 닫기 버튼 */}
        <div className="flex justify-between items-center p-6 border-b border-pink-2">
          <h2 className="text-xl font-bold">꽃다발 완성! 🎉</h2>
          <button onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>
        {/* 컨텐츠 영역: 이미지 및 설명 */}
        <div className="p-6">
          <div className="bg-content-area rounded-2xl p-10 flex justify-center mb-6">
            {/* 여기에 꽃다발 이미지 */}
            <BouquetViewer
              selectedFlowers={displayData.summary.flowers}
              selectedColor={displayData.summary.paper}
            />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">엄마를 위한 꽃다발</h3>
            <div className="bg-orange-50 text-orange-600 text-sm p-3 rounded-xl mb-6">
              ⚠️ 실제와는 다를 수 있음. 자세한 요구는 상담 필요!!
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-bold border-t border-pink-2 pt-4">주문 요약</p>
            {/* 긴 내용... (자동으로 스크롤 생김) */}
            {/* 2. 기존 빈 div 대신 SummaryBox 적용 */}
            <SummaryBox content={formattedSummary} />

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              <FaCopy className="text-gray-400" /> 주문 내용 복사하기
            </button>
          </div>

          {/* 주문/상담하기 섹션 */}
          <div className="space-y-3">
            <p className="font-bold pt-4 text-gray-800 ml-1">주문/상담하기</p>
            <button
              onClick={handleDownloadStoryImage}
              className="w-full bg-[#ff62b3] text-white flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-2xl text-sm font-semibold hover:bg-gray-50 transition"
            >
              <FaImage className="text-white" /> 꽃다발 이미지 저장하기
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  window.open(
                    "https://m.place.naver.com/place/1958826162/home", //네이버 예약,하단 네이버 버튼 사장님한테 링크 받아서 해야함(아니면 예약에서 튕김)
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="flex flex-col items-center justify-center py-4 bg-[#58C777] text-white rounded-2xl font-bold gap-1 shadow-sm hover:opacity-90 transition"
              >
                <FaCalendarCheck size={20} />
                <span className="text-sm">네이버 예약</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    "http://pf.kakao.com/_axkXExj/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="flex flex-col items-center justify-center py-4 bg-[#FAE100] text-[#3C1E1E] rounded-2xl font-bold gap-1 shadow-sm hover:opacity-90 transition"
              >
                <FaComment size={20} />
                <span className="text-sm">카카오톡 상담</span>
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-2xl text-sm font-bold hover:bg-gray-50 transition">
              <FaInstagram className="text-pink-500" /> 인스타그램 스토리
              공유하기
            </button>
          </div>

          {/* 포트폴리오 링크 */}
          <div className="flex justify-between items-center pt-4 ">
            <PortfolioComponent />
          </div>

          {/* 하단 인스타그램,네이버 연결 버튼 */}
          <div className="flex flex-col items-center w-full mt-6 space-y-6">
            {/* 1. 구분선 (사진 속 연한 회색 선) */}
            <div className="w-full h-[1px] border-t border-pink-2"></div>

            {/* 2. SNS 아이콘 버튼들 */}
            <div className="flex gap-4 justify-center items-center">
              {/* 인스타그램 버튼 */}
              <button
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/towbflower131/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition shadow-sm border border-gray-100"
              >
                <FaInstagram className="text-xl text-gray-700" />
              </button>

              {/* 네이버 버튼 */}
              <button
                onClick={() =>
                  window.open(
                    "https://m.place.naver.com/place/1958826162/home", //네이버 예약,하단 네이버 버튼 사장님한테 링크 받아서 해야함(아니면 예약에서 튕김)
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition shadow-sm border border-gray-100"
              >
                <span className="text-xl font-black text-[#03C75A]">N</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
