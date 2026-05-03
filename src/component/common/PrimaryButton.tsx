interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

export default function PrimaryButton({
  label,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-14 bg-white text-blue-600 font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition"
    >
      {label}
    </button>
  );
}
