import { useEffect } from "react";
import LibrarySearchBar from "../../component/Library/LibrarySearchBar";
import LibraryCategoryFilter from "../../component/Library/LibraryCategoryFilter";
import LibraryWordItem from "../../component/Library/LibraryWordItem";
import LibraryEmptyState from "../../component/Library/LibraryEmptyState";

import { useLibraryStore } from "../../store/useLibraryStore";
import { getLibraryPage } from "../../services/libraryService";

export default function LibraryPage() {
  const { filteredWordList, setLibraryWordList } = useLibraryStore();

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await getLibraryPage(); 
        console.log("📚 API 응답:", res);

        /**
         * Swagger 구조
         * result.libraryCardList = [
         *   {
         *     cardId,
         *     term,
         *     description,
         *     category,
         *     isBookmarked
         *   }
         * ]
         */

        const mapped = res.result.libraryCardList.map((card) => ({
          cardId: card.cardId,
          title: card.term,
          description: card.descript,
          tag: convertCategory(card.category),
          isBookmarked: card.isBookmarked,
        }));

        console.log("📌 변환 후 라이브러리 데이터:", mapped);
        setLibraryWordList(mapped);
      } catch (err) {
        console.error("❌ 라이브러리 불러오기 실패:", err);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#F2F4F6]">
      <div className="w-full max-w-2xl px-6 pt-25 pb-12">
        <h1 className="text-[28px] font-bold leading-[100%] text-[#1B1D1F] mb-8">
          라이브러리
        </h1>

        <LibrarySearchBar />
        <LibraryCategoryFilter />

        <div className="mt-6 flex flex-col gap-4 pb-6">
          {filteredWordList.length === 0 ? (
            <LibraryEmptyState />
          ) : (
            filteredWordList.map((word) => (
              <LibraryWordItem key={word.cardId} item={word} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/** 🏷 API category → UI 태그 변환 */
function convertCategory(category: string) {
  switch (category) {
    case "INTEREST_RATE":
      return "금리";
    case "INFLATION":
      return "물가";
    case "INVESTMENT":
      return "투자";
    case "FISCAL":
      return "재정";
    default:
      return "기타";
  }
}
