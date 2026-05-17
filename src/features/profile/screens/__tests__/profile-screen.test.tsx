import { fireEvent, render, screen } from "@testing-library/react-native";

import { SettingsScreen } from "@/features/profile/screens/profile-screen";
import { appStorage } from "@/store/storage";
import {
  SETTINGS_STORE_STORAGE_KEY,
  useSettingsStore,
} from "@/store/settings-store";
import { ThemeProvider } from "@/theme";

describe("SettingsScreen", () => {
  beforeEach(() => {
    appStorage.removeItem(SETTINGS_STORE_STORAGE_KEY);
    useSettingsStore.getState().resetPreferences();
  });

  it("renders the expanded local settings sections", () => {
    render(
      <ThemeProvider>
        <SettingsScreen />
      </ThemeProvider>,
    );

    expect(screen.getByText("Notifications")).toBeOnTheScreen();
    expect(screen.getByText("Signal Display")).toBeOnTheScreen();
    expect(screen.getByText("Market pulse alerts")).toBeOnTheScreen();
    expect(screen.getByText("Confidence mode")).toBeOnTheScreen();
  });

  it("updates notification and signal-display preferences", () => {
    render(
      <ThemeProvider>
        <SettingsScreen />
      </ThemeProvider>,
    );

    fireEvent.press(screen.getByLabelText("Disable Market pulse alerts"));
    fireEvent.press(screen.getByLabelText("Disable Daily AI brief"));
    fireEvent.press(screen.getByLabelText("Use standard confidence mode"));
    fireEvent.press(screen.getByLabelText("Use detailed explanation density"));

    expect(useSettingsStore.getState().marketAlertsEnabled).toBe(false);
    expect(useSettingsStore.getState().dailyBriefEnabled).toBe(false);
    expect(useSettingsStore.getState().confidenceMode).toBe("standard");
    expect(useSettingsStore.getState().explanationDensity).toBe("detailed");
  });
});
