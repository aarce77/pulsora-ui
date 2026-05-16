import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { DashboardMock } from "@/features/dashboard/data/dashboard-mock";
import { Sparkline } from "@/features/dashboard/components/sparkline";
import { getMarketTileWidth } from "@/features/dashboard/utils/dashboard-layout";
import { useTheme } from "@/theme";
import { getToneColor } from "@/features/dashboard/utils/dashboard-colors";

type MarketIndexStripProps = {
  indices: DashboardMock["indices"];
  columns: number;
  viewportWidth: number;
};

export function MarketIndexStrip({
  indices,
  columns,
  viewportWidth,
}: MarketIndexStripProps) {
  const { theme } = useTheme();
  const tileWidth = getMarketTileWidth(
    viewportWidth,
    columns,
    theme.spacing.lg,
    theme.spacing.md,
  );

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.md,
        justifyContent: columns === 1 ? "flex-start" : "space-between",
      }}
    >
      {indices.map((index) => (
        <Card
          key={index.name}
          style={{
            width: tileWidth,
            padding: theme.spacing.md,
          }}
        >
          <View style={{ gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption, fontWeight: "700" }}>
              {index.name}
            </Text>
            <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
              {index.value}
            </Text>
            <Text
              style={{
                color: getToneColor(theme, index.direction === "down" ? "negative" : "positive"),
                fontSize: theme.typography.bodySmall,
                fontWeight: "700",
              }}
            >
              {index.change}
            </Text>
          </View>
          <View style={{ marginTop: theme.spacing.md, width: "100%" }}>
            <Sparkline
              points={index.points.map((point) => point.value)}
              direction={index.direction}
              height={44}
              minWidth={84}
            />
          </View>
        </Card>
      ))}
    </View>
  );
}
