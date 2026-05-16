export type ColorScheme = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  elevated: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
};

export type ThemeTypography = {
  display: number;
  h1: number;
  h2: number;
  h3: number;
  body: number;
  bodySmall: number;
  caption: number;
};

export type ThemeSpacing = {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type PulsoraTheme = {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
};
