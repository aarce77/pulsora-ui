import { appStorage } from "@/store/storage";
import { createJSONStorage, persist } from "@/vendor/zustand-middleware";
import { create } from "@/vendor/zustand";

export type ConfidenceMode = "guided" | "standard";
export type ExplanationDensity = "concise" | "detailed";

type SettingsStoreState = {
  marketAlertsEnabled: boolean;
  dailyBriefEnabled: boolean;
  confidenceMode: ConfidenceMode;
  explanationDensity: ExplanationDensity;
  setMarketAlertsEnabled: (enabled: boolean) => void;
  setDailyBriefEnabled: (enabled: boolean) => void;
  setConfidenceMode: (mode: ConfidenceMode) => void;
  setExplanationDensity: (density: ExplanationDensity) => void;
  resetPreferences: () => void;
};

export const SETTINGS_STORE_STORAGE_KEY = "pulsora-settings";

const defaultPreferences = {
  marketAlertsEnabled: true,
  dailyBriefEnabled: true,
  confidenceMode: "guided" as const,
  explanationDensity: "concise" as const,
};

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setMarketAlertsEnabled: (marketAlertsEnabled) => set({ marketAlertsEnabled }),
      setDailyBriefEnabled: (dailyBriefEnabled) => set({ dailyBriefEnabled }),
      setConfidenceMode: (confidenceMode) => set({ confidenceMode }),
      setExplanationDensity: (explanationDensity) => set({ explanationDensity }),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: SETTINGS_STORE_STORAGE_KEY,
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        marketAlertsEnabled: state.marketAlertsEnabled,
        dailyBriefEnabled: state.dailyBriefEnabled,
        confidenceMode: state.confidenceMode,
        explanationDensity: state.explanationDensity,
      }),
    },
  ),
);
