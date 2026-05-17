import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { WatchlistScreen } from "@/features/watchlist/screens/watchlist-screen";
import { ThemeProvider } from "@/theme";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("WatchlistScreen", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the watchlist-first home shell without asset tabs", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Watchlist")).toBeOnTheScreen();
    expect(screen.getByText("Market Pulse")).toBeOnTheScreen();
    expect(screen.getByText("AI Summary")).toBeOnTheScreen();
    expect(screen.getByText("AAPL")).toBeOnTheScreen();
    expect(screen.getByText("Microsoft Corp.")).toBeOnTheScreen();
    expect(screen.queryByText("Stocks")).not.toBeOnTheScreen();
    expect(screen.queryByText("ETFs")).not.toBeOnTheScreen();
    expect(screen.queryByText("Crypto")).not.toBeOnTheScreen();
  });

  it("navigates to the selected ticker detail from a watchlist row", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Open NVDA signal detail"));

    expect(mockPush).toHaveBeenCalledWith("/home/NVDA");
  });
});
