import { Text } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { useTheme } from "@/theme";

export function WatchlistScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          Watchlist
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body, marginTop: theme.spacing.sm }}>
          Phase 2 will connect search, filters, and watchlist data using the contracts created in Phase 1.
        </Text>
      </Card>
    </Screen>
  );
}
