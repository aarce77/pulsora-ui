import { ArrowRight } from "lucide-react-native";
import { Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { useTheme } from "@/theme";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type SignalDetailsCardProps = {
  signalDetails: DashboardMock["signalDetails"];
};

export function SignalDetailsCard({ signalDetails }: SignalDetailsCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        Signal Details
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
        {signalDetails.tabs.map((tab) => {
          const isActive = tab === signalDetails.activeTab;
          return (
            <View
              key={tab}
              style={{
                borderBottomColor: isActive ? theme.colors.primary : "transparent",
                borderBottomWidth: 2,
                paddingBottom: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                  fontSize: theme.typography.bodySmall,
                  fontWeight: isActive ? "700" : "500",
                }}
              >
                {tab}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        {signalDetails.rows.map((row) => (
          <View key={row.label} style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>{row.label}</Text>
            <Text
              style={{
                color: getToneColor(theme, row.tone),
                fontSize: theme.typography.bodySmall,
                fontWeight: "700",
              }}
            >
              {row.value}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          alignItems: "center",
          alignSelf: "flex-end",
          backgroundColor: withAlpha(theme.colors.primary, "18"),
          borderRadius: theme.radius.pill,
          flexDirection: "row",
          gap: theme.spacing.xs,
          marginTop: theme.spacing.md,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
        }}
      >
        <ArrowRight color={theme.colors.primary} size={14} />
        <Text style={{ color: theme.colors.primary, fontSize: theme.typography.caption, fontWeight: "700" }}>Open</Text>
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Button
          label={signalDetails.cta}
          onPress={() => undefined}
          accessibilityLabel="View full analysis"
          variant="secondary"
        />
      </View>
    </Card>
  );
}
