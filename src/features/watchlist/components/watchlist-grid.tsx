import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";

import { useTheme } from "@/theme";
import { watchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistHeader } from "@/features/watchlist/components/watchlist-header";
import { WatchlistList } from "@/features/watchlist/components/watchlist-list";
import { WatchlistTable } from "@/features/watchlist/components/watchlist-table";
import { MarketPulseCard } from "@/features/dashboard/components/market-pulse-card";
import { AiSummaryCard } from "@/features/watchlist/components/ai-summary-card";
import { AddStockModal } from "@/features/watchlist/components/add-stock-modal";
import { WatchlistEmptyState } from "@/features/watchlist/components/watchlist-empty-state";
import { useHomeStore } from "@/features/watchlist/store/home-store";

export function WatchlistGrid() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 960;
  const items = useHomeStore((state) => state.items);
  const searchValue = useHomeStore((state) => state.searchValue);
  const addSearchValue = useHomeStore((state) => state.addSearchValue);
  const isAddOpen = useHomeStore((state) => state.isAddOpen);
  const setSearchValue = useHomeStore((state) => state.setSearchValue);
  const setAddSearchValue = useHomeStore((state) => state.setAddSearchValue);
  const openAdd = useHomeStore((state) => state.openAdd);
  const closeAdd = useHomeStore((state) => state.closeAdd);
  const addItemFromSearchResult = useHomeStore((state) => state.addItemFromSearchResult);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      item.ticker.toLowerCase().includes(normalizedQuery) ||
      item.company.toLowerCase().includes(normalizedQuery),
    );
  }, [items, searchValue]);

  const searchResults = useMemo(
    () =>
      watchlistMock.searchResults.filter(
        (candidate) =>
          !items.some((item) => item.ticker === candidate.ticker) &&
          (
            addSearchValue.trim().length === 0 ||
            candidate.ticker.toLowerCase().includes(addSearchValue.trim().toLowerCase()) ||
            candidate.name.toLowerCase().includes(addSearchValue.trim().toLowerCase())
          ),
      ),
    [addSearchValue, items],
  );

  return (
    <View
      style={{
        gap: width >= 960 ? theme.spacing.xl : theme.spacing.lg,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "relative",
          zIndex: isAddOpen ? 30 : 1,
        }}
      >
        <WatchlistHeader
          title={watchlistMock.title}
          searchPlaceholder={watchlistMock.searchPlaceholder}
          isDesktop={isDesktop}
          searchValue={searchValue}
          onChangeSearch={setSearchValue}
          onPressAdd={openAdd}
          isAddOverlayOpen={isAddOpen}
          addOverlay={
            <AddStockModal
              items={searchResults}
              open={isAddOpen}
              searchValue={addSearchValue}
              onChangeSearch={setAddSearchValue}
              onClose={closeAdd}
              onAdd={addItemFromSearchResult}
            />
          }
        />
      </View>

      <View
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {items.length === 0 ? (
          <WatchlistEmptyState
            title="No watchlist items yet"
            description="Start building your Home view by adding a stock from the ticker search modal."
            ctaLabel="Open add stock"
            onPressCta={openAdd}
          />
        ) : filteredItems.length === 0 ? (
          <WatchlistEmptyState
            title="No matching stocks"
            description={`No watchlist items match "${searchValue}". Try a different ticker or company name.`}
          />
        ) : isDesktop ? (
          <WatchlistTable items={filteredItems} updatedAt={watchlistMock.updatedAt} />
        ) : (
          <WatchlistList items={filteredItems} updatedAt={watchlistMock.updatedAt} />
        )}
      </View>

      <View
        style={{
          position: "relative",
          zIndex: 0,
        }}
      >
        {isDesktop ? (
          <View style={{ flexDirection: "row", gap: theme.spacing.lg }}>
            <View style={{ flex: 1 }}>
              <MarketPulseCard pulse={watchlistMock.marketPulse} />
            </View>
            <View style={{ flex: 1 }}>
              <AiSummaryCard summary={watchlistMock.aiSummary} />
            </View>
          </View>
        ) : (
          <>
            <MarketPulseCard pulse={watchlistMock.marketPulse} />
            <AiSummaryCard summary={watchlistMock.aiSummary} />
          </>
        )}
      </View>
    </View>
  );
}
