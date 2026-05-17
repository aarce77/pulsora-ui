import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react-native";

import { IntelligenceScreen } from "@/features/intelligence/screens/intelligence-screen";
import { ThemeProvider } from "@/theme";

describe("IntelligenceScreen", () => {
  it("renders the intelligence shell and core market context content", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <IntelligenceScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Intelligence")).toBeOnTheScreen();
    expect(screen.getByText("Sentiment Pulse")).toBeOnTheScreen();
    expect(screen.getByText("Fed speakers")).toBeOnTheScreen();
    expect(screen.getByText("News Radar")).toBeOnTheScreen();
  });
});
