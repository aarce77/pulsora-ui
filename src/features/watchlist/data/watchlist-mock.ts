import { z } from "zod";

const performancePointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

const watchlistItemSchema = z.object({
  ticker: z.string(),
  company: z.string(),
  signal: z.enum(["BUY", "HOLD", "SELL"]),
  confidenceLabel: z.string(),
  price: z.string(),
  change: z.string(),
  changeDirection: z.enum(["up", "down", "neutral"]),
  score: z.number().int().min(0).max(100),
});

const watchlistMockSchema = z.object({
  title: z.string(),
  searchPlaceholder: z.string(),
  aiSummary: z.object({
    title: z.string(),
    body: z.string(),
  }),
  marketPulse: z.object({
    title: z.string(),
    status: z.string(),
    summary: z.string(),
    points: z.array(performancePointSchema),
  }),
  updatedAt: z.string(),
  items: z.array(watchlistItemSchema),
});

export type WatchlistMock = z.infer<typeof watchlistMockSchema>;

export const watchlistMock: WatchlistMock = watchlistMockSchema.parse({
  title: "Watchlist",
  searchPlaceholder: "Search stocks...",
  aiSummary: {
    title: "AI Summary",
    body:
      "Markets are showing moderate strength with technology and large caps leading. Stay alert for volatility ahead of key economic events.",
  },
  marketPulse: {
    title: "Market Pulse",
    status: "Live",
    summary: "Markets are open\nCloses in 04:32:18",
    points: [
      { label: "09:30", value: 18 },
      { label: "10:00", value: 24 },
      { label: "11:00", value: 27 },
      { label: "12:00", value: 30 },
      { label: "13:00", value: 34 },
      { label: "14:00", value: 38 },
      { label: "15:00", value: 41 },
      { label: "16:00", value: 43 },
    ],
  },
  updatedAt: "Last updated: 2m ago",
  items: [
    {
      ticker: "AAPL",
      company: "Apple Inc.",
      signal: "BUY",
      confidenceLabel: "High confidence",
      price: "175.32",
      change: "+1.52%",
      changeDirection: "up",
      score: 78,
    },
    {
      ticker: "MSFT",
      company: "Microsoft Corp.",
      signal: "BUY",
      confidenceLabel: "High confidence",
      price: "338.11",
      change: "+0.89%",
      changeDirection: "up",
      score: 72,
    },
    {
      ticker: "NVDA",
      company: "NVIDIA Corp.",
      signal: "BUY",
      confidenceLabel: "Very strong",
      price: "875.28",
      change: "+2.13%",
      changeDirection: "up",
      score: 82,
    },
    {
      ticker: "TSLA",
      company: "Tesla, Inc.",
      signal: "HOLD",
      confidenceLabel: "Neutral bias",
      price: "248.71",
      change: "-0.41%",
      changeDirection: "down",
      score: 45,
    },
    {
      ticker: "AMZN",
      company: "Amazon.com Inc.",
      signal: "BUY",
      confidenceLabel: "Constructive",
      price: "186.50",
      change: "+1.10%",
      changeDirection: "up",
      score: 68,
    },
    {
      ticker: "META",
      company: "Meta Platforms",
      signal: "BUY",
      confidenceLabel: "High confidence",
      price: "512.74",
      change: "+0.76%",
      changeDirection: "up",
      score: 71,
    },
  ],
});
