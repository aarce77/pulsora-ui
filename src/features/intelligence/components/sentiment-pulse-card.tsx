import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";
import { IntelligenceMock } from "@/features/intelligence/data/intelligence-mock";
import { useTheme } from "@/theme";

type SentimentPulseCardProps = {
  items: IntelligenceMock["sentimentPulse"];
};

export function SentimentPulseCard({ items }: SentimentPulseCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        Sentiment Pulse
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.xs }}>
        Monitor how macro, sector, and risk appetite signals are evolving.
      </Text>

      <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
        {items.map((item) => {
          const toneColor = getToneColor(theme, item.tone);
          return (
            <View
              key={item.label}
              style={{
                backgroundColor: theme.colors.surfaceMuted,
                borderRadius: theme.radius.md,
                overflow: "hidden",
                padding: theme.spacing.sm,
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
                  {item.label}
                </Text>
                <Text style={{ color: toneColor, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
                  {item.score}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: theme.colors.borderSubtle,
                  borderRadius: theme.radius.pill,
                  height: 8,
                  marginTop: theme.spacing.sm,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    backgroundColor: toneColor,
                    borderRadius: theme.radius.pill,
                    height: "100%",
                    width: `${item.score}%`,
                  }}
                />
              </View>

              <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption }}>
                  Sentiment score
                </Text>
                <Text
                  style={{
                    backgroundColor: withAlpha(toneColor, "18"),
                    borderRadius: theme.radius.pill,
                    color: toneColor,
                    fontSize: theme.typography.caption,
                    fontWeight: "700",
                    overflow: "hidden",
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                  }}
                >
                  {item.change}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
