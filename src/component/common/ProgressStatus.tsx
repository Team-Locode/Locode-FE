interface ProgressStatusProps {
  status: "before" | "ongoing" | "done";
}

const ProgressStatus = ({ status }: ProgressStatusProps) => {
  const getLabel = () => {
    if (status === "before") return "진행전";
    if (status === "ongoing") return "진행중";
    return "진행후";
  };

  return (
    <span
  className="
    bg-blue-300/60    /* 연한 파랑 + 투명도 */
    text-white
    px-4 py-1
    rounded-full
     text-sm
    border-none
    shadow-none
    backdrop-blur-sm
  "
>

      {getLabel()}
    </span>
  );
};

export default ProgressStatus;
