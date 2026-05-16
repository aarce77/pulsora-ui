import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react-native";

import { WatchlistScreen } from "@/features/watchlist/screens/watchlist-screen";
import { ThemeProvider } from "@/theme";

describe("WatchlistScreen", () => {
  it("renders the watchlist shell and stock rows", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Watchlist")).toBeOnTheScreen();
    expect(screen.getByText("AAPL")).toBeOnTheScreen();
    expect(screen.getByText("Microsoft Corp.")).toBeOnTheScreen();
  });
});
