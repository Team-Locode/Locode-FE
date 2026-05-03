import { useLibraryStore } from "../../store/useLibraryStore";

const categoryList = ["전체", "금리", "물가", "투자", "재정"];

export default function LibraryCategoryFilter() {
  const { selectedCategory, setCategory } = useLibraryStore();

  return (
    <div className="flex gap-2 mt-4">
      {categoryList.map((c) => (
        <button
          key={c}
          onClick={() => setCategory(c)}
          className={`
            px-4 py-2
            rounded-full
            text-sm
            transition
            ${
              selectedCategory === c
                ? "bg-[#1575FB] text-white border border-[#1575FB]"
                : "bg-white text-[#454C53]"
            }
          `}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
