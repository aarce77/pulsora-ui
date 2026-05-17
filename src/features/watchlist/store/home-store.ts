import { createJSONStorage, persist } from "@/vendor/zustand-middleware";
import { create } from "@/vendor/zustand";
import { appStorage } from "@/store/storage";
import { watchlistMock, type WatchlistMock } from "@/features/watchlist/data/watchlist-mock";

export type HomeWatchlistItem = WatchlistMock["items"][number];
export type HomeSearchResult = WatchlistMock["searchResults"][number];

type HomeStoreState = {
  items: HomeWatchlistItem[];
  searchValue: string;
  addSearchValue: string;
  isAddOpen: boolean;
  setSearchValue: (value: string) => void;
  setAddSearchValue: (value: string) => void;
  openAdd: () => void;
  closeAdd: () => void;
  addItemFromSearchResult: (item: HomeSearchResult) => void;
  setItems: (items: HomeWatchlistItem[]) => void;
  resetState: (itemsOverride?: HomeWatchlistItem[]) => void;
};

export const HOME_STORE_STORAGE_KEY = "pulsora-home-watchlist";

function getDefaultHomeState(itemsOverride?: HomeWatchlistItem[]) {
  return {
    items: itemsOverride ?? watchlistMock.items,
    searchValue: "",
    addSearchValue: "",
    isAddOpen: false,
  };
}

function createWatchlistItemFromSearchResult(item: HomeSearchResult): HomeWatchlistItem {
  return {
    ticker: item.ticker,
    company: item.name,
    signal: "BUY",
    confidenceLabel: "Constructive",
    price: "000.00",
    change: "+0.00%",
    changeDirection: "neutral",
    score: 60,
  };
}

export const useHomeStore = create<HomeStoreState>()(
  persist(
    (set) => ({
      ...getDefaultHomeState(),
      setSearchValue: (searchValue) => set({ searchValue }),
      setAddSearchValue: (addSearchValue) => set({ addSearchValue }),
      openAdd: () => set({ isAddOpen: true }),
      closeAdd: () => set({ isAddOpen: false, addSearchValue: "" }),
      addItemFromSearchResult: (item) =>
        set((state) => ({
          items: [...state.items, createWatchlistItemFromSearchResult(item)],
          addSearchValue: "",
          isAddOpen: false,
        })),
      setItems: (items) => set({ items }),
      resetState: (itemsOverride) => set(getDefaultHomeState(itemsOverride)),
    }),
    {
      name: HOME_STORE_STORAGE_KEY,
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
