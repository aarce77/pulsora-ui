import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { WatchlistScreen } from "@/features/watchlist/screens/watchlist-screen";
import { appStorage } from "@/store/storage";
import { HOME_STORE_STORAGE_KEY, useHomeStore } from "@/features/watchlist/store/home-store";
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
    appStorage.removeItem(HOME_STORE_STORAGE_KEY);
    useHomeStore.getState().resetState();
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

  it("filters watchlist rows from the local search input", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.changeText(screen.getByLabelText("Search stocks"), "nvidia");

    expect(screen.getByText("NVIDIA Corp.")).toBeOnTheScreen();
    expect(screen.queryByText("Apple Inc.")).not.toBeOnTheScreen();
  });

  it("shows a no-results empty state when the search query has no matches", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.changeText(screen.getByLabelText("Search stocks"), "zzz");

    expect(screen.getByText("No matching stocks")).toBeOnTheScreen();
  });

  it("opens the add-stock modal and appends a searched stock to the watchlist", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Add stock"));
    fireEvent.changeText(screen.getByLabelText("Search ticker catalog"), "alph");
    fireEvent.press(screen.getByLabelText("Add GOOGL to watchlist"));

    expect(screen.getByText("Alphabet Inc.")).toBeOnTheScreen();
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
