import { Image, Pressable, Text, TextInput, View } from "react-native";
import { Search, X } from "lucide-react-native";

import { Card } from "@/components/ui/card";
import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { useTheme } from "@/theme";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type AddStockModalProps = {
  items: WatchlistMock["searchResults"];
  open: boolean;
  searchValue: string;
  onChangeSearch: (value: string) => void;
  onClose: () => void;
  onAdd: (item: WatchlistMock["searchResults"][number]) => void;
};

export function AddStockModal({
  items,
  open,
  searchValue,
  onChangeSearch,
  onClose,
  onAdd,
}: AddStockModalProps) {
  const { theme } = useTheme();

  if (!open) {
    return null;
  }

  return (
    <View
      style={{
        paddingTop: theme.spacing.xs,
      }}
    >
      <Card
        style={{
          borderRadius: theme.radius.md,
          padding: theme.spacing.lg,
          width: "100%",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1, paddingRight: theme.spacing.md }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
              Add Stock
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.xs }}>
              Search the ticker catalog. Future results will come from the live ticker-search API.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close add stock modal"
            onPress={onClose}
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <X color={theme.colors.textSecondary} size={18} />
          </Pressable>
        </View>

        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surfaceMuted,
            borderRadius: theme.radius.pill,
            flexDirection: "row",
            gap: theme.spacing.sm,
            marginTop: theme.spacing.lg,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          }}
        >
          <Search color={theme.colors.textMuted} size={18} />
          <TextInput
            accessibilityLabel="Search ticker catalog"
            autoCapitalize="characters"
            onChangeText={onChangeSearch}
            placeholder="Search ticker or company..."
            placeholderTextColor={theme.colors.textMuted}
            style={{
              color: theme.colors.textPrimary,
              flex: 1,
              fontSize: theme.typography.bodySmall,
              paddingVertical: 0,
            }}
            value={searchValue}
          />
        </View>

        {items.length === 0 ? (
          <View
            style={{
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.md,
              marginTop: theme.spacing.lg,
              padding: theme.spacing.md,
            }}
          >
            <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
              No matching tickers
            </Text>
            <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.xs }}>
              Try a different symbol or company name.
            </Text>
          </View>
        ) : (
          <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.lg }}>
            {items.map((item) => (
              <Pressable
                key={item.ticker}
                accessibilityRole="button"
                accessibilityLabel={`Add ${item.ticker} to watchlist`}
                onPress={() => onAdd(item)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.92 : 1,
                })}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: theme.colors.surfaceMuted,
                    borderColor: theme.colors.borderSubtle,
                    borderRadius: theme.radius.md,
                    borderWidth: 1,
                    flexDirection: "row",
                    gap: theme.spacing.md,
                    padding: theme.spacing.md,
                  }}
                >
                  <Image
                    source={{ uri: item.logo }}
                    style={{
                      backgroundColor: withAlpha(theme.colors.primary, "18"),
                      borderRadius: theme.radius.pill,
                      height: 36,
                      width: 36,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
                      {item.ticker}
                    </Text>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>
                      {item.name}
                    </Text>
                  </View>
                  <Text style={{ color: theme.colors.primary, fontSize: theme.typography.caption, fontWeight: "700" }}>
                    Add
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </Card>
    </View>
  );
}
