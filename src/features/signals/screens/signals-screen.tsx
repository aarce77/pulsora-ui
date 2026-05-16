import { Text } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { useTheme } from "@/theme";

export function SignalsScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          Signals
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body, marginTop: theme.spacing.sm }}>
          Signal-detail queries and schemas are wired. The explainable signal UI lands in Phase 2.
        </Text>
      </Card>
    </Screen>
  );
}
