import { useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react-native";
import { Pressable, Share, Text, View } from "react-native";

import { StatusPill } from "@/components/ui/status-pill";
import { useTheme } from "@/theme";

type SignalDetailHeaderProps = {
  ticker: string;
  company: string;
  updatedAt: string;
};

export function SignalDetailHeader({
  ticker,
  company,
  updatedAt,
}: SignalDetailHeaderProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  async function handleShare() {
    await Share.share({
      message: `Pulsora signal detail for ${ticker} (${company})`,
      title: `${ticker} signal detail`,
    });
  }

  return (
    <View style={{ gap: theme.spacing.md }}>
      <StatusPill label="Phase 3" tone="success" />
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: theme.spacing.xs, flex: 1 }}>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.h1,
              fontWeight: "700",
            }}
          >
            {ticker}
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.body,
            }}
          >
            {company}
          </Text>
          <Text
            style={{
              color: theme.colors.textMuted,
              fontSize: theme.typography.caption,
            }}
          >
            {updatedAt}
          </Text>
          {isSaved ? (
            <Text
              style={{
                color: theme.colors.success,
                fontSize: theme.typography.caption,
                fontWeight: "600",
              }}
            >
              Saved to Home
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to Home"
            accessibilityHint="Returns to the Home watchlist screen."
            hitSlop={6}
            onPress={() => router.push("/home")}
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              height: 44,
              justifyContent: "center",
              width: 44,
            }}
          >
            <ArrowLeft color={theme.colors.textSecondary} size={18} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isSaved ? `Remove saved ${ticker} signal detail` : `Save ${ticker} signal detail`
            }
            accessibilityHint="Toggles whether this ticker is saved to Home."
            accessibilityState={{ selected: isSaved }}
            hitSlop={6}
            onPress={() => setIsSaved((currentValue) => !currentValue)}
            style={{
              alignItems: "center",
              backgroundColor: isSaved ? `${theme.colors.primary}22` : theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              height: 44,
              justifyContent: "center",
              width: 44,
            }}
          >
            <Bookmark
              color={isSaved ? theme.colors.primary : theme.colors.textSecondary}
              fill={isSaved ? `${theme.colors.primary}55` : "transparent"}
              size={18}
            />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Share ${ticker} signal detail`}
            accessibilityHint="Opens the share sheet for this ticker detail."
            hitSlop={6}
            onPress={() => {
              void handleShare();
            }}
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              height: 44,
              justifyContent: "center",
              width: 44,
            }}
          >
            <Share2 color={theme.colors.textSecondary} size={18} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
