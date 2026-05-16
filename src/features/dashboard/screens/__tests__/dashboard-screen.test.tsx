import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react-native";

import { DashboardScreen } from "@/features/dashboard/screens/dashboard-screen";
import { ThemeProvider } from "@/theme";

describe("DashboardScreen", () => {
  it("renders the phase 1 foundation copy", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DashboardScreen />
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Pulsora foundation")).toBeOnTheScreen();
    expect(screen.getByText(/API Base URL/i)).toBeOnTheScreen();
  });
});
