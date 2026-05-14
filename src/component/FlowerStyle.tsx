import { useState } from "react";
import Card from "./Card";

export default function FlowerStyle() {
  const [selectedStyle, setSelectedStyle] = useState("unique");

  return (
        <Card title="꽃다발 스타일" className="mt-5 text-sm min-w-75">
                <div className="flex gap-2 w-full">
                {/* 유니크 카드 */}
                <Card
                    isSelected={selectedStyle === "unique"}
                    onClick={() => setSelectedStyle("unique")}
                    className="flex-1 min-w-0"
                >
                    <div className="flex justify-between items-start relative">
                    <div className="flex-shrink-0">
                        <h4 className="text-base font-semibold mb-2 text-pink-4">
                        유니크
                        </h4>
                        <p className="text-pink-3 text-xs whitespace-nowrap">
                        자유롭고 개성있는 스타일
                        </p>
                    </div>
                    {selectedStyle === "unique" && (
                        <span className="absolute -top-1 -right-1 text-highlight text-2xl leading">
                        ✓
                        </span>
                    )}
                    </div>
                </Card>

                {/* 클래식 카드 */}
                <Card
                    isSelected={selectedStyle === "classic"}
                    onClick={() => setSelectedStyle("classic")}
                    className="flex-1 min-w-0"
                >
                    <div className="flex justify-between items-start relative">
                    <div>
                        <h4 className="text-base font-semibold mb-2 text-pink-4">
                        클래식
                        </h4>
                        <p className="text-pink-3 text-xs whitespace-nowrap">
                        정갈하고 우아한 스타일
                        </p>
                    </div>
                    {selectedStyle === "classic" && (
                        <span className="absolute -top-1 -right-1 text-highlight text-2xl leading">
                        ✓
                        </span>
                    )}
                    </div>
                </Card>
                </div>
            </Card>
  )
}