import React from "react";
import weeklyContinueLogo from "../../assets/weeklyContinueLogo.svg";
import firstCompletedLogo from "../../assets/firstCompletedLogo.svg";
import tenLearningLogo from "../../assets/tenLearningLogo.svg";
import perfectScoreLogo from "../../assets/perfectScoreLogo.svg";
import { BadgeStatus } from "../../types/dto/user";

interface MyBadgeListProps {
  badges: BadgeStatus[];
}

// ✅ badgeId % 4에 따른 아이콘 매핑
// 0 → weeklyContinueLogo (1)
// 1 → firstCompletedLogo (2)
// 2 → tenLearningLogo (3)
// 3 → perfectScoreLogo (4)
const badgeIcons = [
  weeklyContinueLogo,  // 0 (1번째)
  firstCompletedLogo,  // 1 (2번째)
  tenLearningLogo,     // 2 (3번째)
  perfectScoreLogo,    // 3 (4번째)
];

const getBadgeIcon = (badgeId: number): string => {
  const iconIndex = badgeId % 4;
  return badgeIcons[iconIndex];
};

const MyBadgeList: React.FC<MyBadgeListProps> = ({ badges }) => {
  
  console.log("badges", badges);
  
  return (
    <section>
      <h3 className="text-semibold-20 text-gray-1 mb-3 ml-1">
        획득한 배지
      </h3>

      {badges.length === 0 ? (
        <div className="bg-white rounded-xl py-8 px-4 shadow-xs shadow-blue-100 border border-transparent">
          <p className="text-medium-15 text-gray-3 text-center">
            획득한 배지가 없습니다
          </p>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {badges.map((badge) => {
            const iconSrc = getBadgeIcon(badge.badgeId);

            return (
              <div
                key={badge.badgeId}
                className={`flex items-center justify-center w-full gap-2 py-6 px-4 rounded-xl min-w-fit shadow-xs shadow-blue-100 border
                  ${
                    badge.earned
                      ? "bg-amber-50 border-amber-100"
                      : "bg-white border-transparent"
                  }`}
              >
                <div
                  className={`rounded-full flex items-center justify-center
                    ${badge.earned ? "bg-secondary-3 border-secondary-5" : "bg-white"}`}
                >
                  <img
                    src={iconSrc}
                    className={`w-9 h-9 ${
                      badge.earned ? "" : "opacity-40"
                    }`}
                  />
                </div>

                <span
                  className={`text-medium-15 ${
                    badge.earned ? "text-gray-1" : "text-gray-3"
                  }`}
                >
                  {badge.title}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyBadgeList;
