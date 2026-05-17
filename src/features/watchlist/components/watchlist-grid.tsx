import { useMemo, useState } from "react";
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

type WatchlistGridProps = {
  initialItems?: typeof watchlistMock.items;
};

export function WatchlistGrid({ initialItems = watchlistMock.items }: WatchlistGridProps) {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 960;
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState(initialItems);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addSearchValue, setAddSearchValue] = useState("");

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

  function handleAdd(item: (typeof watchlistMock.searchResults)[number]) {
    const generatedItem = {
      ticker: item.ticker,
      company: item.name,
      signal: "BUY" as const,
      confidenceLabel: "Constructive",
      price: "000.00",
      change: "+0.00%",
      changeDirection: "neutral" as const,
      score: 60,
    };

    setItems((currentItems) => [...currentItems, generatedItem]);
    setAddSearchValue("");
    setIsAddOpen(false);
  }

  return (
    <View style={{ gap: theme.spacing.lg, position: "relative" }}>
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
          onPressAdd={() => setIsAddOpen(true)}
          isAddOverlayOpen={isAddOpen}
          addOverlay={
            <AddStockModal
              items={searchResults}
              open={isAddOpen}
              searchValue={addSearchValue}
              onChangeSearch={setAddSearchValue}
              onClose={() => {
                setAddSearchValue("");
                setIsAddOpen(false);
              }}
              onAdd={handleAdd}
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
            onPressCta={() => setIsAddOpen(true)}
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
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
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
