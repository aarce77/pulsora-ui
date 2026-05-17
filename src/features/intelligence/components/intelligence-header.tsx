import { Search, SlidersHorizontal } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";
import { useTheme } from "@/theme";

type IntelligenceHeaderProps = {
  title: string;
  subtitle: string;
  isDesktop: boolean;
};

export function IntelligenceHeader({
  title,
  subtitle,
  isDesktop,
}: IntelligenceHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ gap: theme.spacing.sm }}>
        <StatusPill label="Phase 3" tone="success" />
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.h1,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.body,
          }}
        >
          {subtitle}
        </Text>
      </View>

      <Card
        style={{
          backgroundColor: withAlpha(theme.colors.surface, "F2"),
          padding: theme.spacing.sm,
        }}
      >
        <View
          style={{
            alignItems: isDesktop ? "center" : "stretch",
            flexDirection: isDesktop ? "row" : "column",
            gap: theme.spacing.sm,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              flex: isDesktop ? 1 : undefined,
              flexDirection: "row",
              gap: theme.spacing.sm,
              minWidth: isDesktop ? 360 : "100%",
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <Search color={theme.colors.textMuted} size={18} />
            <Text
              style={{
                color: theme.colors.textMuted,
                fontSize: theme.typography.bodySmall,
              }}
            >
              Search themes, sectors, or catalysts...
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              alignSelf: isDesktop ? "auto" : "flex-end",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              flexDirection: "row",
              gap: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <SlidersHorizontal color={theme.colors.textSecondary} size={18} />
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.bodySmall,
                fontWeight: "700",
              }}
            >
              Filters
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
}
