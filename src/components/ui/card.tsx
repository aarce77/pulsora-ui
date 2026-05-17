import { PropsWithChildren } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "@/theme";

type CardProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export function Card({ children, style }: CardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.borderSubtle,
          borderRadius: theme.radius.md,
          padding: theme.spacing.lg,
          shadowColor: Platform.OS === "web" ? "transparent" : "#000000",
          shadowOpacity: Platform.OS === "web" ? 0 : 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
});
