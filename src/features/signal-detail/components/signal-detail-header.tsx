import { useRouter } from "expo-router";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

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

  return (
    <View style={{ gap: theme.spacing.md }}>
      <StatusPill label="Phase 2" tone="success" />
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
        </View>

        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to Home"
            onPress={() => router.push("/home")}
            style={{
              alignItems: "center",
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.pill,
              height: 40,
              justifyContent: "center",
              width: 40,
            }}
          >
            <ArrowLeft color={theme.colors.textSecondary} size={18} />
          </Pressable>
          {[Bookmark, Share2].map((Icon, index) => (
            <View
              key={index}
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.surfaceMuted,
                borderRadius: theme.radius.pill,
                height: 40,
                justifyContent: "center",
                width: 40,
              }}
            >
              <Icon color={theme.colors.textSecondary} size={18} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
