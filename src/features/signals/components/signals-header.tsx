import { Search, SlidersHorizontal } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";

type SignalsHeaderProps = {
  title: string;
  subtitle: string;
};

export function SignalsHeader({ title, subtitle }: SignalsHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ gap: theme.spacing.xs }}>
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

      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <Card
          style={{
            backgroundColor: theme.colors.surface,
            flex: 1,
            padding: theme.spacing.sm,
          }}
        >
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
            <Text
              style={{
                color: theme.colors.textMuted,
                fontSize: theme.typography.bodySmall,
              }}
            >
              Search signals or tickers...
            </Text>
          </View>
        </Card>
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surfaceMuted,
            borderRadius: theme.radius.pill,
            height: 44,
            justifyContent: "center",
            width: 44,
          }}
        >
          <SlidersHorizontal color={theme.colors.textSecondary} size={18} />
        </View>
      </View>
    </View>
  );
}
