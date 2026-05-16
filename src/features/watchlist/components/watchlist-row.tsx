import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { getWatchlistToneColor } from "@/features/watchlist/utils/watchlist-colors";
import { WatchlistScore } from "@/features/watchlist/components/watchlist-score";

type WatchlistRowProps = {
  item: WatchlistMock["items"][number];
  compact?: boolean;
};

export function WatchlistRow({ item, compact = false }: WatchlistRowProps) {
  const { theme } = useTheme();
  const changeColor = getWatchlistToneColor(theme, item.changeDirection);

  if (compact) {
    return (
      <Card style={{ padding: theme.spacing.md }}>
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: theme.spacing.xxs }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
              {item.ticker}
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>
              {item.company}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", gap: theme.spacing.xxs }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
              {item.price}
            </Text>
            <Text style={{ color: changeColor, fontSize: theme.typography.caption, fontWeight: "700" }}>
              {item.change}
            </Text>
          </View>
          <View style={{ marginLeft: theme.spacing.md }}>
            <WatchlistScore score={item.score} />
          </View>
        </View>
      </Card>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        borderBottomColor: theme.colors.borderSubtle,
        borderBottomWidth: 1,
        flexDirection: "row",
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.md,
      }}
    >
      <View style={{ flex: 1.2, gap: theme.spacing.xxs }}>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
          {item.ticker}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>
          {item.company}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", flex: 0.8 }}>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
          {item.price}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", flex: 0.7 }}>
        <Text style={{ color: changeColor, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
          {item.change}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", flex: 0.5 }}>
        <WatchlistScore score={item.score} />
      </View>
    </View>
  );
}
