import { router } from "expo-router";
import { ArrowUpRight, Dot } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { Sparkline } from "@/features/dashboard/components/sparkline";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";
import { SignalsMock } from "@/features/signals/data/signals-mock";
import { useTheme } from "@/theme";
import { SignalScoreBadge } from "@/features/signals/components/signal-score-badge";

type SignalListCardProps = {
  item: SignalsMock["items"][number];
  compact?: boolean;
};

function getSignalTone(signal: "BUY" | "HOLD" | "SELL") {
  if (signal === "BUY") {
    return "positive" as const;
  }

  if (signal === "SELL") {
    return "negative" as const;
  }

  return "warning" as const;
}

export function SignalListCard({
  item,
  compact = false,
}: SignalListCardProps) {
  const { theme } = useTheme();
  const signalTone = getSignalTone(item.signal);
  const moveTone =
    item.expectedMove.startsWith("-") ? "negative" : "positive";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.ticker} signal detail`}
      onPress={() => router.push(`/signal/${item.ticker}`)}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
    >
      <Card
        style={{
          padding: theme.spacing.md,
        }}
      >
        <View
          style={{
            alignItems: compact ? "flex-start" : "center",
            flexDirection: compact ? "column" : "row",
            gap: theme.spacing.md,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.typography.h3,
                  fontWeight: "700",
                }}
              >
                {item.ticker}
              </Text>
              <StatusPill label={item.signal} tone={signalTone === "warning" ? "warning" : signalTone === "negative" ? "neutral" : "success"} />
            </View>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.bodySmall,
              }}
            >
              {item.company}
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: theme.spacing.sm,
                marginTop: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  color: getToneColor(theme, signalTone),
                  fontSize: theme.typography.bodySmall,
                  fontWeight: "700",
                }}
              >
                {item.confidenceLabel}
              </Text>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Dot color={theme.colors.textMuted} size={16} />
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.bodySmall,
                  }}
                >
                  {item.regime}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Dot color={theme.colors.textMuted} size={16} />
                <Text
                  style={{
                    color: theme.colors.textMuted,
                    fontSize: theme.typography.caption,
                  }}
                >
                  {item.updatedAt}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: compact ? "stretch" : "flex-end",
              gap: theme.spacing.sm,
              minWidth: compact ? "100%" : 180,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: theme.spacing.sm,
                justifyContent: compact ? "space-between" : "flex-end",
              }}
            >
              <View>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.caption,
                  }}
                >
                  Expected move
                </Text>
                <Text
                  style={{
                    color: getToneColor(theme, moveTone),
                    fontSize: theme.typography.body,
                    fontWeight: "700",
                  }}
                >
                  {item.expectedMove}
                </Text>
              </View>
              <SignalScoreBadge score={item.confidenceScore} />
            </View>

            <View style={{ width: "100%" }}>
              <Sparkline
                points={item.chart.map((point) => point.value)}
                direction={signalTone === "negative" ? "down" : "up"}
                height={52}
                minWidth={compact ? 200 : 160}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                alignSelf: compact ? "flex-end" : "stretch",
                backgroundColor: withAlpha(theme.colors.primary, "14"),
                borderRadius: theme.radius.pill,
                flexDirection: "row",
                gap: theme.spacing.xs,
                justifyContent: "center",
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
              }}
            >
              <ArrowUpRight color={theme.colors.primary} size={14} />
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.caption,
                  fontWeight: "700",
                }}
              >
                View signal
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
