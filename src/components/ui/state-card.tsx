import { Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/theme";

type StateCardProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  onPressCta?: () => void;
  children?: React.ReactNode;
};

export function StateCard({
  title,
  description,
  ctaLabel,
  onPressCta,
  children,
}: StateCardProps) {
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
        {title}
      </Text>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.bodySmall,
          marginTop: theme.spacing.sm,
        }}
      >
        {description}
      </Text>
      {children ? <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.lg }}>{children}</View> : null}
      {ctaLabel && onPressCta ? (
        <View style={{ alignSelf: "flex-start", marginTop: theme.spacing.lg }}>
          <Button
            label={ctaLabel}
            variant="secondary"
            onPress={onPressCta}
            accessibilityLabel={ctaLabel}
          />
        </View>
      ) : null}
    </Card>
  );
}

type StateSkeletonProps = {
  lines?: number;
};

export function StateSkeleton({ lines = 3 }: StateSkeletonProps) {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {Array.from({ length: lines }, (_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: theme.colors.surfaceMuted,
            borderRadius: theme.radius.pill,
            height: 12,
            opacity: 0.9 - index * 0.1,
            width: index === lines - 1 ? "54%" : "100%",
          }}
        />
      ))}
    </View>
  );
}
