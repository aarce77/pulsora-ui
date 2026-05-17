import { Text } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";

type AiSummaryCardProps = {
  summary: WatchlistMock["aiSummary"];
};

export function AiSummaryCard({ summary }: AiSummaryCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        {summary.title}
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.sm }}>
        {summary.body}
      </Text>
    </Card>
  );
}
