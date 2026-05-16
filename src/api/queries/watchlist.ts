import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { marketService } from "@/api/services/market-service";

const watchlistKey = ["watchlist"] as const;

export function useWatchlistQuery() {
  return useQuery({
    queryKey: watchlistKey,
    queryFn: () => marketService.getWatchlist(),
  });
}

export function useAddWatchlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marketService.addWatchlistTicker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: watchlistKey });
    },
  });
}
