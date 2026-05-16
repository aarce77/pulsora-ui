import { Screen } from "@/components/ui/screen";
import { DashboardGrid } from "@/features/dashboard/components/dashboard-grid";

export function DashboardScreen() {
  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      <DashboardGrid />
    </Screen>
  );
}
