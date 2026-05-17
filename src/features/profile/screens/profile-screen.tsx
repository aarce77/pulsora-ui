import { Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "@/theme";

export function SettingsScreen() {
  const { theme, preference, setPreference } = useTheme();
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          Settings
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body, marginTop: theme.spacing.sm }}>
          Manage your theme preference and local session controls.
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
          <Button label="Light" variant={preference === "light" ? "primary" : "secondary"} onPress={() => setPreference("light")} />
          <Button label="Dark" variant={preference === "dark" ? "primary" : "secondary"} onPress={() => setPreference("dark")} />
          <Button
            label="System"
            variant={preference === "system" ? "primary" : "secondary"}
            onPress={() => setPreference("system")}
            accessibilityLabel="Use system theme"
          />
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h3, fontWeight: "700" }}>
          Session
        </Text>
        <View style={{ marginTop: theme.spacing.md }}>
          <Button label="Sign out" variant="secondary" onPress={clearSession} accessibilityLabel="Sign out of Pulsora" />
        </View>
      </Card>
    </Screen>
  );
}
