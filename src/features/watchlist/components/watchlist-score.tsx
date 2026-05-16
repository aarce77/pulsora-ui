import { Text, View } from "react-native";

import { useTheme } from "@/theme";
import { getScoreTone } from "@/features/watchlist/utils/watchlist-colors";
import { getToneColor, withAlpha } from "@/features/dashboard/utils/dashboard-colors";

type WatchlistScoreProps = {
  score: number;
};

export function WatchlistScore({ score }: WatchlistScoreProps) {
  const { theme } = useTheme();
  const tone = getScoreTone(score);
  const color = getToneColor(theme, tone);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: withAlpha(color, "14"),
        borderColor: color,
        borderRadius: theme.radius.pill,
        borderWidth: 1,
        height: 36,
        justifyContent: "center",
        width: 36,
      }}
    >
      <Text style={{ color, fontSize: theme.typography.caption, fontWeight: "700" }}>
        {score}
      </Text>
    </View>
  );
}
