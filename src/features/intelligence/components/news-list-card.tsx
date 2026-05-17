import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";
import { IntelligenceMock } from "@/features/intelligence/data/intelligence-mock";
import { useTheme } from "@/theme";

type NewsListCardProps = {
  items: IntelligenceMock["news"];
};

export function NewsListCard({ items }: NewsListCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        News Radar
      </Text>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.md }}>
        {items.map((item) => {
          const toneColor = getToneColor(theme, item.tone);
          return (
            <View
              key={item.headline}
              style={{
                gap: theme.spacing.xs,
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption, fontWeight: "700" }}>
                  {item.source}
                </Text>
                <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.caption }}>
                  {item.time}
                </Text>
              </View>
              <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
                {item.headline}
              </Text>
              <Text
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: withAlpha(toneColor, "14"),
                  borderRadius: theme.radius.pill,
                  color: toneColor,
                  fontSize: theme.typography.caption,
                  fontWeight: "700",
                  overflow: "hidden",
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                }}
              >
                {item.sentiment}
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
