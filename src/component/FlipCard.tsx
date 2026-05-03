import rotateArrow from "../assets/rotateArrow.svg"

interface FlipCardProps {
  tag?: string;
  title?: string;
  description?: string;
  example?: string;
  onTap?: () => void;
  isFlipped?: boolean;
}

const FlipCard = ({ 
  tag = "물가", 
  title = "인플레이션", 
  description = "물가가 지속적으로 상승하는 현상", 
  example = "같은 돈으로 살 수 있는 물건이 줄어드는 것",
  onTap,
  isFlipped
}: FlipCardProps) => {

  return (
    <div className="h-[330px] w-full max-w-[600px] [perspective:1000px]">
      <div
        onClick={onTap}
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] cursor-pointer ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ================= 앞면 (파란색 그라데이션) ================= */}
        <div className="absolute inset-0 h-full w-full rounded-[34px] overflow-hidden shadow-[0_14px_40px_rgba(20,35,120,0.18)] [backface-visibility:hidden]">
          {/* 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-6)]" />

          {/* 내용 */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-white gap-1">
            <span className="inline-block rounded-full text-gray-9 bg-primary-3 px-5 py-1 text-medium-15 backdrop-blur-sm">
              {tag}
            </span>

            <div className="mt-4 text-gray-9 text-semibold-20 tracking-tight">
              {title}
            </div>

            <div className="mt-6 flex flex-col items-center opacity-90">
              <img src={rotateArrow}/>
            </div>

            <div className="mt-2 text-medium-15 text-gray-9">
              탭하여 뒤집기
            </div>
          </div>
        </div>

        {/* ================= 뒷면 (흰색 배경) ================= */}
        <div 
          className="absolute inset-0 h-full w-full rounded-[34px] bg-white shadow-[20px_20px_40px_-15px] shadow-blue-200 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center px-8 text-center"
        >
          {/* 태그 (연한 파란색) */}
          <span className="inline-block rounded-full text-gray-9 bg-primary-3 px-5 py-1 text-medium-15 text-white backdrop-blur-sm">
            {tag}
          </span>

          {/* 제목 */}
          <div className="mt-4 text-semibold-20 text-gray-1 tracking-tight">
            {title}
          </div>

          {/* 설명 (회색 텍스트) */}
          <p className="mt-4 text-gray-4 text-medium-18 mb-8">
            {description}
          </p>

          {/* 예시 박스 (사진처럼 파란 테두리 박스) */}
          <div className="w-full rounded-xl bg-primary-5 border border-primary-3 py-4 px-4">
            <p className="text-primary text-medium-15 break-keep leading-relaxed">
              {example}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlipCard;