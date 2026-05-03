// components/Quiz/QuizTitleSection.tsx
interface QuizTitleSectionProps {
  type: "blank" | "case";
  problem: string;
}

const QuizTitleSection = ({ type, problem }: QuizTitleSectionProps) => {
  return (
    <div className="mb-7">
      {/* 1. 상단 태그 바 (색상 동일) */}
      <div className="inline-block bg-primary-3 text-gray-9 text-medium-20 px-3 py-1 rounded-full mb-4">
        {type === "blank" ? "빈칸채우기" : "사례적용"}
      </div>

      {/* 2. 제목 영역 (유형에 따라 블록 유무 결정) */}
      {type === "case" ? (
        // 사례형: 주황색 블록이 제목을 감쌈
        <div className="bg-[#fff1d5] border-2 border-[#f2dbaa] p-6 rounded-3xl">
          <h2 className="text-gray-1 text-regular-22 fleading-relaxed">
            {problem}
          </h2>
        </div>
      ) : (
        // 빈칸채우기: 일반 텍스트 형태
        <h2 className="text-gray-2 text-medium-24 font-bold leading-snug">
          {problem}
        </h2>
      )}
    </div>
  );
};

export default QuizTitleSection;