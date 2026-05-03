import MyState from "../component/MyState";
import bookmarkLogo from "../assets/bookmarkLogo.svg";
import profileLogo from "../assets/profileLogo.svg";
import crownLogo from "../assets/crownLogo.svg";
import { UserMyPage } from "../types/dto/user";
import { useEffect, useState } from "react";
import { getMyPage } from "../services/userService";
import MyBadgeList from "../component/profile/MyBadgeList";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserMyPage>();
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getMyPage();
        setUserInfo(response.result);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  console.log("userInfo", userInfo);

  // 경험치 진행률 계산
  const calculateXpProgress = () => {
    if (!userInfo) {
      return { earnedXp: 0, progressPercentage: 0 };
    }
    
    const requiredXp = userInfo.requiredXpForNextLevel;
    const remainingXp = userInfo.remainingXpToNextLevel;

    console.log("requiredXp", requiredXp);
    console.log("remainingXp", remainingXp);
    
    // 지금까지 획득한 경험치 = 총 필요 경험치 - 남은 경험치
    const earnedXp = requiredXp - remainingXp;
    
    // 진행률 = (획득한 경험치 / 총 필요 경험치) * 100
    const progressPercentage = requiredXp > 0 
      ? Math.min((earnedXp / requiredXp) * 100, 100) 
      : 0;

    console.log(earnedXp, progressPercentage);

    return { earnedXp, progressPercentage };
  };

  const { progressPercentage } = calculateXpProgress(); 

  const settings = ["학습목표 설정", "알림설정", "데이터 초기화"];

  return (
    <div className="flex flex-col w-full min-h bg-gray-8 items-center pb-10">

      {/* 1. 상단 타이틀 */}
      <header className="w-full max-w-2xl px-6 pt-[100px] pb-[32px]">
        <h1 className="text-bold-28 text-gray-1">프로필</h1>
      </header>

      <main className="w-full max-w-2xl px-5 flex flex-col gap-6">

        {/* 2. 프로필 메인 카드 */}
        <div className="w-full p-10 rounded-[32px] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-6)] opacity-100 z-0"></div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500">
                {/* SVG: Bot */}
                <img src={profileLogo} />
              </div>
              <div>
                <h2 className="text-semibold-24 text-gray-9">{userInfo?.title}</h2>
                <div className="flex items-center text-primary-3 text-medium-18">
                    <img src={crownLogo} className="flex w-5 h-5 mr-2" />
                    <p className="">
                        Lv.{userInfo?.currentLevel}
                    </p>
                    <span className="mx-1">|</span>
                    <p>{userInfo?.currentXp}XP</p>
                </div>
              </div>
            </div>

            {/* 경험치 바 */}
            <div className="w-full flex flex-col gap-2">
              <div className="w-full bg-primary-4 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary-5 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-medium-15 text-primary-4 ml-1">
                다음 레벨까지 {userInfo?.remainingXpToNextLevel ?? 0} XP
              </p>
            </div>
          </div>
        </div>

        {/* 3. 나의 통계 컴포넌트 */}
        <MyState 
          streak={userInfo?.streak ?? 0}
          level={userInfo?.currentLevel ?? 0}
          terms={userInfo?.totalLearnedCard ?? 0}
          xp={userInfo?.currentXp ?? 0}
        />

        {/* 4. 획득한 배지 컴포넌트 
        <MyBadge badges={badges} />
        */}
        
        <MyBadgeList badges={userInfo?.badges ?? []} />

        {/* 5. 북마크한 용어 */}
        <section>
          <div className="bg-white rounded-3xl px-6 py-5 shadow-xs shadow-blue-100 flex justify-between">
            {/* 왼쪽: 제목만 */}
            <span className="text-medium-18 text-gray-1 mb-5">
            북마크한 용어
            </span>

            {/* 오른쪽: 아이콘 원 + 개수 */}
            <div className="flex items-center gap-3 mt-10">
                <div className="w-9 h-9 rounded-full bg-primary-4 flex items-center justify-center">
                    <img src={bookmarkLogo} />
                </div>
                <span className="text-semibold-28 text-gray-1">{userInfo?.totalBookmarkedCard ?? 0}개</span>
            </div>
        </div>
        </section>


        {/* 6. 설정 메뉴 리스트 */}
        <section className="flex flex-col gap-3">
          {settings.map((item, index) => (
            <button
              key={index}
              className="w-full bg-white rounded-2xl p-4 shadow-xs shadow-blue-100 text-left text-medium-18 text-gray-1 hover:bg-gray-50 transition-colors"
            >
              {item}
            </button>
          ))}
        </section>

      </main>
    </div>
  );
};

export default Profile;