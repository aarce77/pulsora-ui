import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react-native";

import { SignalDetailScreen } from "@/features/signals/screens/signal-detail-screen";
import { ThemeProvider } from "@/theme";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ ticker: "aapl" }),
}));

describe("SignalDetailScreen", () => {
  it("renders the signal detail shell and transformed content", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getAllByText("Apple Inc.").length).toBeGreaterThan(0);
    expect(screen.getByText("Forward Guidance")).toBeOnTheScreen();
    expect(screen.getByText("Indicator Contributions")).toBeOnTheScreen();
  });
});
