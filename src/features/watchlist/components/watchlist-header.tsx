import { Bell, Plus, Search } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";

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
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.primary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          PULSORA
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: withAlpha(theme.colors.surface, "F2"),
              borderRadius: theme.radius.pill,
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <Bell color={theme.colors.textSecondary} size={18} />
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: isDesktop ? "center" : "flex-start",
          flexDirection: isDesktop ? "row" : "column",
          gap: theme.spacing.md,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: theme.spacing.xs, flex: 1 }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h1, fontWeight: "700" }}>
            {title}
          </Text>
        </View>
      </View>

      <Card style={{ padding: theme.spacing.sm, backgroundColor: withAlpha(theme.colors.surface, "F2") }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: isDesktop ? "row" : "row",
            gap: theme.spacing.sm,
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              flex: 1,
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
      </Card>
    </View>
  );
}
