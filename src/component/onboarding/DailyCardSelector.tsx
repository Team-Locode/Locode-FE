import { useOnboardingStore } from "../../constants/onboarding";
import { useDebounce } from "../../hooks/useDebounce";

interface DailyCardSelectorProps {
  handleCount : (count : number) => void
}

export default function DailyCardSelector( { handleCount } : DailyCardSelectorProps ) {
  const { dailyCardCount, setDailyCardCount } = useOnboardingStore();
  const debouncedCount = useDebounce(dailyCardCount);

  // 서버 저장 시 중복 요청 방지
  console.log("학습 카드 수 저장:", debouncedCount);

  return (
    <div className="flex gap-4">
      {[5, 10].map((count) => (
       <button
        key={count}
        onClick={() => {
          handleCount(count)
          setDailyCardCount(count)
        }}
        className={`w-32 h-32 rounded-2xl font-bold flex items-center justify-center
          ${dailyCardCount === count
            ? "bg-white text-blue-600"
            : "bg-blue-400 text-white"
          }`}
      >
        <span className="flex items-baseline gap-1">
          <span className="text-4xl">{count}</span>
          <span className="text-sm font-normal">장</span>
        </span>
      </button>
      ))}
    </div>
  );
}
