import React from "react";
import continuousLearningLogo from "../assets/continuousLearning.svg";
import nowLevelLogo from "../assets/nowLevel.svg";
import termLogo from "../assets/term.svg";
import XPLogo from "../assets/xp.svg";

interface StatsProps {
  streak: number;
  level: number;
  terms: number;
  xp: number;
}

type StatCardProps = {
  label: string;
  value: React.ReactNode;
  iconSrc: string;
  tone?: "blue" | "indigo";
};

const StatCard: React.FC<StatCardProps> = ({ label, value, iconSrc, tone = "blue" }) => {
  const toneClass =
    tone === "blue"
      ? "bg-blue-100 text-blue-500"
      : "bg-indigo-100 text-indigo-500";

  return (
    <div className="bg-white rounded-2xl pt-2 pb-4 px-4 flex flex-col justify-between h-24 shadow-xs shadow-blue-100">
      <span className="text-medium-15 text-primary-6">{label}</span>

      <div className="flex items-center justify-end gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toneClass}`}>
          <img src={iconSrc} alt={label} />
        </div>
        <span className="text-semibold-28 text-gray-1">{value}</span>
      </div>
    </div>
  );
};

const MyState: React.FC<StatsProps> = ({ streak, level, terms, xp }) => {
  const cards: StatCardProps[] = [
    { label: "연속 학습", value: `${streak}일`, iconSrc: continuousLearningLogo, tone: "blue" },
    { label: "현재 레벨", value: `Lv.${level}`, iconSrc: nowLevelLogo, tone: "indigo" },
    { label: "학습한 용어", value: `${terms}개`, iconSrc: termLogo, tone: "blue" },
    { label: "총 XP", value: xp, iconSrc: XPLogo, tone: "indigo" },
  ];

  return (
    <section>
      <h3 className="text-semibold-20 text-gray-1 font-semibold mb-3 ml-1">나의 통계</h3>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
};

export default MyState;
