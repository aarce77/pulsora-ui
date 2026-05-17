import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme";
import { WatchlistMock } from "@/features/watchlist/data/watchlist-mock";
import { getWatchlistToneColor } from "@/features/watchlist/utils/watchlist-colors";
import { WatchlistScore } from "@/features/watchlist/components/watchlist-score";
import { StatusPill } from "@/components/ui/status-pill";

type WatchlistRowProps = {
  item: WatchlistMock["items"][number];
};

function getSignalTone(signal: "BUY" | "HOLD" | "SELL") {
  if (signal === "BUY") {
    return "success" as const;
  }

  if (signal === "HOLD") {
    return "warning" as const;
  }

  return "neutral" as const;
}

export function WatchlistRow({ item }: WatchlistRowProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const changeColor = getWatchlistToneColor(theme, item.changeDirection);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint={`Opens the ${item.ticker} signal detail screen for ${item.company}.`}
      accessibilityLabel={`Open ${item.ticker} signal detail for ${item.company}`}
      accessibilityValue={{
        text: `${item.signal} signal, score ${item.score}, move ${item.change}`,
      }}
      hitSlop={6}
      onPress={() => router.push(`/home/${item.ticker}`)}
      style={({ pressed }) => ({
        minHeight: 44,
        opacity: pressed ? 0.92 : 1,
      })}
    >
      <View
        style={{
          alignItems: "center",
          borderBottomColor: theme.colors.borderSubtle,
          borderBottomWidth: 1,
          flexDirection: "row",
          gap: theme.spacing.md,
          paddingVertical: theme.spacing.md,
        }}
      >
        <View style={{ flex: 1.15, gap: theme.spacing.xxs }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body, fontWeight: "700" }}>
            {item.ticker}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.caption }}>
            {item.company}
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 0.75 }}>
          <StatusPill label={item.signal} tone={getSignalTone(item.signal)} />
        </View>
        <View style={{ alignItems: "center", flex: 0.7 }}>
          <WatchlistScore score={item.score} />
        </View>
        <View style={{ alignItems: "flex-end", flex: 0.8 }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.bodySmall, fontWeight: "700" }}>
            {item.price}
          </Text>
          <Text style={{ color: changeColor, fontSize: theme.typography.caption, fontWeight: "700" }}>
            {item.change}
          </Text>
        </View>
        <ChevronRight color={theme.colors.textMuted} size={16} />
      </View>
    </Pressable>
  );
}
