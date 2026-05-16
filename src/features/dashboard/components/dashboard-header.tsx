import { Bell, Search, Sparkles, SunMoon } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { useTheme } from "@/theme";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type DashboardHeaderProps = {
  title: string;
  isDesktop: boolean;
};

export function DashboardHeader({ title, isDesktop }: DashboardHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ gap: theme.spacing.sm }}>
        <StatusPill label="Phase 2" tone="success" />
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h1, fontWeight: "700" }}>
          {title}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body }}>
          Explainable signals, regime context, and market pulse in a calm multi-device dashboard.
        </Text>
      </View>

      <Card
        style={{
          padding: theme.spacing.sm,
          backgroundColor: withAlpha(theme.colors.surface, "F2"),
        }}
      >
        <View
          style={{
            alignItems: "center",
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
            <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.bodySmall }}>
              Search stocks, ETFs, or sectors...
            </Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
            {[SunMoon, Bell, Sparkles].map((Icon, index) => (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  backgroundColor: theme.colors.surfaceMuted,
                  borderRadius: theme.radius.pill,
                  height: 40,
                  justifyContent: "center",
                  width: 40,
                }}
              >
                <Icon color={theme.colors.textSecondary} size={18} />
              </View>
            ))}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: theme.spacing.sm,
                marginLeft: theme.spacing.xs,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.radius.pill,
                  height: 36,
                  justifyContent: "center",
                  width: 36,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: theme.typography.bodySmall, fontWeight: "700" }}>JD</Text>
              </View>
              {isDesktop ? (
                <View>
                  <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
                    John Doe
                  </Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>Pro Plan</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}
