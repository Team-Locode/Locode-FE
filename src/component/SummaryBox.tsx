const SummaryBox = ({ content }: { content?: string }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-4">
      {/* 컴포넌트 본체 */}
      <div className="bg-summary rounded-xl p-4 text-sm text-summary bg-white/70  whitespace-pre-line leading-relaxed ">
        {/* 요약 아이콘이나 타이틀이 필요하다면 여기에 추가 가능 */}
        <div className="flex items-start gap-2">
          <span className="mt-0.5">📝</span>
          <div>
            {content ||
              "이곳에 요약된 내용이 표시됩니다. 스크린샷의 속성을 그대로 반영하여 부드러운 핑크빛 배경과 가독성 좋은 글자색을 적용했습니다."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
