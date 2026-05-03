import { useLibraryStore } from "../../store/useLibraryStore";
import searchIcon from "../../assets/icons/search.png";

export default function LibrarySearchBar() {
  const { searchText, setSearchText } = useLibraryStore();

  return (
    <div>
      <div
        className={`
          flex items-center gap-3 
          px-4 py-3 rounded-xl
          bg-[#E8EBED]
          border transition
          ${searchText ? "border-primary-400" : "border-transparent"}
          hover:border-blue-600 
          focus-within:border-primary-400 
        `}
      >
        <img src={searchIcon} className="w-5 h-5 opacity-70" />

        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="용어 검색..."
          className="w-full bg-transparent outline-none text-grayScale-700 placeholder-grayScale-500"
        />
      </div>
    </div>
  );
}
