import { ScrollView, View } from "react-native";

import { FilterChip } from "@/features/watchlist/components/filter-chip";
import { useTheme } from "@/theme";

type SignalsFiltersProps = {
  filters: string[];
  selectedFilter: string;
};

export function SignalsFilters({
  filters,
  selectedFilter,
}: SignalsFiltersProps) {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: theme.spacing.sm }}
    >
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            selected={filter === selectedFilter}
          />
        ))}
      </View>
    </ScrollView>
  );
}
