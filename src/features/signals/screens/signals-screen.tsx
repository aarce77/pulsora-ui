import { Screen } from "@/components/ui/screen";
import { SignalsGrid } from "@/features/signals/components/signals-grid";

export function SignalsScreen() {
  return (
    <Screen contentContainerStyle={{ paddingBottom: 140 }}>
      <SignalsGrid />
    </Screen>
  );
}
