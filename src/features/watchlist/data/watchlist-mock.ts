import { z } from "zod";

const watchlistItemSchema = z.object({
  ticker: z.string(),
  company: z.string(),
  price: z.string(),
  change: z.string(),
  changeDirection: z.enum(["up", "down", "neutral"]),
  score: z.number().int().min(0).max(100),
  assetType: z.enum(["Stocks", "ETFs", "Crypto"]),
});

const watchlistMockSchema = z.object({
  title: z.string(),
  filters: z.array(z.string()),
  selectedFilter: z.string(),
  searchPlaceholder: z.string(),
  items: z.array(watchlistItemSchema),
});

export type WatchlistMock = z.infer<typeof watchlistMockSchema>;

export const watchlistMock: WatchlistMock = watchlistMockSchema.parse({
  title: "Watchlist",
  filters: ["All", "Stocks", "ETFs", "Crypto"],
  selectedFilter: "Stocks",
  searchPlaceholder: "Search symbols or companies...",
  items: [
    {
      ticker: "AAPL",
      company: "Apple Inc.",
      price: "175.32",
      change: "+1.52%",
      changeDirection: "up",
      score: 78,
      assetType: "Stocks",
    },
    {
      ticker: "MSFT",
      company: "Microsoft Corp.",
      price: "338.11",
      change: "+0.89%",
      changeDirection: "up",
      score: 72,
      assetType: "Stocks",
    },
    {
      ticker: "NVDA",
      company: "NVIDIA Corp.",
      price: "875.28",
      change: "+2.13%",
      changeDirection: "up",
      score: 82,
      assetType: "Stocks",
    },
    {
      ticker: "TSLA",
      company: "Tesla, Inc.",
      price: "248.71",
      change: "-0.41%",
      changeDirection: "down",
      score: 45,
      assetType: "Stocks",
    },
    {
      ticker: "AMZN",
      company: "Amazon.com Inc.",
      price: "186.50",
      change: "+1.10%",
      changeDirection: "up",
      score: 68,
      assetType: "Stocks",
    },
    {
      ticker: "META",
      company: "Meta Platforms",
      price: "512.74",
      change: "+0.76%",
      changeDirection: "up",
      score: 71,
      assetType: "Stocks",
    },
    {
      ticker: "QQQ",
      company: "Invesco QQQ Trust",
      price: "456.22",
      change: "+0.66%",
      changeDirection: "up",
      score: 74,
      assetType: "ETFs",
    },
    {
      ticker: "SPY",
      company: "SPDR S&P 500 ETF",
      price: "527.84",
      change: "+0.86%",
      changeDirection: "up",
      score: 76,
      assetType: "ETFs",
    },
    {
      ticker: "BTC",
      company: "Bitcoin",
      price: "64,820.00",
      change: "+1.94%",
      changeDirection: "up",
      score: 69,
      assetType: "Crypto",
    },
  ],
});
