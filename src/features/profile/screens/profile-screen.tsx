import { Pressable, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { useAuthStore } from "@/store/auth-store";
import { useSettingsStore } from "@/store/settings-store";
import { useTheme } from "@/theme";

export function SettingsScreen() {
  const { theme, preference, setPreference } = useTheme();
  const clearSession = useAuthStore((state) => state.clearSession);
  const marketAlertsEnabled = useSettingsStore((state) => state.marketAlertsEnabled);
  const dailyBriefEnabled = useSettingsStore((state) => state.dailyBriefEnabled);
  const confidenceMode = useSettingsStore((state) => state.confidenceMode);
  const explanationDensity = useSettingsStore((state) => state.explanationDensity);
  const setMarketAlertsEnabled = useSettingsStore((state) => state.setMarketAlertsEnabled);
  const setDailyBriefEnabled = useSettingsStore((state) => state.setDailyBriefEnabled);
  const setConfidenceMode = useSettingsStore((state) => state.setConfidenceMode);
  const setExplanationDensity = useSettingsStore((state) => state.setExplanationDensity);

  const sectionTitleStyle = {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.h3,
    fontWeight: "700" as const,
  };

  const helperTextStyle = {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.bodySmall,
  };

  return (
    <Screen>
      <Card>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.typography.h2, fontWeight: "700" }}>
          Settings
        </Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: theme.typography.body, lineHeight: 24, marginTop: theme.spacing.sm }}>
          Manage local presentation preferences, notification behavior, and session controls.
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
        <Text style={sectionTitleStyle}>
          Notifications
        </Text>
        <Text style={{ ...helperTextStyle, marginTop: theme.spacing.sm }}>
          Control local reminders and briefs without relying on live delivery infrastructure yet.
        </Text>
        <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.md }}>
          <PreferenceToggleRow
            label="Market pulse alerts"
            description="Show local alerts when the market pulse regime shifts materially."
            enabled={marketAlertsEnabled}
            onToggle={() => setMarketAlertsEnabled(!marketAlertsEnabled)}
          />
          <PreferenceToggleRow
            label="Daily AI brief"
            description="Include a concise pre-market recap in the local Home experience."
            enabled={dailyBriefEnabled}
            onToggle={() => setDailyBriefEnabled(!dailyBriefEnabled)}
          />
        </View>
      </Card>

      <Card>
        <Text style={sectionTitleStyle}>
          Signal Display
        </Text>
        <Text style={{ ...helperTextStyle, marginTop: theme.spacing.sm }}>
          Tune how confidence and explainability content is presented across Home and signal detail.
        </Text>

        <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
          <Text style={helperTextStyle}>Confidence mode</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
            <Button
              label="Guided"
              variant={confidenceMode === "guided" ? "primary" : "secondary"}
              onPress={() => setConfidenceMode("guided")}
              accessibilityLabel="Use guided confidence mode"
            />
            <Button
              label="Standard"
              variant={confidenceMode === "standard" ? "primary" : "secondary"}
              onPress={() => setConfidenceMode("standard")}
              accessibilityLabel="Use standard confidence mode"
            />
          </View>
        </View>

        <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.lg }}>
          <Text style={helperTextStyle}>Explanation density</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
            <Button
              label="Concise"
              variant={explanationDensity === "concise" ? "primary" : "secondary"}
              onPress={() => setExplanationDensity("concise")}
              accessibilityLabel="Use concise explanation density"
            />
            <Button
              label="Detailed"
              variant={explanationDensity === "detailed" ? "primary" : "secondary"}
              onPress={() => setExplanationDensity("detailed")}
              accessibilityLabel="Use detailed explanation density"
            />
          </View>
        </View>
      </Card>

      <Card>
        <Text style={sectionTitleStyle}>
          Session
        </Text>
        <View style={{ marginTop: theme.spacing.md }}>
          <Button label="Sign out" variant="secondary" onPress={clearSession} accessibilityLabel="Sign out of Pulsora" />
        </View>
      </Card>
    </Screen>
  );
}

type PreferenceToggleRowProps = {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function PreferenceToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: PreferenceToggleRowProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: theme.spacing.md,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.body,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.bodySmall,
          }}
        >
          {description}
        </Text>
      </View>
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={`${enabled ? "Disable" : "Enable"} ${label}`}
        accessibilityHint={description}
        accessibilityState={{ checked: enabled }}
        hitSlop={6}
        onPress={onToggle}
        style={{
          backgroundColor: enabled ? theme.colors.primary : theme.colors.surfaceMuted,
          borderRadius: theme.radius.pill,
          height: 36,
          justifyContent: "center",
          paddingHorizontal: 4,
          width: 58,
        }}
      >
        <View
          style={{
            alignSelf: enabled ? "flex-end" : "flex-start",
            backgroundColor: "#FFFFFF",
            borderRadius: theme.radius.pill,
            height: 24,
            width: 24,
          }}
        />
      </Pressable>
    </View>
  );
}
