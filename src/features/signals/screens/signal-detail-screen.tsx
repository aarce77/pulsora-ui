import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/ui/screen";
import { SignalDetailGrid } from "@/features/signal-detail/components/signal-detail-grid";
import { SignalDetailScreenState } from "@/features/signal-detail/components/signal-detail-screen-state";
import { resolveSignalDetailScenario } from "@/features/signal-detail/data/signal-detail-mock";

type SignalDetailScreenProps = {
  stateOverride?: "ready" | "loading" | "error" | "not-found";
  onRetry?: () => void;
};

export function SignalDetailScreen({
  stateOverride = "ready",
  onRetry,
}: SignalDetailScreenProps) {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();
  const resolvedScenario = resolveSignalDetailScenario(ticker);
  const resolvedState =
    stateOverride !== "ready"
      ? stateOverride
      : ticker && !resolvedScenario
        ? "not-found"
        : "ready";

  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      {resolvedState === "loading" ? (
        <SignalDetailScreenState state="loading" ticker={ticker} />
      ) : resolvedState === "error" ? (
        <SignalDetailScreenState state="error" ticker={ticker} onRetry={onRetry} />
      ) : resolvedState === "not-found" ? (
        <SignalDetailScreenState state="not-found" ticker={ticker} />
      ) : (
        <SignalDetailGrid tickerOverride={ticker} />
      )}
    </Screen>
  );
}
