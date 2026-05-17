import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistRow } from "@/features/watchlist/components/watchlist-row";

type WatchlistTableProps = {
  items: WatchlistMock["items"];
  updatedAt: string;
};

export function WatchlistTable({ items, updatedAt }: WatchlistTableProps) {
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
        <Text style={{ color: theme.colors.textSecondary, flex: 0.8, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "center" }}>
          Signal
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.6, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "center" }}>
          Confidence
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.7, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "right" }}>
          Score
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.8, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "right" }}>
          Change
        </Text>
      </View>

      {items.map((item, index) => (
        <View key={item.ticker}>
          <WatchlistRow item={item} />
          {index === items.length - 1 ? null : null}
        </View>
      ))}

      <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption, marginTop: theme.spacing.md }}>
        {updatedAt}
      </Text>
    </Card>
  );
}
