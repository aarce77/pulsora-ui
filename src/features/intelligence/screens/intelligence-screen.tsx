import { Text } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { useTheme } from "@/theme";

export function IntelligenceScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          Intelligence
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body, marginTop: theme.spacing.sm }}>
          Sentiment contracts are ready for the market-intelligence views planned in later phases.
        </Text>
      </Card>
    </Screen>
  );
}
