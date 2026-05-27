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
import { StoryCanvas } from "../component/StoryCanvas";
import { Link } from "react-router-dom";

//TODO:네이버 예약,하단 네이버 버튼
// 사장님한테 링크 받아서 해야함(아니면 예약에서 튕김)
// MainPage에서 정의한 인터페이스와 동일하게 props 지정
type ModalPageProps = {
  onClose: () => void;
  bouquetData: any;
};
export default function ModalPage({ onClose, bouquetData }: ModalPageProps) {
  // 백엔드 실제 응답 구조에 맞춘 기본값 분기 처리
  const displayData = bouquetData || {
    bouquetId: 3,
    summary: {
      purpose: "엄마에게 전하는 꽃다발",
      style: "클래식",
      flowers: ["장미(레드)", "장미(블랙)", "장미(옐로우)"],
      paper: "분홍",
      colorTone: ["컬러풀"],
    },
  };

  // 🎯 서버에서 한글 문자열 배열로 오기 때문에 바로 join 처리
  const flowerNames = Array.isArray(displayData.summary.flowers)
    ? displayData.summary.flowers.join(", ")
    : "";

  // 🎯 "분홍" 뒤에 "색"을 붙여서 wrapperBackImages 키값("분홍색")과 매칭 보정
  const paperColor = displayData.summary.paper?.endsWith("색")
    ? displayData.summary.paper
    : `${displayData.summary.paper}색`;

  const recipientName = displayData.summary.purpose
    ?.replace(/에게\s*전하는\s*꽃다발/g, "")
    .trim();

  // 요약에 들어갈 실제 주문서 텍스트
  const formattedSummary = `[꽃다발 만들기 페이지 통해 주문]
🎂 받는 분: ${recipientName}
💐 스타일: ${displayData.summary.style}
🌸 꽃 구성: ${flowerNames}
🎀 포장지: ${paperColor}
🎨 컬러톤: ${displayData.summary.colorTone?.join(", ")}

이벤트 참여용 인스타 아이디:`;

  // 복사하기 함수
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummary);
      alert(
        "주문 내용이 클립보드에 복사되었습니다! 🎉\n카톡이나 네이버 예약 시 붙여넣어 주세요.",
      );
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
  // 💡 인스타 스토리 직접 공유하기 함수 (Web Share API 활용)
  const handleShareInstagram = async () => {
    if (!storyRef.current) return;

    try {
      await document.fonts.ready;

      // 1. 먼저 이미지를 찰칵 찍어서 dataUrl로 만듭니다 (저장하기 로직과 동일)
      const dataUrl = await new Promise<string>((resolve, reject) => {
        setTimeout(async () => {
          try {
            const url = await toPng(storyRef.current!, {
              cacheBust: true,
              pixelRatio: 2,
              skipFonts: true,
            });
            resolve(url);
          } catch (err) {
            reject(err);
          }
        }, 300);
      });

      // 2. dataUrl을 실제 '파일(File)' 객체로 변환합니다. (공유 기능을 쓰기 위해 필수)
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "flowertowb_story.png", {
        type: "image/png",
      });

      // 3. 모바일 기기인지 & 파일 공유 기능을 지원하는 브라우저인지 확인
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "FLOWERTOWB",
          text: "나만의 커스터마이징 플라워, 플라워토브 🌸\nhttps://www.lotowb.com",
        });
      } else {
        // PC 접속이거나 지원하지 않는 브라우저일 경우 예외 처리
        alert(
          "모바일 환경에서만 직접 공유가 가능합니다! 📸\n대신 갤러리에 저장해 드릴게요.",
        );
        handleDownloadStoryImage(); // 바로 위에서 만든 저장 함수를 대신 실행!
      }
    } catch (error) {
      console.error("스토리 이미지 공유 중 오류 발생:", error);
      alert("공유하기에 실패했습니다. 이미지를 직접 저장해서 공유해주세요!");
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
          <div className="bg-content-area bg-white/50 rounded-2xl p-10 flex justify-center mb-6">
            {/* 여기에 꽃다발 이미지 */}
            <BouquetViewer
              selectedFlowers={displayData.summary.flowers}
              selectedColor={displayData.summary.paper}
            />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">
              {displayData.summary.purpose || "나만의 꽃다발"}
            </h3>
            <div className="bg-orange-50 text-orange-600 text-sm p-3 border-1 border-orange-100 rounded-xl mb-5">
              ⚠️ 실제와는 다를 수 있음. 자세한 요구는 상담 필요!!<br/>
              ⚠️ 단색 꽃(레드, 블루, 블랙 등): 제작 전 반드시 상담 필요!!
            </div>
          </div>

          <div className="w-full border-t-2 border-dashed border-pink-200 my-2 mb-6"></div>

          <div className="bg-white/70 border-pink-200 p-4 border-2 rounded-xl mb-4 relative overflow-hidden">
          {/* 상단 이벤트 타이틀 & 전원 증정 배지 */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">💐</span>
              <h4 className="font-bold text-pink-600 text-sm tracking-wide">
                웹 오픈 기념 구매 인증 이벤트
              </h4>
            </div>
            {/* 가격 조건 없음을 강조하는 배지 */}
            <span className="bg-pink-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              금액 무관
            </span>
          </div>

          {/* 핵심 혜택 요약 안내 문구 */}
          <div className="text-xs text-gray-600 my-3 font-medium bg-pink-50 p-2.5 rounded-lg border border-pink-100 flex flex-col gap-1">
            <p>💡 이 서비스를 통해 주문하시는 모든 분께 <strong className="text-pink-500">물주머니를 기본 제공</strong>해 드립니다!</p>
            <p>📸 구글 폼을 통해 구매 내역을 인증하시면 추첨 선물로 핸드크림까지 받아가실 수 있어요.</p>
          </div>
          <Link to={"https://docs.google.com/forms/d/e/1FAIpQLSeMlvK_lRL-uFjvQE5QfbbbQqUiSOP3nWYpvwQfniMJSc8y5A/viewform?usp=header"}
            className="text-pink-500 text-sm font-bold">🧷구글 폼 바로 가기</Link>
        </div>

          <div className="bg-white/70 border-pink-200 p-4 border-2 rounded-xl mb-4 relative overflow-hidden">
            {/* 상단 이벤트 타이틀 & 3만원 이상 강조 배지 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🎁</span>
                <h4 className="font-bold text-pink-600 text-sm tracking-wide">
                  인스타그램 팔로우 이벤트
                </h4>
              </div>
              {/* 강조 배지 (우측 상단) */}
              <span className="bg-pink-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                3만원 이상 구매 시
              </span>
            </div>

            {/* 추가 강조 문구 (선택 사항 - 필요 없다면 삭제하셔도 됩니다) */}
            <p className="flex justify-center text-xs text-gray-600 my-3 font-medium bg-pink-50 p-2 rounded-lg border border-pink-100">
              <div>
                💡 <strong className="text-pink-500">3만원 이상</strong> 구매하시는 고객님들을 위한 특별한 혜택입니다!
              </div>
            </p>

            {/* Step 리스트 영역 */}
            <ul className="flex flex-col gap-3">
              {/* Step 1 */}
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 bg-pink-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                  Step 1
                </span>
                <span className="text-sm text-gray-700 leading-snug">
                  플라워토브 인스타그램(@towbflower131) 팔로우 꾹!
                </span>
              </li>

              {/* Step 2 */}
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 bg-pink-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                  Step 2
                </span>
                <span className="text-sm text-gray-700 leading-snug">
                  아래 주문 내용을 복사하여 작성 후 보내주세요!
                </span>
              </li>

              {/* Step 3 */}
              <li className="flex items-start gap-2.5">
                <span className="flex-shrink-0 bg-pink-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                  Step 3
                </span>
                <span className="text-sm text-gray-700 leading-snug">
                  인증 완료!
                </span>
              </li>
            </ul>
            <p className="flex justify-center text-center text-base text-gray-600 font-bold py-3 pb-1 rounded-lg">      
              🌸 확인 후 꽃다발에 곁들임꽃을 🌸<br/>풍성하게 더해드려요
            </p>
          </div>

          <div className="space-y-4">
            {/* <p className="font-bold border-t border-pink-2"></p> */}

            <p className="font-bold">주문 요약</p>
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
              className="w-full bg-[#ff62b3] text-white flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-2xl text-sm font-semibold hover:opacity-90 transition"
            >
              <FaImage className="text-white" /> 꽃다발 이미지 저장하기
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  window.open(
                    "https://m.place.naver.com/place/1958826162/home", //네이버 예약,하단 네이버 버튼 사장님한테 링크 받아ㅇ 서 해야함(아니면 예약에서 튕김)
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
            <button
              onClick={handleShareInstagram}
              className="w-full flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-2xl text-sm font-bold hover:bg-gray-50 transition"
            >
              <FaInstagram className="text-pink-500" /> 인스타그램 스토리
              공유하기
            </button>
          </div>

          {/* 포트폴리오 링크 */}
          <div className="flex justify-between items-center pt-4 ">
            <PortfolioComponent
              requestedTones={displayData.summary.colorTone}
              requestedStyle={displayData.summary.style}
            />
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
