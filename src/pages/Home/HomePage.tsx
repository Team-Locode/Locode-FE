import UserHeader from "../../component/Home/UserHeader/UserHeader";
import TodayLearningCard from "../../component/Home/TodayLearningCard/TodayLearningCard";
import ReviewCard from "../../component/Home/ReviewCard/ReviewCard";
import Tag from "../../component/common/Tag";
import cardIcon from "../../assets/icons/card.png";
import { useEffect, useState } from "react";
import { getHome } from "../../services/userService";
import { UserHomePage } from "../../types/dto/user";

const HomePage = () => {
  const [homeInfo, setHomeInfo] = useState<UserHomePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryArray, setSelectedCategoryArray] = useState<string[]>([]);

  const CATEGORIES = [
    {category:"INTEREST_RATE", value: "금리" },   // 금리
    {category:"INFLATION", value: "물가" },       // 물가
    {category:"INVESTMENT", value: "투자" },      // 투자
    {category:"FISCAL", value: "재정" },          // 재정
  ];

  const getCategoryLabel = (category: string) => {
    const found = CATEGORIES.find(c => c.category === category);
    return found ? found.value : category;
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategoryArray([...selectedCategoryArray, category]);
  };

  const handleDeleteCategory = (category: string) => {
    setSelectedCategoryArray(selectedCategoryArray.filter((c) => c !== category));
  };


  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const response = await getHome();
        setHomeInfo(response.result);
      } catch (err) {
        console.error("홈 데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeInfo();
  }, []);

  // 🔹 로딩 UI
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F3F6FB] flex justify-center items-center">
        <p className="text-gray-500 text-lg">불러오는 중...</p>
      </div>
    );
  }

  console.log(homeInfo);
  console.log(selectedCategoryArray);
  
  return (
    <div className="w-full min-h-screen bg-[#F3F6FB] flex justify-center">
      <div className="w-full max-w-[570px] pt-[100px] px-6 mx-auto">

        {/* 헤더 */}
        <UserHeader level={homeInfo?.level ?? 1} />

        {/* 오늘의 학습 카드 */}
        <TodayLearningCard
          dailyGoalCount={homeInfo?.dailyGoalCount ?? 0}
          studyCompletedCardCount={homeInfo?.studyCompletedCardCount ?? 0}
          selectedCategoryArray={selectedCategoryArray}
        />

        {/* 복습 카드 */}
        <ReviewCard
          reviewRequiredCardCount={homeInfo?.reviewRequiredCardCount ?? 0}
        />

        {/* 추천 주제 */}
        <div className="mt-10">
        <p className="text-[18px] font-semibold text-[#1B1D1F] mb-4">
          추천 주제
        </p>

        <div className="flex gap-4 flex-wrap">
          {homeInfo?.recommendedCategory?.length !== 0 ?
            homeInfo?.recommendedCategory?.map((c) => (
              <Tag
                key={c.category}
                category={c.category}
                label={getCategoryLabel(c.category)}
                categoryList={selectedCategoryArray}
                addCategory={handleSelectCategory}
                deleteCategory={handleDeleteCategory}
              />
            )) :
            (CATEGORIES.map((c) => (
              <Tag
                key={c.category}
                category={c.category}
                label={c.value}
                categoryList={selectedCategoryArray}
                addCategory={handleSelectCategory}
                deleteCategory={handleDeleteCategory}
              />
            )))
            }
        </div>
      </div>


        {/* 아래 문구 */}
        <p className="mt-10 text-center text-[18px] font-bold text-[#1B1D1F] flex items-center justify-center gap-2">
          <img src={cardIcon} alt="card" className="w-10 h-10 object-contain" />
          오늘 {homeInfo?.dailyGoalCount ?? 0}장만 뒤집자!
        </p>
      </div>
    </div>
  );
};
export default HomePage;
