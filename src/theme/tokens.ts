import { PulsoraTheme } from "@/theme/types";

const typography = {
  display: 32,
  h1: 28,
  h2: 24,
  h3: 20,
  body: 16,
  bodySmall: 14,
  caption: 12,
} as const;

const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const lightTheme: PulsoraTheme = {
  colors: {
    background: "#F7F8FC",
    surface: "#FFFFFF",
    surfaceMuted: "#F2F4F7",
    elevated: "#EEF2FF",
    borderSubtle: "#E4E7EC",
    textPrimary: "#111827",
    textSecondary: "#475467",
    textMuted: "#98A2B3",
    primary: "#6D5EF5",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
  },
  typography,
  spacing,
  radius,
};

export const darkTheme: PulsoraTheme = {
  colors: {
    background: "#060816",
    surface: "#0E1324",
    surfaceMuted: "#131A2E",
    elevated: "#1A2140",
    borderSubtle: "#25304D",
    textPrimary: "#FFFFFF",
    textSecondary: "#C9D3E1",
    textMuted: "#94A3B8",
    primary: "#7C6CFF",
    success: "#00D09C",
    warning: "#F5B942",
    danger: "#FF5C5C",
  },
  typography,
  spacing,
  radius,
};
