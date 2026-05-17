import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { getToneColor } from "@/features/dashboard/utils/dashboard-colors";
import { IntelligenceMock } from "@/features/intelligence/data/intelligence-mock";
import { useTheme } from "@/theme";

type MarketInsightsCardProps = {
  items: IntelligenceMock["marketInsights"];
};

export function MarketInsightsCard({ items }: MarketInsightsCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        Market Insights
      </Text>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.md }}>
        {items.map((item) => (
          <View
            key={item.title}
            style={{
              borderBottomColor: theme.colors.borderSubtle,
              borderBottomWidth: 1,
              gap: theme.spacing.xs,
              paddingBottom: theme.spacing.md,
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  flex: 1,
                  fontSize: theme.typography.body,
                  fontWeight: "700",
                  paddingRight: theme.spacing.md,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: getToneColor(theme, item.tone),
                  fontSize: theme.typography.caption,
                  fontWeight: "700",
                }}
              >
                {item.confidence}
              </Text>
            </View>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
              {item.summary}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
