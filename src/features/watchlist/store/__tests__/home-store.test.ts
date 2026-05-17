import { watchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { appStorage } from "@/store/storage";
import { HOME_STORE_STORAGE_KEY, useHomeStore } from "@/features/watchlist/store/home-store";

describe("useHomeStore", () => {
  beforeEach(() => {
    appStorage.removeItem(HOME_STORE_STORAGE_KEY);
    useHomeStore.getState().resetState();
  });

  it("starts from the seeded watchlist fixture", () => {
    expect(useHomeStore.getState().items[0]?.ticker).toBe("AAPL");
    expect(useHomeStore.getState().items).toHaveLength(watchlistMock.items.length);
  });

  it("adds a ticker-search result into the watchlist and closes the add flow", () => {
    useHomeStore.getState().openAdd();
    useHomeStore.getState().setAddSearchValue("goog");

    useHomeStore.getState().addItemFromSearchResult(watchlistMock.searchResults[0]);

    expect(useHomeStore.getState().items.some((item) => item.ticker === "GOOGL")).toBe(true);
    expect(useHomeStore.getState().isAddOpen).toBe(false);
    expect(useHomeStore.getState().addSearchValue).toBe("");
  });

  it("manages transient ui state without changing seeded items", () => {
    useHomeStore.getState().setSearchValue("nvidia");
    useHomeStore.getState().openAdd();
    useHomeStore.getState().closeAdd();

    expect(useHomeStore.getState().searchValue).toBe("nvidia");
    expect(useHomeStore.getState().isAddOpen).toBe(false);
    expect(useHomeStore.getState().items).toHaveLength(watchlistMock.items.length);
  });

  it("can reset to a custom seeded item list for component tests", () => {
    useHomeStore.getState().resetState([]);

    expect(useHomeStore.getState().items).toEqual([]);
    expect(useHomeStore.getState().searchValue).toBe("");
    expect(useHomeStore.getState().isAddOpen).toBe(false);
  });

  it("persists watchlist item changes without storing transient ui state", () => {
    useHomeStore.getState().setSearchValue("nvda");
    useHomeStore.getState().openAdd();
    useHomeStore.getState().setAddSearchValue("goog");
    useHomeStore.getState().addItemFromSearchResult(watchlistMock.searchResults[0]);

    const persistedValue = appStorage.getItem(HOME_STORE_STORAGE_KEY);

    expect(typeof persistedValue).toBe("string");

    const parsedValue =
      typeof persistedValue === "string"
        ? (JSON.parse(persistedValue) as {
            state: {
              items: { ticker: string }[];
              searchValue?: string;
              isAddOpen?: boolean;
            };
          })
        : null;

    expect(parsedValue?.state.items.some((item) => item.ticker === "GOOGL")).toBe(true);
    expect(parsedValue?.state.searchValue).toBeUndefined();
    expect(parsedValue?.state.isAddOpen).toBeUndefined();
  });
});
