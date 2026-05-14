import Card from "./Card";

type FlowerStyleProps = {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
};

export default function FlowerStyle({
  selectedStyle,
  setSelectedStyle,
}: FlowerStyleProps) {
  return (
    <Card title="꽃다발 스타일" className="mt-5 text-sm min-w-75">
      <div className="flex gap-2 w-full">
        <Card
          isSelected={selectedStyle === "classic"}
          onClick={() => setSelectedStyle("classic")}
          className="flex-1 min-w-0"
        >
          <h4 className="text-base font-semibold mb-2 text-pink-4">
            클래식
          </h4>
          <p className="text-pink-3 text-xs whitespace-nowrap">
            정갈하고 우아한 스타일
          </p>
        </Card>

        <Card
          isSelected={selectedStyle === "unique"}
          onClick={() => setSelectedStyle("unique")}
          className="flex-1 min-w-0"
        >
          <h4 className="text-base font-semibold mb-2 text-pink-4">
            유니크
          </h4>
          <p className="text-pink-3 text-xs whitespace-nowrap">
            자유롭고 개성있는 스타일
          </p>
        </Card>
      </div>
    </Card>
  );
}