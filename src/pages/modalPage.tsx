import { useNavigate } from "react-router-dom";
import SummaryBox from "../component/SummaryBox";
import {
  FaCopy,
  FaCalendarCheck,
  FaComment,
  FaInstagram,
} from "react-icons/fa"; // react-icons 설치 필요
import PortfolioComponent from "../component/portfolioComponent";

//TODO:네이버 예약,하단 네이버 버튼
// 사장님한테 링크 받아서 해야함(아니면 예약에서 튕김)
export default function ModalPage() {
  const navigate = useNavigate();

  // 요약에 들어갈 실제 내용 (예시 데이터)
  const summaryContent = `[플라워토브 꽃다발 요청]
🎂 받는 분: 엄마를 위한 꽃다발
💐 스타일: 유니크한 형태
🌸 꽃 구성: 장미(하양)
🎀 포장지: 분홍색
🎨 컬러톤: 화이트/내추럴 계열

※ 커스터마이저로 제작된 이미지입니다.`;

  //복사하기 함수
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryContent);
      alert("주문 내용이 클립보드에 복사되었습니다! 🎉");
      // 만약 토스트 메시지 라이브러리를 쓰신다면 alert 대신 쓰시면 더 예뻐요.
    } catch (err) {
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-full max-w-md bg-pink rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더: 닫기 버튼 */}
        <div className="flex justify-between items-center p-6 border-b border-pink-2">
          <h2 className="text-xl font-bold">꽃다발 완성! 🎉</h2>
          <button onClick={() => navigate(-1)} className="text-2xl">
            ×
          </button>
        </div>
        {/* 컨텐츠 영역: 이미지 및 설명 */}
        <div className="p-6">
          <div className="bg-content-area rounded-2xl p-10 flex justify-center mb-6">
            {/* 여기에 꽃다발 이미지 */}
            <div className="w-40 h-40 bg-pink-2 rounded-t-full relative">
              <span className="absolute -top-10 left-1/2 -translate-x-1/2">
                🌸
              </span>
            </div>
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
            <SummaryBox content={summaryContent} />

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
