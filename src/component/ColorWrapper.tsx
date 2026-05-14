import { useState } from "react";
import Card from "./Card";

const colors = [
  { name: "분홍색", className: "bg-pink-200 border-pink-400" },
  { name: "노란색", className: "bg-yellow-200 border-yellow-400" },
  { name: "하얀색", className: "bg-white border-gray-300" },
  { name: "보라색", className: "bg-purple-200 border-purple-400" },
  { name: "초록색", className: "bg-green-200 border-green-400" },
  { name: "주황색", className: "bg-orange-200 border-orange-400" },
  { name: "하늘색", className: "bg-sky-200 border-sky-400" },
  { name: "검정색", className: "bg-black border-gray-700 text-white" },
];

export default function ColorWrapper() {
  const [selectedColor, setSelectedColor] = useState("분홍색");

  return (
    <Card title="포장지 색상" className="mt-5 mb-5 max-w-[340px]">
      <div className="flex gap-3 items-center flex-wrap">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`
              w-12 h-12 shrink-0 rounded-full border-4 cursor-pointer shadow-md
              flex items-center justify-center transition-all
              ${color.className}
              ${
                selectedColor === color.name
                  ? "scale-110 ring-2 ring-offset-2 ring-pink-400"
                  : "opacity-70"
              }
            `}
          >
            {selectedColor === color.name && (
              <span className="text-xs font-bold">✓</span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium">
        선택: {selectedColor}
      </p>
    </Card>
  );
}