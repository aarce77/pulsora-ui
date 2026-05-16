import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";

import { useTheme } from "@/theme";
import { signalsMock } from "@/features/signals/data/signals-mock";
import { SignalsHeader } from "@/features/signals/components/signals-header";
import { SignalsFilters } from "@/features/signals/components/signals-filters";
import { SignalListCard } from "@/features/signals/components/signal-list-card";

export function SignalsGrid() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isDesktop = width >= 1080;
  const isTablet = width >= 760;

  const filteredItems = useMemo(() => {
    if (signalsMock.selectedFilter === "All") {
      return signalsMock.items;
    }

    if (signalsMock.selectedFilter === "High Confidence") {
      return signalsMock.items.filter((item) => item.confidenceScore >= 70);
    }

    if (signalsMock.selectedFilter === "Bullish") {
      return signalsMock.items.filter((item) => item.signal === "BUY");
    }

    return signalsMock.items.slice(0, 4);
  }, []);

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <SignalsHeader
        title={signalsMock.title}
        subtitle={signalsMock.subtitle}
      />
      <SignalsFilters
        filters={signalsMock.filters}
        selectedFilter={signalsMock.selectedFilter}
      />

      {isDesktop ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.md }}>
          {filteredItems.map((item) => (
            <View key={item.ticker} style={{ width: "48.8%" }}>
              <SignalListCard item={item} />
            </View>
          ))}
        </View>
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          {filteredItems.map((item) => (
            <SignalListCard
              key={item.ticker}
              item={item}
              compact={!isTablet}
            />
          ))}
        </View>
      )}
    </View>
  );
}
