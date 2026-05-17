import { type ReactNode } from "react";
import { Bell, Plus, Search } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type WatchlistHeaderProps = {
  title: string;
  searchPlaceholder: string;
  isDesktop: boolean;
  searchValue: string;
  onChangeSearch: (value: string) => void;
  onPressAdd: () => void;
  addOverlay?: ReactNode;
  isAddOverlayOpen?: boolean;
};

export function WatchlistHeader({
  title,
  searchPlaceholder,
  isDesktop,
  searchValue,
  onChangeSearch,
  onPressAdd,
  addOverlay,
  isAddOverlayOpen = false,
}: WatchlistHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.primary, fontSize: theme.typography.h1, fontWeight: "700", letterSpacing: 0.4 }}>
          PULSORA
        </Text>
        <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              alignItems: "center",
              backgroundColor: withAlpha(theme.colors.surface, "F2"),
              borderRadius: theme.radius.pill,
              height: 44,
              justifyContent: "center",
              width: 44,
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
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
            Track stock signals, conviction, and market context in one place.
          </Text>
        </View>
      </View>

      <View
        style={{
          position: "relative",
          zIndex: isAddOverlayOpen ? 40 : 0,
        }}
      >
        <Card style={{ padding: theme.spacing.xs, backgroundColor: withAlpha(theme.colors.surface, "F2") }}>
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
                paddingVertical: theme.spacing.md,
              }}
            >
              <Search color={theme.colors.textMuted} size={18} />
              <TextInput
                accessibilityLabel="Search stocks"
                accessibilityHint="Filters the Home watchlist by ticker or company name."
                onChangeText={onChangeSearch}
                placeholder={searchPlaceholder}
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

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add stock"
              accessibilityHint="Opens the ticker search overlay to add a stock to Home."
              hitSlop={6}
              onPress={onPressAdd}
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius.pill,
                height: 44,
                justifyContent: "center",
                width: 44,
              }}
            >
              <Plus color="#FFFFFF" size={20} />
            </Pressable>
          </View>
        </Card>

        {addOverlay ? (
          <View
            pointerEvents="box-none"
            style={{
              left: 0,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 50,
            }}
          >
            {addOverlay}
          </View>
        ) : null}
      </View>
    </View>
  );
}
