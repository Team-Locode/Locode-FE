import { create } from "zustand";

export type WordType = {
  cardId: number;
  title: string;
  description: string;
  tag: string;          
  isBookmarked: boolean;
};

interface LibraryStoreType {
  searchText: string;
  selectedCategory: string;

  wordList: WordType[];
  filteredWordList: WordType[];

  setLibraryWordList: (list: WordType[]) => void;

  setSearchText: (text: string) => void;
  setCategory: (category: string) => void;
  filterList: () => void;

  toggleBookmarkLocal: (cardId: number, value: boolean) => void;
}

export const useLibraryStore = create<LibraryStoreType>((set, get) => ({
  searchText: "",
  selectedCategory: "전체",

  wordList: [],
  filteredWordList: [],


  // 📌 API 데이터 넣을 때만 사용
  setLibraryWordList: (list) => {
    console.log("📚 라이브러리 API 데이터 세팅됨:", list);
    set({ wordList: list });
    get().filterList();
  },


  setSearchText: (text) => {
    set({ searchText: text });
    get().filterList();
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().filterList();
  },


  filterList: () => {
    const { searchText, selectedCategory, wordList } = get();
    let filtered = [...wordList];

    if (selectedCategory !== "전체") {
      filtered = filtered.filter((item) => item.tag === selectedCategory);
    }

    if (searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.title.includes(searchText.trim())
      );
    }

    set({ filteredWordList: filtered });
  },


  toggleBookmarkLocal: (cardId, value) => {
    const { wordList } = get();

    const updated = wordList.map((word) =>
      word.cardId === cardId
        ? { ...word, isBookmarked: value }
        : word
    );

    set({ wordList: updated });
    get().filterList();
  }
}));
