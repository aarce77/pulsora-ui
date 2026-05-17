import { Screen } from "@/components/ui/screen";
import { IntelligenceGrid } from "@/features/intelligence/components/intelligence-grid";

export function IntelligenceScreen() {
  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      <IntelligenceGrid />
    </Screen>
  );
}
