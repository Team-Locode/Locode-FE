import { useLibraryStore } from "../../store/useLibraryStore";

export default function LibraryEmptyState() {
  const { searchText } = useLibraryStore();

  return (
    <div className="mt-10 text-center">
      <p className="text-sm text-[#454C53]">
        <span className="text-[#1575FB] font-medium">
          ‘{searchText}’
        </span>
        에 대한 내용을 찾지 못했어요.
      </p>
    </div>
  );
}
