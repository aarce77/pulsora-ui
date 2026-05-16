import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react-native";

import { SignalsScreen } from "@/features/signals/screens/signals-screen";
import { ThemeProvider } from "@/theme";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("SignalsScreen", () => {
  it("renders the signals shell and mock rows", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SignalsScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Signals")).toBeOnTheScreen();
    expect(screen.getByText("AAPL")).toBeOnTheScreen();
    expect(screen.getByText("NVIDIA Corp.")).toBeOnTheScreen();
  });
});
