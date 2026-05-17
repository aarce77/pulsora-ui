import { appStorage } from "@/store/storage";
import {
  SETTINGS_STORE_STORAGE_KEY,
  useSettingsStore,
} from "@/store/settings-store";

describe("useSettingsStore", () => {
  beforeEach(() => {
    appStorage.removeItem(SETTINGS_STORE_STORAGE_KEY);
    useSettingsStore.getState().resetPreferences();
  });

  it("starts with the default local preference values", () => {
    const state = useSettingsStore.getState();

    expect(state.marketAlertsEnabled).toBe(true);
    expect(state.dailyBriefEnabled).toBe(true);
    expect(state.confidenceMode).toBe("guided");
    expect(state.explanationDensity).toBe("concise");
  });

  it("updates and persists local settings preferences", () => {
    useSettingsStore.getState().setMarketAlertsEnabled(false);
    useSettingsStore.getState().setDailyBriefEnabled(false);
    useSettingsStore.getState().setConfidenceMode("standard");
    useSettingsStore.getState().setExplanationDensity("detailed");

    const persistedValue = appStorage.getItem(SETTINGS_STORE_STORAGE_KEY);

    expect(typeof persistedValue).toBe("string");

    const parsedValue =
      typeof persistedValue === "string"
        ? (JSON.parse(persistedValue) as {
            state: {
              marketAlertsEnabled: boolean;
              dailyBriefEnabled: boolean;
              confidenceMode: string;
              explanationDensity: string;
            };
          })
        : null;

    expect(parsedValue?.state.marketAlertsEnabled).toBe(false);
    expect(parsedValue?.state.dailyBriefEnabled).toBe(false);
    expect(parsedValue?.state.confidenceMode).toBe("standard");
    expect(parsedValue?.state.explanationDensity).toBe("detailed");
  });
});
