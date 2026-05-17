import { useRouter } from "expo-router";

import { StateCard, StateSkeleton } from "@/components/ui/state-card";

type SignalDetailScreenStateProps = {
  state: "loading" | "error" | "not-found";
  ticker?: string;
  onRetry?: () => void;
};

export function SignalDetailScreenState({
  state,
  ticker,
  onRetry,
}: SignalDetailScreenStateProps) {
  const router = useRouter();

  if (state === "loading") {
    return (
      <StateCard
        title="Loading signal detail"
        description={`Preparing the ${ticker?.toUpperCase() ?? "selected"} signal analysis.`}
      >
        <StateSkeleton lines={4} />
        <StateSkeleton lines={5} />
      </StateCard>
    );
  }

  if (state === "error") {
    return (
      <StateCard
        title="Signal detail unavailable"
        description="The signal detail view could not be prepared right now. Try again to rebuild the analysis locally."
        ctaLabel="Retry signal detail"
        onPressCta={onRetry}
      />
    );
  }

  return (
    <StateCard
      title="Ticker not found"
      description={`No signal detail scenario is available for ${ticker?.toUpperCase() ?? "this ticker"} yet.`}
      ctaLabel="Back to Home"
      onPressCta={() => router.push("/home")}
    />
  );
}
