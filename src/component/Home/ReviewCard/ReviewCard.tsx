import { useNavigate } from "react-router-dom";

interface ReviewCardProps {
  reviewRequiredCardCount: number;
}

const ReviewCard = ({ reviewRequiredCardCount }: ReviewCardProps) => {
  const navigate = useNavigate();

  const handleReviewStart = () => {
    navigate("/review");
  };

  return (
    <div
      className="
        w-full bg-white rounded-[22px] px-9 py-5 mt-5 
        shadow-xl shadow-blue-100 
        flex justify-between items-center
      "
    >
      {/* LEFT */}
      <div>
        <span className="text-[#454C53] text-[16px] font-medium">
          복습 필요
        </span>

        <p className="text-[22px] font-semibold mt-1">
          <span className="text-[#1575FB]">
            {reviewRequiredCardCount}개{" "}
          </span>
          <span className="text-[#1B1D1F] font-bold">용어</span>
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleReviewStart}
        className="
          px-2 py-3
          bg-white
          text-[#1575FB]
          rounded-2xl
          cursor-pointer
          font-medium
          text-[15px]
        "
      >
        복습하기 &gt;
      </button>
    </div>
  );
};

export default ReviewCard;
