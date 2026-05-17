import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { appStorage } from "@/store/storage";
import { WatchlistGrid } from "@/features/watchlist/components/watchlist-grid";
import { HOME_STORE_STORAGE_KEY, useHomeStore } from "@/features/watchlist/store/home-store";
import { ThemeProvider } from "@/theme";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("WatchlistGrid", () => {
  beforeEach(() => {
    appStorage.removeItem(HOME_STORE_STORAGE_KEY);
    useHomeStore.getState().resetState();
  });

  it("renders the no-watchlist-items empty state when the local list is empty", () => {
    const queryClient = new QueryClient();
    useHomeStore.getState().resetState([]);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistGrid />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("No watchlist items yet")).toBeOnTheScreen();
  });

  it("opens the add-stock modal from the empty-state CTA", () => {
    const queryClient = new QueryClient();
    useHomeStore.getState().resetState([]);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistGrid />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Open add stock"));

    expect(screen.getByText("Add Stock")).toBeOnTheScreen();
  });

  it("filters ticker-search results inside the add-stock modal", () => {
    const queryClient = new QueryClient();
    useHomeStore.getState().resetState([]);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistGrid />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Open add stock"));
    fireEvent.changeText(screen.getByLabelText("Search ticker catalog"), "broad");

    expect(screen.getByText("Broadcom Inc.")).toBeOnTheScreen();
    expect(screen.queryByText("Alphabet Inc.")).not.toBeOnTheScreen();
  });
});
