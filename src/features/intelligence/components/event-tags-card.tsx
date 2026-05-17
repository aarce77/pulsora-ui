import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";
import { IntelligenceMock } from "@/features/intelligence/data/intelligence-mock";
import { useTheme } from "@/theme";

type EventTagsCardProps = {
  items: IntelligenceMock["eventTags"];
};

export function EventTagsCard({ items }: EventTagsCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        Event Tags
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.xs }}>
        Track the catalysts most likely to reframe near-term signal conviction.
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
          marginTop: theme.spacing.md,
        }}
      >
        {items.map((item) => {
          const toneColor = getToneColor(theme, item.tone);
          return (
            <View
              key={item.label}
              style={{
                backgroundColor: withAlpha(toneColor, "14"),
                borderColor: withAlpha(toneColor, "30"),
                borderRadius: theme.radius.md,
                borderWidth: 1,
                gap: theme.spacing.xs,
                minWidth: 132,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.sm,
              }}
            >
              <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
                {item.label}
              </Text>
              <Text style={{ color: toneColor, fontSize: theme.typography.caption, fontWeight: "700" }}>
                {item.impact} impact
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
