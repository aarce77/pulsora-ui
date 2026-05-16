import { ScrollView, View } from "react-native";

import { FilterChip } from "@/features/watchlist/components/filter-chip";
import { useTheme } from "@/theme";

type WatchlistFiltersProps = {
  filters: string[];
  selectedFilter: string;
};

export function WatchlistFilters({
  filters,
  selectedFilter,
}: WatchlistFiltersProps) {
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
