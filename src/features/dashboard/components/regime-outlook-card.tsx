import { ArrowUpRight, TrendingUp } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { DashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { useTheme } from "@/theme";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type RegimeOutlookCardProps = {
  regime: DashboardMock["regime"];
};

export function RegimeOutlookCard({ regime }: RegimeOutlookCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        Regime & Outlook
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: theme.spacing.md }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>Current regime</Text>
          <Text style={{ color: theme.colors.success, fontSize: theme.typography.h2, fontWeight: "700" }}>
            {regime.currentRegime}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: withAlpha(theme.colors.success, "18"),
            borderRadius: theme.radius.pill,
            height: 44,
            justifyContent: "center",
            width: 44,
          }}
        >
          <TrendingUp color={theme.colors.success} size={20} />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: theme.spacing.xl, marginTop: theme.spacing.lg }}>
        <View>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>Probability</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
            {regime.probability}
          </Text>
        </View>
        <View>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>Since</Text>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
            {regime.since}
          </Text>
        </View>
      </View>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        {regime.probabilities.map((item) => (
          <View key={item.label} style={{ gap: theme.spacing.xs }}>
            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
                {item.label}
              </Text>
              <Text
                style={{
                  color: getToneColor(theme, item.tone),
                  fontSize: theme.typography.bodySmall,
                  fontWeight: "700",
                }}
              >
                {item.value}%
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
                  backgroundColor: getToneColor(theme, item.tone),
                  borderRadius: theme.radius.pill,
                  height: "100%",
                  width: `${item.value}%`,
                }}
              />
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          alignItems: "center",
          backgroundColor: withAlpha(theme.colors.success, "14"),
          borderRadius: theme.radius.md,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
        }}
      >
        <View>
          <Text style={{ color: theme.colors.success, fontSize: theme.typography.body, fontWeight: "700" }}>
            {regime.forwardView.title}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
            {regime.forwardView.subtitle}
          </Text>
        </View>
        <ArrowUpRight color={theme.colors.success} size={20} />
      </View>
    </Card>
  );
}
