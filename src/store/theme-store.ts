import { Appearance } from "react-native";
import { appStorage } from "@/store/storage";
import { ColorScheme } from "@/theme/types";
import { createJSONStorage, persist } from "@/vendor/zustand-middleware";
import { create } from "@/vendor/zustand";

type ThemePreference = "system" | ColorScheme;

type ThemeStoreState = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  resolvedScheme: ColorScheme;
  syncWithSystem: () => void;
};

function getResolvedScheme(preference: ThemePreference): ColorScheme {
  if (preference !== "system") {
    return preference;
  }

  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set, get) => ({
      preference: "system",
      resolvedScheme: getResolvedScheme("system"),
      setPreference: (preference) =>
        set({
          preference,
          resolvedScheme: getResolvedScheme(preference),
        }),
      syncWithSystem: () =>
        set(({ preference }) => ({
          resolvedScheme: getResolvedScheme(preference),
        })),
    }),
    {
      name: "pulsora-theme",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({ preference: state.preference }),
      onRehydrateStorage: () => (state) => {
        state?.syncWithSystem();
      },
    },
  ),
);
