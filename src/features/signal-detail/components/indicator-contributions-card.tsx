import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { type SignalResponse } from "@/api/contracts/signal";
import { useTheme } from "@/theme";
import { getToneColor } from "@/features/dashboard/utils/dashboard-colors";

type IndicatorContributionsCardProps = {
  signal: SignalResponse;
};

export function IndicatorContributionsCard({
  signal,
}: IndicatorContributionsCardProps) {
  const { theme } = useTheme();
  const indicators = Object.entries(signal.indicators).sort(
    (a, b) => b[1].contribution - a[1].contribution,
  );

  return (
    <Card>
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.typography.h3,
          fontWeight: "700",
        }}
      >
        Indicator Contributions
      </Text>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.md }}>
        {indicators.map(([name, indicator]) => {
          const contributionPct = Math.min(
            100,
            Math.max(6, Math.round(indicator.contribution * 180)),
          );
          const tone =
            indicator.contribution >= 0
              ? "positive"
              : ("negative" as const);

          return (
            <View key={name} style={{ gap: theme.spacing.xs }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.bodySmall,
                    textTransform: "uppercase",
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    color: getToneColor(theme, tone),
                    fontSize: theme.typography.bodySmall,
                    fontWeight: "700",
                  }}
                >
                  {indicator.contribution.toFixed(3)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: theme.colors.surfaceMuted,
                  borderRadius: theme.radius.pill,
                  height: 8,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    backgroundColor: getToneColor(theme, tone),
                    borderRadius: theme.radius.pill,
                    height: "100%",
                    width: `${contributionPct}%`,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
