import { Text, View } from "react-native";

import { useTheme } from "@/theme";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type FilterChipProps = {
  label: string;
  selected?: boolean;
};

export function FilterChip({ label, selected = false }: FilterChipProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: selected ? withAlpha(theme.colors.primary, "18") : theme.colors.surfaceMuted,
        borderRadius: theme.radius.pill,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
      }}
    >
      <Text
        style={{
          color: selected ? theme.colors.primary : theme.colors.textSecondary,
          fontSize: theme.typography.bodySmall,
          fontWeight: selected ? "700" : "600",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
