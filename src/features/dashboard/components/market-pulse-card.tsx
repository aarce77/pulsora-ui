import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { Sparkline } from "@/features/dashboard/components/sparkline";
import { DashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { useTheme } from "@/theme";

type MarketPulseCardProps = {
  pulse: DashboardMock["marketPulse"];
};

export function MarketPulseCard({ pulse }: MarketPulseCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
          {pulse.title}
        </Text>
        <StatusPill label={pulse.status} tone="success" />
      </View>
      <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.sm }}>
        {pulse.summary}
      </Text>
      <View style={{ marginTop: theme.spacing.lg, width: "100%" }}>
        <Sparkline points={pulse.points.map((point) => point.value)} height={104} minWidth={220} />
      </View>
    </Card>
  );
}
