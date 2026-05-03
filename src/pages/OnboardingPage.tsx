import OnboardingContainer from "../component/onboarding/OnboardingContainter";
export default function OnboardingPage() {
  return (
    <div className="min-h-dvh w-full bg-blue-500 flex items-center justify-center">
      {/* 모바일 화면 영역 */}
      <div className="w-full max-w-sm h-full flex justify-center items-center">
        <OnboardingContainer />
      </div>
    </div>
  );
}
