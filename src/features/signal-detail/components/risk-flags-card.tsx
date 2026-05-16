import { AlertTriangle } from "lucide-react-native";
import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";
import { withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type RiskFlagsCardProps = {
  flags: string[];
};

function formatFlag(flag: string) {
  return flag.replaceAll("_", " ");
}

export function RiskFlagsCard({ flags }: RiskFlagsCardProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.typography.h3,
          fontWeight: "700",
        }}
      >
        Risk Flags
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
          marginTop: theme.spacing.md,
        }}
      >
        {flags.map((flag) => (
          <View
            key={flag}
            style={{
              alignItems: "center",
              backgroundColor: withAlpha(theme.colors.warning, "18"),
              borderRadius: theme.radius.pill,
              flexDirection: "row",
              gap: theme.spacing.xs,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
            }}
          >
            <AlertTriangle color={theme.colors.warning} size={14} />
            <Text
              style={{
                color: theme.colors.warning,
                fontSize: theme.typography.caption,
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              {formatFlag(flag)}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
