import { Text, View } from "react-native";

import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { WatchlistRow } from "@/features/watchlist/components/watchlist-row";
import { useTheme } from "@/theme";
import { Card } from "@/components/ui/card";

type WatchlistListProps = {
  items: WatchlistMock["items"];
  updatedAt: string;
};

export function WatchlistList({ items, updatedAt }: WatchlistListProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <View
        style={{
          alignItems: "center",
          borderBottomColor: theme.colors.borderSubtle,
          borderBottomWidth: 1,
          flexDirection: "row",
          gap: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
        }}
      >
        <Text style={{ color: theme.colors.textSecondary, flex: 1.15, fontSize: theme.typography.caption, fontWeight: "700" }}>
          Symbol
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.75, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "center" }}>
          Signal
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.7, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "center" }}>
          Score
        </Text>
        <Text style={{ color: theme.colors.textSecondary, flex: 0.8, fontSize: theme.typography.caption, fontWeight: "700", textAlign: "right" }}>
          Change
        </Text>
      </View>

      {items.map((item) => (
        <WatchlistRow key={item.ticker} item={item} />
      ))}

      <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption, marginTop: theme.spacing.sm }}>
        {updatedAt}
      </Text>
    </Card>
  );
}
