import { darkTheme, lightTheme } from "@/theme";

describe("theme tokens", () => {
  it("keeps premium surface contrast in light mode", () => {
    expect(lightTheme.colors.background).toBe("#F7F8FC");
    expect(lightTheme.colors.primary).toBe("#6D5EF5");
  });

  it("keeps premium surface contrast in dark mode", () => {
    expect(darkTheme.colors.background).toBe("#060816");
    expect(darkTheme.colors.surface).toBe("#0E1324");
  });
});
