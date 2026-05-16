import { Text, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { StatusPill } from "@/components/ui/status-pill";
import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "@/theme";
import { getApiBaseUrl } from "@/utils/env";

const phaseOneItems = [
  "Expo Router tabs and app shell",
  "Tokenized light and dark theme system",
  "Persisted auth store boundary",
  "Axios + Zod API client foundation",
];

export function DashboardScreen() {
  const { theme } = useTheme();
  const status = useAuthStore((state) => state.status);

  return (
    <Screen>
      <View style={{ gap: theme.spacing.sm }}>
        <StatusPill label="Phase 1" tone="success" />
        <Text
          accessibilityRole="header"
          style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h1, fontWeight: "700" }}
        >
          Pulsora foundation
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body }}>
          The app shell, theming, auth persistence, and Markov Trader API boundaries are in place for the Phase 2 UI buildout.
        </Text>
      </View>

      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
          Runtime status
        </Text>
        <View style={{ marginTop: theme.spacing.md, gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
            API Base URL
          </Text>
          <Text selectable style={{ color: theme.colors.textPrimary, fontSize: theme.typography.body }}>
            {getApiBaseUrl()}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.bodySmall }}>
            Auth state: {status}
          </Text>
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
          Build scope completed
        </Text>
        <View style={{ marginTop: theme.spacing.md, gap: theme.spacing.sm }}>
          {phaseOneItems.map((item) => (
            <Text key={item} style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body }}>
              • {item}
            </Text>
          ))}
        </View>
      </Card>
    </Screen>
  );
}
