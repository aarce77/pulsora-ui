import { z } from "zod";

export const watchlistTickerSchema = z.object({
  ticker: z.string(),
  added_at: z.string().datetime(),
});

export const watchlistResponseSchema = z.object({
  tickers: z.array(watchlistTickerSchema),
});

export const addWatchlistRequestSchema = z.object({
  ticker: z.string().min(1).max(10),
});

export const addWatchlistResponseSchema = z.object({
  ticker: z.string(),
  added_at: z.string().datetime(),
  backfill: z.record(z.string(), z.unknown()),
  model_b: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type WatchlistResponse = z.infer<typeof watchlistResponseSchema>;
