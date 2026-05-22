import { useEffect } from "react";
import Card from "./Card";

import eastWrapper from "../assets/wrapper/eastWrapper.svg";
import westWrapper from "../assets/wrapper/westWrapper.svg";

const classicColors: WrapperColor[] = [
  { name: "분홍색", type: "color", className: "bg-[#ffbed1] border-[#ff7fa5]" },
  { name: "노란색", type: "color", className: "bg-[#fff582] border-[#ffec18]" },
  { name: "하얀색", type: "color", className: "bg-white border-[#ffe8ef]" },
  { name: "보라색", type: "color", className: "bg-purple-200 border-purple-300" },
  { name: "연두색", type: "color", className: "bg-[#adf086] border-[#73e134]" },
  { name: "베이지색", type: "color", className: "bg-[#dfb67c] border-[#b38950]" },
  { name: "하늘색", type: "color", className: "bg-[#90deff] border-[#38c3ff]" },
];

const uniqueColors: WrapperColor[] = [
  { name: "동양풍", type: "image", image: eastWrapper },
  { name: "서양풍", type: "image", image: westWrapper },
  { name: "검정색", type: "color", className: "bg-black border-gray-700 text-white" },
];

type ColorWrapperProps = {
  selectedStyle: string;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

type WrapperColor =
  | {
      name: string;
      type: "color";
      className: string;
    }
  | {
      name: string;
      type: "image";
      image: string;
    };

export default function ColorWrapper({
  selectedStyle,
  selectedColor,
  setSelectedColor,
}: ColorWrapperProps) {
  const colors = selectedStyle === "unique" ? uniqueColors : classicColors;

  useEffect(() => {
    setSelectedColor(colors[0].name);
  }, [selectedStyle]);

  return (
    <Card title="포장지 색상" className="mt-5 mb-5 max-w-[340px]">
      <div className="flex gap-3 items-center flex-wrap min-w-75">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`
              w-12 h-12 shrink-0 rounded-full border-4 cursor-pointer shadow-md
              flex items-center justify-center transition-all overflow-hidden
              ${
                color.type === "color"
                  ? color.className
                  : "bg-white border-gray-300"
              }
              ${
                selectedColor === color.name
                  ? "scale-110 ring-2 ring-offset-2 ring-[var(--color-highlight)]"
                  : "opacity-70"
              }
            `}
          >
            {color.type === "image" && (
              <img
                src={color.image}
                alt={color.name}
                className="w-full h-full object-cover"
              />
            )}

            {selectedColor === color.name && (
              <span className="absolute text-xs font-bold">✓</span>
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