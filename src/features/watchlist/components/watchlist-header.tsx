import { Plus, Search } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";

type WatchlistHeaderProps = {
  title: string;
  searchPlaceholder: string;
  isDesktop: boolean;
};

export function WatchlistHeader({
  title,
  searchPlaceholder,
  isDesktop,
}: WatchlistHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View
        style={{
          alignItems: isDesktop ? "center" : "flex-start",
          flexDirection: isDesktop ? "row" : "column",
          gap: theme.spacing.md,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: theme.spacing.xs }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h1, fontWeight: "700" }}>
            {title}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body }}>
            Track high-conviction names with signal-aware scoring and quick market context.
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.pill,
            height: 42,
            justifyContent: "center",
            width: 42,
          }}
        >
          <Plus color="#FFFFFF" size={20} />
        </View>
      </View>

      <Card style={{ padding: theme.spacing.sm }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surfaceMuted,
            borderRadius: theme.radius.pill,
            flexDirection: "row",
            gap: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          }}
        >
          <Search color={theme.colors.textMuted} size={18} />
          <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.bodySmall }}>
            {searchPlaceholder}
          </Text>
        </View>
      </Card>
    </View>
  );
}
