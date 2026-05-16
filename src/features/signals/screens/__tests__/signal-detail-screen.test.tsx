import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";

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
  beforeEach(() => {
    mockPush.mockClear();
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

  it("navigates back to the signals tab from the header", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalDetailScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    fireEvent.press(screen.getByLabelText("Back to Signals"));

    expect(mockPush).toHaveBeenCalledWith("/signals");
  });
});
