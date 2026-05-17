import { Screen } from "@/components/ui/screen";
import { WatchlistGrid } from "@/features/watchlist/components/watchlist-grid";
import { WatchlistScreenState } from "@/features/watchlist/components/watchlist-screen-state";

type WatchlistScreenProps = {
  stateOverride?: "ready" | "loading" | "error";
  onRetry?: () => void;
};

export function WatchlistScreen({
  stateOverride = "ready",
  onRetry,
}: WatchlistScreenProps) {
  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      {stateOverride === "loading" ? (
        <WatchlistScreenState state="loading" />
      ) : stateOverride === "error" ? (
        <WatchlistScreenState state="error" onRetry={onRetry} />
      ) : (
        <WatchlistGrid />
      )}
    </Screen>
  );
}
