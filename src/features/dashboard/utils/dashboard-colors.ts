import { PulsoraTheme } from "@/theme";

export function getToneColor(
  theme: PulsoraTheme,
  tone: "positive" | "negative" | "warning" | "neutral",
) {
  switch (tone) {
    case "positive":
      return theme.colors.success;
    case "negative":
      return theme.colors.danger;
    case "warning":
      return theme.colors.warning;
    default:
      return theme.colors.textSecondary;
  }
}

export function withAlpha(hexColor: string, alpha: string) {
  return `${hexColor}${alpha}`;
}
