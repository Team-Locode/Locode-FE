import crownIcon from "../../../assets/icons/crown.png";

interface UserHeaderProps {
  level: number;
}

const UserHeader = ({ level }: UserHeaderProps) => {
  return (
    <div className="mb-6">
      {/* 상단 제목 */}
      <p className="text-[#1B1D1F] text-[28px] font-bold mb-[28px] ">
        나의 이콘플립
      </p>

      {/* 레벨 영역 */}
      <div className="flex items-center gap-2">
        <img
          src={crownIcon}
          alt="level"
          className="w-7 h-7 object-contain"
        />

        <p className="text-[#1B1D1F] text-[32px] font-bold">
          Lv.{level}
        </p>
      </div>
    </div>
  );
};

export default UserHeader;
