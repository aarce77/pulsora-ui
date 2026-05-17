import { Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "@/theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  accessibilityLabel,
}: ButtonProps) {
  const { theme } = useTheme();
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary ? theme.colors.primary : theme.colors.surfaceMuted,
          minHeight: 44,
          opacity: pressed ? 0.88 : 1,
          borderRadius: theme.radius.pill,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
      ]}
    >
      <Text
        style={{
          color: isPrimary ? "#FFFFFF" : theme.colors.textPrimary,
          fontSize: theme.typography.bodySmall,
          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
