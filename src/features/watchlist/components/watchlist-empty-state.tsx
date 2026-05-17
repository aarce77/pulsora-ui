import { Text } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";

type WatchlistEmptyStateProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  onPressCta?: () => void;
};

export function WatchlistEmptyState({
  title,
  description,
  ctaLabel,
  onPressCta,
}: WatchlistEmptyStateProps) {
  const { theme } = useTheme();

  return (
    <Card>
      <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
        {title}
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall, marginTop: theme.spacing.sm }}>
        {description}
      </Text>
      {ctaLabel && onPressCta ? (
        <Text style={{ marginTop: theme.spacing.md }}>
          <Button label={ctaLabel} variant="secondary" onPress={onPressCta} accessibilityLabel={ctaLabel} />
        </Text>
      ) : null}
    </Card>
  );
}
