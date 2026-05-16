import { Text, View } from "react-native";

import { useTheme } from "@/theme";

type StatusPillProps = {
  label: string;
  tone?: "neutral" | "success" | "warning";
};

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  const { theme } = useTheme();
  const color =
    tone === "success"
      ? theme.colors.success
      : tone === "warning"
        ? theme.colors.warning
        : theme.colors.primary;

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: `${color}22`,
        borderRadius: theme.radius.pill,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
      }}
    >
      <Text
        style={{
          color,
          fontSize: theme.typography.caption,
          fontWeight: "700",
          letterSpacing: 0.3,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
