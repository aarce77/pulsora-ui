import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";

import { useTheme } from "@/theme";
import { watchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistHeader } from "@/features/watchlist/components/watchlist-header";
import { WatchlistFilters } from "@/features/watchlist/components/watchlist-filters";
import { WatchlistList } from "@/features/watchlist/components/watchlist-list";
import { WatchlistTable } from "@/features/watchlist/components/watchlist-table";

export function WatchlistGrid() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 960;

  const filteredItems = useMemo(
    () =>
      watchlistMock.selectedFilter === "All"
        ? watchlistMock.items
        : watchlistMock.items.filter((item) => item.assetType === watchlistMock.selectedFilter),
    [],
  );

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <WatchlistHeader
        title={watchlistMock.title}
        searchPlaceholder={watchlistMock.searchPlaceholder}
        isDesktop={isDesktop}
      />
      <WatchlistFilters
        filters={watchlistMock.filters}
        selectedFilter={watchlistMock.selectedFilter}
      />
      {isDesktop ? (
        <WatchlistTable items={filteredItems} />
      ) : (
        <WatchlistList items={filteredItems} />
      )}
    </View>
  );
}
