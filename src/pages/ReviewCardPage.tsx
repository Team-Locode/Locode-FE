import { useState } from "react";
import Header from "../component/common/Header";
import FlipCard from "../component/FlipCard";
import { useLocation, useNavigate } from "react-router-dom";
import { postReviewCompleted } from "../services/reviewService";


const ReviewCardPage = () => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(1); // 시작은 1
  const { state } = useLocation();
  const reviewTerms = state?.reviewTerms ?? [];
  const total = reviewTerms.length;
  const current = reviewTerms[index - 1];
  const [completedCount, setCompletedCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handeFilpCard = () => {
    setIsFlipped(!isFlipped)
  }

  // 0 ~ 100
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const handleNext = () => {
    setCompletedCount((c) => Math.min(total, c + 1)); // 완료 +1
    setIndex((v) => Math.min(total, v + 1));          // 다음 카드로
  };

  const handleReviewCompleted = async () => {
  try {
    await postReviewCompleted()
    setCompletedCount(total); 
    navigate("/reviewCompletedPage", { replace: true });
  } catch (e) {
    console.error("복습 완료 처리 실패:", e);
    alert("복습 완료 처리에 실패했어요. 다시 시도해주세요.");
  }
};

  return (
    <div className="w-full min-h-screen bg-gray-7 flex flex-col items-center">
      
      {/* 1. 헤더 */}
      <Header>
        <div className="relative flex flex-col w-full max-w-2xl px-10 pt-3 pb-5 gap-3 mx-auto">
          
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              
              <div className="mb-2 h-6 text-medium-24 text-primary-6">{completedCount}/{total}</div>
            </div>
            <div className="mb-2 h-6 text-medium-24 text-primary-6">{progress}%</div>
          </div>
          <div className="w-full bg-primary-3 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-secondary h-full rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </Header>

      {/* 2. 메인 컨텐츠 */}
      <main className="w-full h-full max-w-2xl flex flex-col pb-7 m-19">
        
        {/* 카드 섹션 */}
        <div className="relative px-10 flex justify-center w-full mt-8">
          <FlipCard
            tag={current.category}
            title={current.title}
            description={current.description}
            example={current.example}
            onTap={handeFilpCard}
            isFlipped={isFlipped}
          />
        </div>
      </main>

      {/* 3. 하단 고정 푸터 */}
      <footer className="left-0 w-full flex justify-center bg-white border-t-2 border-gray-100 py-6 z-[999]">
        {/* gap-4 -> gap-10 : 버튼 사이 간격을 넓힘
            (gap-6, gap-8, gap-12 등으로 조절 가능)
        */}
        <div className="w-full max-w-xl flex justify-end flex ">
          <button
            onClick={index === total ? handleReviewCompleted : handleNext}
            className="w-45 h-14 rounded-2xl bg-primary text-white text-medium-24 shadow-lg transition-transform active:scale-95 hover:brightness-95"
          >
            {/* index가 total(5)이면 '학습 완료', 아니면 '다음' */}
            {index === total ? "복습 완료" : "다음"}
          </button>
        </div>
      </footer>

    </div>
  );
};

export default ReviewCardPage;