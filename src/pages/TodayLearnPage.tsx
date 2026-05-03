import { useLocation, useNavigate } from 'react-router-dom';
import { Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QuizQuestion, StudyCard } from '../types/dto/card';
import { postStartTodayStudySet } from '../services/cardService';


const TodayLearnPage = () => {
  const navigate = useNavigate();
  const [ totalSteps, setTotalSteps ] = useState(5);
  const { selectedCategoryArray } = useLocation().state as { selectedCategoryArray: string[] };
  const [ cards, setCards ] = useState<StudyCard[]>([]);
  const [ quizzes, setQuizzes ] = useState<QuizQuestion[]>([]);
  
  //console.log("selectedCategoryArray", selectedCategoryArray);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await postStartTodayStudySet({ selectedCategories: selectedCategoryArray });
      setCards(response.result.cards);
      setQuizzes(response.result.quizzes);
      setTotalSteps(response.result.cards.length);
    };
    fetchCards();
  }, []);

  const handleStart = () => {
    navigate('/cardlearning', { state: { cards,quizzes, totalSteps } }); // 퀴즈 페이지로 이동
  };

  const categoryMap = {
    "INTEREST_RATE": "금리",
    "INFLATION": "물가",
    "INVESTMENT": "투자",
    "FISCAL": "재정",
  };

  console.log("cards", cards);
  console.log("quizzes", quizzes);

  return (
    <div className="min-h-screen h-fit w-full bg-gray-7 flex flex-col items-center py-16">
      {/* 상단 타이틀 섹션 */}
      <header className="w-full max-w-xl mb-10">
        <h1 className="text-gray-1 text-semibold-24 mb-2">오늘 배울 내용</h1>
        <p className="text-gray-4 text-medium-18">
          {totalSteps}개의 경제 용어를 학습합니다.
        </p>
      </header>

      {/* 학습 단계 리스트 */}
      <main className="w-full max-w-xl flex flex-col gap-4 mb-12">
        {cards.map((item, index) => (
          <div 
            key={item.cardId}
            className="w-full bg-gray-9 rounded-[24px] p-5 
            flex items-center justify-between shadow-[0_10px_40px_rgba(59,130,246,0.1)]"
          >
            <div className="flex items-center gap-4">
              {/* 숫자 원형 배지 */}
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-5 text-medium-20">
                {index + 1}
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-gray-2 text-meduim-18">{item.term}</span>
                <div className="inline-block bg-primary-5 text-primary text-medium-15 px-3 py-0.5 rounded-full w-fit">
                  {categoryMap[item.category as keyof typeof categoryMap]}
                </div>
              </div>
            </div>

          </div>
        ))}
      </main>

      {/* 하단 시작 섹션 */}
      <footer className='w-full flex items-center flex-col gap-4 mt-8 mt-auto bg-gray-7'>
        <div className='w-full max-w-xl px-6'>
            <button
                onClick={handleStart}
                className="flex items-center justify-center w-full py-5 
                bg-primary text-gray-9 text-semibold-28 rounded-2xl shadow-lg 
                active:scale-[0.98] transition-transform"
                >
                시작하기
            </button>
        </div>
        {/* 예상 소요 시간 */}
        <div className="flex justify-center items-center gap-2 text-gray-4 text-medium-24">
            <Timer />
            <span>예상 소요시간: 약 {totalSteps*1}분</span>    {/* 배열의 길이*1분 */}
        </div>

        
      </footer>
    </div>
  );
};

export default TodayLearnPage;