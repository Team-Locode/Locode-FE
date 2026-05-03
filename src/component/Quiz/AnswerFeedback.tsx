import WrongFeed from "../../assets/wrongfeed.png";
import RightFeed from "../../assets/rightfeed.png";



interface AnswerFeedbackProps {
  isAnswered: boolean;
  isRight: boolean | null;
  correctAnswer: string;
  selectedIdx: number | null; // 추가: 사용자가 클릭한 인덱스
  optionDescriptions: string[]; // 추가: 문제 데이터의 설명 배열
}

const AnswerFeedback = ({ isAnswered, isRight, correctAnswer,selectedIdx, 
  optionDescriptions }: AnswerFeedbackProps) => {
  // 아직 답을 안 적었으면 아무것도 보여주지 않음
  if (!isAnswered || selectedIdx === null) return null;
  const currentDescription = optionDescriptions[selectedIdx];

  return (
    <div className={`mt-8 p-6 rounded-2xl border-4 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 transition-all
      ${isRight 
        ? 'border-lime-500 bg-lime-50' 
        : 'border-red-500 bg-red-50'
      }`}
    >
      {/* 아이콘 영역 */}
      <div className="w-8 h-8 flex-shrink-0 rounded-full  flex items-center justify-center">
        <img src={isRight? RightFeed : WrongFeed} alt="icon"/></div>

      {/* 텍스트 영역 */}
      <div>
        <h3 className={`text-medium-24 ${isRight ? 'text-lime-600' : 'text-red-600'}`}>
          {isRight ? '정답입니다!' : '아쉽네요!'}
        </h3>
        <p className="text-gray-3 text-medium-20">
          {isRight 
            ? `정답풀이:정답은 ${correctAnswer} 입니다.`
            : `오답풀이:정답은 ${correctAnswer} 입니다.`}
        </p>
        <p className="text-gray-3 text-medium-20">
          {currentDescription}
        </p>
      </div>
    </div>
  );
};

export default AnswerFeedback;