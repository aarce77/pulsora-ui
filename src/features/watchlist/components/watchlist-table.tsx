import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistRow } from "@/features/watchlist/components/watchlist-row";

type WatchlistTableProps = {
  items: WatchlistMock["items"];
};

export function WatchlistTable({ items }: WatchlistTableProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <View
        style={{
          alignItems: "center",
          borderBottomColor: theme.colors.borderSubtle,
          borderBottomWidth: 1,
          flexDirection: "row",
          gap: theme.spacing.md,
          paddingBottom: theme.spacing.sm,
        }}
      >
        <Text style={{ color: theme.colors.textSecondary, flex: 1.2, fontSize: theme.typography.caption, fontWeight: "700" }}>
          Symbol
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.8, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "right" }}>
          Price
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.7, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "right" }}>
          Change
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.5, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "right" }}>
          Score
        </Text>
      </View>

      {items.map((item, index) => (
        <View key={item.ticker}>
          <WatchlistRow item={item} />
          {index === items.length - 1 ? null : null}
        </View>
      ))}
    </Card>
  );
}
