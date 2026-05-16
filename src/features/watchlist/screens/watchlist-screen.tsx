import { Screen } from "@/components/ui/screen";
import { WatchlistGrid } from "@/features/watchlist/components/watchlist-grid";

export function WatchlistScreen() {
  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      <WatchlistGrid />
    </Screen>
  );
}
