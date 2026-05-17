import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { Share } from "react-native";

import { SignalDetailScreen } from "@/features/signals/screens/signal-detail-screen";
import { ThemeProvider } from "@/theme";

const mockPush = jest.fn();
const mockUseLocalSearchParams = jest.fn(() => ({ ticker: "nvda" }));

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => mockUseLocalSearchParams(),
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SignalDetailScreen", () => {
  const shareSpy = jest.spyOn(Share, "share").mockResolvedValue({
    action: "sharedAction",
    activityType: undefined,
  });

  beforeEach(() => {
    mockPush.mockClear();
    shareSpy.mockClear();
    mockUseLocalSearchParams.mockReturnValue({ ticker: "nvda" });
  });

  it("renders the signal detail shell and selected ticker metadata", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getAllByText("NVIDIA Corp.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("NVDA").length).toBeGreaterThan(0);
    expect(screen.getByText("Forward Guidance")).toBeOnTheScreen();
    expect(screen.getByText("Indicator Contributions")).toBeOnTheScreen();
  });

  it("renders the selected non-AAPL ticker instead of falling back to AAPL", () => {
    mockUseLocalSearchParams.mockReturnValue({ ticker: "msft" });
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getAllByText("MSFT").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Microsoft Corp.").length).toBeGreaterThan(0);
    expect(screen.queryByText("Apple Inc.")).not.toBeOnTheScreen();
  });

  it("renders added-search tickers with a company fallback instead of AAPL metadata", () => {
    mockUseLocalSearchParams.mockReturnValue({ ticker: "googl" });
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getAllByText("GOOGL").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Alphabet Inc.").length).toBeGreaterThan(0);
    expect(screen.queryByText("Apple Inc.")).not.toBeOnTheScreen();
  });

  it("updates the selected timeframe and chart label locally", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByLabelText("NVDA 1M trend chart")).toBeOnTheScreen();

    fireEvent.press(screen.getByLabelText("Select 1W timeframe"));

    expect(screen.getByLabelText("NVDA 1W trend chart")).toBeOnTheScreen();
  });

  it("toggles the saved state from the bookmark action", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Save NVDA signal detail"));

    expect(screen.getByText("Saved to Home")).toBeOnTheScreen();
    expect(screen.getByLabelText("Remove saved NVDA signal detail")).toBeOnTheScreen();
  });

  it("shares the current ticker detail from the header action", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Share NVDA signal detail"));

    await waitFor(() =>
      expect(shareSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining("NVDA"),
          title: "NVDA signal detail",
        }),
      ),
    );
  });

  it("navigates back to the home tab from the header", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Back to Home"));

    expect(mockPush).toHaveBeenCalledWith("/home");
  });
});
