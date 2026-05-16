import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/ui/screen";
import { SignalDetailGrid } from "@/features/signal-detail/components/signal-detail-grid";

export function SignalDetailScreen() {
  const { ticker } = useLocalSearchParams<{ ticker: string }>();

  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      <SignalDetailGrid tickerOverride={ticker} />
    </Screen>
  );
}
