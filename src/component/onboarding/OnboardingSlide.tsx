import type { OnboardingSlideType } from "../../types/onboardingType";

interface OnboardingSlideProps {
  slide: OnboardingSlideType;
}

export default function OnboardingSlide({ slide }: OnboardingSlideProps) {
  return (
    <div className="flex flex-col items-center text-center text-white px-6">
      <img
        src={slide.image}
        alt=""
        className="w-28 h-28 mb-15 animate-bounce"
      />

      <h1 className="text-2xl font-bold whitespace-pre-line mb-4">
        {slide.title}
      </h1>

      <p className="text-sm opacity-80 whitespace-pre-line">
        {slide.description}
      </p>
    </div>
  );
}
