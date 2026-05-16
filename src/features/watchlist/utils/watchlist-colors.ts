import { PulsoraTheme } from "@/theme";

export function getWatchlistToneColor(
  theme: PulsoraTheme,
  tone: "up" | "down" | "neutral",
) {
  switch (tone) {
    case "up":
      return theme.colors.success;
    case "down":
      return theme.colors.danger;
    default:
      return theme.colors.textSecondary;
  }
}

export function getScoreTone(
  score: number,
): "positive" | "warning" | "negative" {
  if (score >= 70) {
    return "positive";
  }

  if (score >= 55) {
    return "warning";
  }

  return "negative";
}
