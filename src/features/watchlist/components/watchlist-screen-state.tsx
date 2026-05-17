import { View } from "react-native";

import { StateCard, StateSkeleton } from "@/components/ui/state-card";
import { useTheme } from "@/theme";

type WatchlistScreenStateProps = {
  state: "loading" | "error";
  onRetry?: () => void;
};

export function WatchlistScreenState({
  state,
  onRetry,
}: WatchlistScreenStateProps) {
  const { theme } = useTheme();

  if (state === "loading") {
    return (
      <StateCard
        title="Loading Home"
        description="Preparing your watchlist, market pulse, and AI summary."
      >
        <StateSkeleton lines={4} />
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
          <View style={{ flex: 1 }}>
            <StateSkeleton lines={3} />
          </View>
          <View style={{ flex: 1 }}>
            <StateSkeleton lines={3} />
          </View>
        </View>
      </StateCard>
    );
  }

  return (
    <StateCard
      title="Home unavailable"
      description="The Home view could not be prepared right now. Try again to reload your local watchlist experience."
      ctaLabel="Retry Home"
      onPressCta={onRetry}
    />
  );
}
