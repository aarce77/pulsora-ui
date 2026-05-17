import { useWindowDimensions, View } from "react-native";

import { useTheme } from "@/theme";
import { watchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistHeader } from "@/features/watchlist/components/watchlist-header";
import { WatchlistList } from "@/features/watchlist/components/watchlist-list";
import { WatchlistTable } from "@/features/watchlist/components/watchlist-table";
import { MarketPulseCard } from "@/features/dashboard/components/market-pulse-card";
import { AiSummaryCard } from "@/features/watchlist/components/ai-summary-card";

export function WatchlistGrid() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 960;

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <WatchlistHeader
        title={watchlistMock.title}
        searchPlaceholder={watchlistMock.searchPlaceholder}
        isDesktop={isDesktop}
      />
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
      {isDesktop ? (
        <WatchlistTable items={watchlistMock.items} updatedAt={watchlistMock.updatedAt} />
      ) : (
        <WatchlistList items={watchlistMock.items} updatedAt={watchlistMock.updatedAt} />
      )}
    </View>
  );
}
