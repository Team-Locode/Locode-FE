import { useNavigate } from "react-router-dom";
import ProgressStatus from "../../common/ProgressStatus";

interface TodayLearningCardProps {
  dailyGoalCount: number;
  studyCompletedCardCount: number;
  selectedCategoryArray: string[];

}

const TodayLearningCard = ({
  dailyGoalCount,
  studyCompletedCardCount,
  selectedCategoryArray,
}: TodayLearningCardProps) => {
  const navigate = useNavigate();

  const progress =
    dailyGoalCount > 0
      ? Math.min(
          Math.round((studyCompletedCardCount / dailyGoalCount) * 100),
          100
        )
      : 0;

  const getStatus = (): "before" | "ongoing" | "done" => {
    if (progress === 0) return "before";
    if (progress >= 100) return "done";
    return "ongoing";
  };

  const status = getStatus();

  return (
    <div
      className="
        w-full rounded-[28px] text-white shadow-[0_25px_50px_rgba(0,0,0,0.18)]
        mt-6 px-8 py-7 min-h-[240px] bg-[#1575FB]
      "
    >
      {/* 상단 */}
      <div className="flex justify-between items-start">
        <p className="text-[#9FC6FD] text-[18px] font-medium">
          오늘의 학습
        </p>
        <ProgressStatus status={status} />
      </div>

      {/* 제목 */}
      <h2 className="text-[26px] font-bold mt-1 mb-4">
        오늘의 {dailyGoalCount}장
      </h2>

      {/* 진행 숫자 + 바 */}
      <div className="mt-1 mb-8">
        <div className="flex justify-between text-[15px] opacity-90 mb-2">
          <span>
            {studyCompletedCardCount}/{dailyGoalCount}
          </span>
          <span>{progress}%</span>
        </div>

        <div className="w-full h-2 bg-blue-300 rounded-full">
          <div
            className="h-2 bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 버튼 */}
      <button
        onClick={() => navigate("/todaylearn", { state: { selectedCategoryArray } })}
        disabled={dailyGoalCount === 0}
        className="
          w-10/12 mx-auto block py-4
          rounded-full bg-white text-blue-500
          text-lg font-bold shadow-md
          hover:bg-blue-50 transition
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        학습 시작
      </button>
    </div>
  );
};

export default TodayLearningCard;
