import { View } from "react-native";

import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistRow } from "@/features/watchlist/components/watchlist-row";
import { useTheme } from "@/theme";

type WatchlistListProps = {
  items: WatchlistMock["items"];
};

export function WatchlistList({ items }: WatchlistListProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {items.map((item) => (
        <WatchlistRow key={item.ticker} item={item} compact />
      ))}
    </View>
  );
}
