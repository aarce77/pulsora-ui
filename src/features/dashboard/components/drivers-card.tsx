import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { DashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { useTheme } from "@/theme";

type DriversCardProps = {
  drivers: DashboardMock["drivers"];
};

export function DriversCard({ drivers }: DriversCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        Key Drivers
      </Text>

      <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
        <Text style={{ color: theme.colors.success, fontSize: theme.typography.caption, fontWeight: "700" }}>
          Positive drivers
        </Text>
        {drivers.positive.map((driver) => (
          <View key={driver.label} style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: theme.colors.textSecondary, flex: 1, fontSize: theme.typography.bodySmall }}>
              • {driver.label}
            </Text>
            <Text style={{ color: theme.colors.success, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
              {driver.value}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.danger, fontSize: theme.typography.caption, fontWeight: "700" }}>
          Negative drivers
        </Text>
        {drivers.negative.map((driver) => (
          <View key={driver.label} style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: theme.colors.textSecondary, flex: 1, fontSize: theme.typography.bodySmall }}>
              • {driver.label}
            </Text>
            <Text style={{ color: theme.colors.danger, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
              {driver.value}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
