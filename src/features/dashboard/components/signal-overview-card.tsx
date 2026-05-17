import { Apple } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { ConfidenceRing } from "@/features/dashboard/components/confidence-ring";
import { Sparkline } from "@/features/dashboard/components/sparkline";
import { DashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { useTheme } from "@/theme";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type SignalOverviewCardProps = {
  signalSummary: DashboardMock["signalSummary"];
  onSelectTimeframe?: (timeframe: string) => void;
};

export function SignalOverviewCard({
  signalSummary,
  onSelectTimeframe,
}: SignalOverviewCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        AI Signal Overview
      </Text>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: theme.spacing.md,
          marginTop: theme.spacing.md,
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surfaceMuted,
            borderRadius: theme.radius.pill,
            height: 44,
            justifyContent: "center",
            width: 44,
          }}
        >
          <Apple color={theme.colors.textPrimary} size={20} />
        </View>
        <View>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
            {signalSummary.ticker}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
            {signalSummary.company}
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.md,
          justifyContent: "space-between",
          marginTop: theme.spacing.lg,
        }}
      >
        <View style={{ alignItems: "center", gap: theme.spacing.sm }}>
          <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
            <StatusPill label={signalSummary.signal} tone="success" />
            <Text style={{ color: theme.colors.success, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
              {signalSummary.confidenceLabel}
            </Text>
          </View>
          <ConfidenceRing score={signalSummary.confidenceScore} />
        </View>

        <View style={{ flex: 1, gap: theme.spacing.sm, minWidth: 220 }}>
          {signalSummary.stats.map((stat) => (
            <View
              key={stat.label}
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
                {stat.label}
              </Text>
              <Text
                style={{
                  color: getToneColor(theme, stat.tone),
                  fontSize: theme.typography.bodySmall,
                  fontWeight: "700",
                }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: theme.spacing.sm,
          marginTop: theme.spacing.lg,
        }}
      >
        {signalSummary.timeframe.map((value) => {
          const isSelected = value === signalSummary.selectedTimeframe;
          return (
            <Pressable
              key={value}
              accessibilityRole="button"
              accessibilityLabel={`Select ${value} timeframe`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectTimeframe?.(value)}
              style={{
                backgroundColor: isSelected ? withAlpha(theme.colors.primary, "22") : theme.colors.surfaceMuted,
                borderRadius: theme.radius.pill,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
                  fontSize: theme.typography.caption,
                  fontWeight: "700",
                }}
                >
                  {value}
                </Text>
            </Pressable>
          );
        })}
      </View>

      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={`${signalSummary.ticker} ${signalSummary.selectedTimeframe} trend chart`}
        style={{ marginTop: theme.spacing.md, width: "100%" }}
      >
        <Sparkline
          points={signalSummary.chart.map((point) => point.value)}
          height={92}
          minWidth={220}
        />
      </View>
    </Card>
  );
}
