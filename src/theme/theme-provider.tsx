import { Appearance } from "react-native";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react";

import { useThemeStore } from "@/store/theme-store";
import { darkTheme, lightTheme } from "@/theme/tokens";
import { ColorScheme, PulsoraTheme } from "@/theme/types";

type ThemeContextValue = {
  colorScheme: ColorScheme;
  theme: PulsoraTheme;
  preference: "system" | ColorScheme;
  setPreference: (preference: "system" | ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const preference = useThemeStore((state) => state.preference);
  const resolvedScheme = useThemeStore((state) => state.resolvedScheme);
  const setPreference = useThemeStore((state) => state.setPreference);
  const syncWithSystem = useThemeStore((state) => state.syncWithSystem);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      syncWithSystem();
    });

    return () => subscription.remove();
  }, [syncWithSystem]);

  const value = useMemo(
    () => ({
      colorScheme: resolvedScheme,
      theme: resolvedScheme === "dark" ? darkTheme : lightTheme,
      preference,
      setPreference,
    }),
    [preference, resolvedScheme, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
