import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import time from "../assets/time.svg"
import { CategoryType, ReviewPageResponse } from "../types/dto/review";

const Review = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 복습용어로 가야하는 값들 업데이트
  const [reviewData, setReviewData] = useState<ReviewPageResponse["result"] | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ReviewPageResponse>("/api/review");
        
        if (response.data.isSuccess && response.data.result) {
          setReviewData(response.data.result);
        } else {
          setError("데이터를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("Review API 호출 실패:", err);
      } finally {
        setLoading(false); // 성공하든 실패하든 로딩은 끝남
      }
    };

    fetchReviewData(); // 만든 함수 실행
  }, []);

  useEffect(() => {
    if (!reviewData) return;

    const count = reviewData.totalReviewCount ?? reviewData.reviewCardList.length;
    if (count === 0) {
      navigate("/reviewCompletedPage", { replace: true });
    }
  }, [reviewData, navigate]);

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="text-gray-9 text-medium-18">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="text-red-500 text-medium-18">{error}</div>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <div className="text-gray-9 text-medium-18">데이터가 없습니다.</div>
      </div>
    );
  }

  const categoryLabel = (category: CategoryType) => {
    switch (category) {
      case "INTEREST_RATE":
        return "금리";
      case "INFLATION":
        return "물가";
      case "INVESTMENT":
        return "투자";
      case "FISCAL":
        return "재정";
      default:
        return category;
    }
  };

  const reviewTerms = Array.from(
    new Map(
      reviewData.reviewCardList.map((card) => {
        const key = `${card.category}-${card.term}`; // 중복 기준(term과 category가 모두 같을 시 중복)
        return [
          key,
          {
            id: key,
            category: categoryLabel(card.category),
            title: card.term,
            description: card.descript,
            tip: card.tip,
            example: card.example,
          },
        ] as const;
      })
    ).values() //Map 안에 들어있는 값들만 뽑아오는 메서드
  );

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-8 px-4 pb-4 pt-[100px]">
      <div className="w-full h-full max-w-2xl space-y-6">
        <span className="text-gray-1 text-bold-28">복습</span>
        
        {/* 상단 메인 카드 */}
        <div className="mt-[32px] mb-10 rounded-3xl p-13 relative shadow-sm bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-6)]">
          <div className="absolute top-6 right-6 bg-primary-3 text-gray-9 text-medium-24 px-3 py-1 rounded-full">
            진행전
          </div>
          
          <div className="space-y-1 mb-15">
            <p className="text-primary-6 text-medium-24">복습이 필요해요</p>
            <h2 className="text-bold-32 text-gray-1">
              {reviewData.totalReviewCount}개 용어를 다시 확인해보세요.
            </h2>
          </div>

          <div className="bg-secondary-4 rounded-2xl p-6 flex">
            <p className="text-lg font-bold text-gray-700">
              <span className="text-primary text-bold-40">
                {reviewData.totalReviewCount}개</span> 
              <span className="text-gray-3 text-semibold-28"> 복습대기 중</span>
            </p>
          </div>
        </div>

        {/* 용어 리스트 섹션 */}
        <div className="space-y-4">
          <h3 className="text-bold-28 text-gray-1 ml-2">복습 용어</h3>
          
          {reviewTerms.map((term) => (
            <div 
              key={term.id} 
              className="bg-white rounded-2xl p-5 flex justify-between items-center shadow-md shadow-blue-100 border border-gray-100"
            >
              <div className="flex flex-col gap-2">
                <span className="bg-secondary-4 text-primary-6 text-medium-18 px-2 py-0.5 rounded-2xl w-fit">
                  {term.category}
                </span>
                <span className="text-semibold-28 text-gray-2">{term.title}</span>
              </div>
              <button className="text-primary-2 text-semibold-20">
                복습필요
              </button>
            </div>
          ))}
        </div>

        {/* 하단 버튼 섹션 */}
        <div className="pt-4 space-y-4">
          <button
          onClick={() => navigate("/reviewcard", {state: { reviewTerms }})}
          className="w-full py-4 text-semibold-28 text-gray-1 py-4 rounded-2xl shadow-md bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-6)] transition-all duration-150 ease-out active:scale-[0.97] active:shadow-sm">
            복습 시작
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-gray-4 text-medium-24">
            <span className="material-icons-outlined text-base">
                <img src={time} className="w-4 h-4"/>
            </span>
            <p>예상 소요시간: 약 {3}분</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Review;