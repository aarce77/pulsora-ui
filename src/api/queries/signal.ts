import { useQuery } from "@tanstack/react-query";

import { marketService } from "@/api/services/market-service";

export function useSignalQuery(ticker: string, interval = "1d") {
  return useQuery({
    queryKey: ["signal", ticker, interval],
    queryFn: () => marketService.getSignal(ticker, interval),
    enabled: Boolean(ticker),
  });
}

export function useSentimentQuery(ticker: string, limit = 20) {
  return useQuery({
    queryKey: ["sentiment", ticker, limit],
    queryFn: () => marketService.getSentiment(ticker, limit),
    enabled: Boolean(ticker),
  });
}
