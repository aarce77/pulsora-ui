import { apiClient } from "@/api/client";
import { sentimentResponseSchema } from "@/api/contracts/sentiment";
import { signalResponseSchema } from "@/api/contracts/signal";
import {
  addWatchlistRequestSchema,
  addWatchlistResponseSchema,
  watchlistResponseSchema,
} from "@/api/contracts/watchlist";
import { endpoints } from "@/api/endpoints";

export const marketService = {
  async getWatchlist() {
    const response = await apiClient.get(endpoints.watchlist);
    return watchlistResponseSchema.parse(response.data);
  },
  async addWatchlistTicker(ticker: string) {
    const response = await apiClient.post(
      endpoints.watchlist,
      addWatchlistRequestSchema.parse({ ticker: ticker.toUpperCase() }),
    );
    return addWatchlistResponseSchema.parse(response.data);
  },
  async getSignal(ticker: string, interval = "1d") {
    const response = await apiClient.get(endpoints.signal(ticker.toUpperCase()), {
      params: { interval },
    });
    return signalResponseSchema.parse(response.data);
  },
  async getSentiment(ticker: string, limit = 20) {
    const response = await apiClient.get(endpoints.sentiment(ticker.toUpperCase()), {
      params: { limit },
    });
    return sentimentResponseSchema.parse(response.data);
  },
};
