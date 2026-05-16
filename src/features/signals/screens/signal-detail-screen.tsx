import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { useTheme } from "@/theme";

export function SignalDetailScreen() {
  const { theme } = useTheme();
  const { ticker } = useLocalSearchParams<{ ticker: string }>();

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          {ticker?.toUpperCase() ?? "Signal"}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body, marginTop: theme.spacing.sm }}>
          The route and API boundary are ready. The explainable signal detail experience will be built in Phase 2.
        </Text>
      </Card>
    </Screen>
  );
}
