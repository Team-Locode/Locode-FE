interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({
  total,
  current,
}: ProgressDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
  <div
    key={i}
    className={`
      transition-all duration-300
      ${i === current 
        ? "bg-yellow-300 w-6 h-2 rounded-full"
        : "bg-blue-300 w-2 h-2 rounded-full"
      }
    `}
  />
))}

    </div>
  );
}
