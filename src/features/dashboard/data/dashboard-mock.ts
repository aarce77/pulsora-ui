import { z } from "zod";

const performancePointSchema = z.object({
  label: z.string(),
  value: z.number(),
});

const marketIndexSchema = z.object({
  name: z.string(),
  value: z.string(),
  change: z.string(),
  direction: z.enum(["up", "down", "neutral"]),
  points: z.array(performancePointSchema),
});

const trendStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  tone: z.enum(["positive", "negative", "neutral"]),
});

const signalSummarySchema = z.object({
  ticker: z.string(),
  company: z.string(),
  signal: z.enum(["BUY", "HOLD", "SELL"]),
  confidenceScore: z.number().int().min(0).max(100),
  confidenceLabel: z.string(),
  stats: z.array(trendStatSchema),
  timeframe: z.array(z.string()),
  selectedTimeframe: z.string(),
  chart: z.array(performancePointSchema),
});

const detailRowSchema = z.object({
  label: z.string(),
  value: z.string(),
  tone: z.enum(["positive", "negative", "warning", "neutral"]),
});

const signalDetailSchema = z.object({
  tabs: z.array(z.string()),
  activeTab: z.string(),
  rows: z.array(detailRowSchema),
  cta: z.string(),
});

const driverSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const driversCardSchema = z.object({
  positive: z.array(driverSchema),
  negative: z.array(driverSchema),
});

const probabilitySchema = z.object({
  label: z.string(),
  value: z.number(),
  tone: z.enum(["positive", "warning", "negative"]),
});

const regimeCardSchema = z.object({
  currentRegime: z.string(),
  outlook: z.string(),
  probability: z.string(),
  since: z.string(),
  probabilities: z.array(probabilitySchema),
  forwardView: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

const marketPulseSchema = z.object({
  title: z.string(),
  status: z.string(),
  summary: z.string(),
  points: z.array(performancePointSchema),
});

const dashboardMockSchema = z.object({
  greeting: z.string(),
  indices: z.array(marketIndexSchema),
  signalSummary: signalSummarySchema,
  signalDetails: signalDetailSchema,
  drivers: driversCardSchema,
  regime: regimeCardSchema,
  marketPulse: marketPulseSchema,
});

export type DashboardMock = z.infer<typeof dashboardMockSchema>;

export const dashboardMock: DashboardMock = dashboardMockSchema.parse({
  greeting: "Pulsora dashboard",
  indices: [
    {
      name: "S&P 500",
      value: "5,278.40",
      change: "+0.86%",
      direction: "up",
      points: [
        { label: "09:30", value: 28 },
        { label: "10:30", value: 31 },
        { label: "11:30", value: 34 },
        { label: "12:30", value: 33 },
        { label: "13:30", value: 37 },
        { label: "14:30", value: 41 },
        { label: "15:30", value: 40 },
        { label: "16:00", value: 44 },
      ],
    },
    {
      name: "NASDAQ",
      value: "16,735.02",
      change: "+1.20%",
      direction: "up",
      points: [
        { label: "09:30", value: 24 },
        { label: "10:30", value: 29 },
        { label: "11:30", value: 30 },
        { label: "12:30", value: 36 },
        { label: "13:30", value: 34 },
        { label: "14:30", value: 38 },
        { label: "15:30", value: 41 },
        { label: "16:00", value: 45 },
      ],
    },
    {
      name: "Dow Jones",
      value: "38,852.86",
      change: "+0.38%",
      direction: "up",
      points: [
        { label: "09:30", value: 26 },
        { label: "10:30", value: 27 },
        { label: "11:30", value: 28 },
        { label: "12:30", value: 30 },
        { label: "13:30", value: 29 },
        { label: "14:30", value: 33 },
        { label: "15:30", value: 35 },
        { label: "16:00", value: 37 },
      ],
    },
    {
      name: "VIX",
      value: "14.82",
      change: "-3.45%",
      direction: "down",
      points: [
        { label: "09:30", value: 41 },
        { label: "10:30", value: 39 },
        { label: "11:30", value: 35 },
        { label: "12:30", value: 37 },
        { label: "13:30", value: 32 },
        { label: "14:30", value: 29 },
        { label: "15:30", value: 31 },
        { label: "16:00", value: 26 },
      ],
    },
  ],
  signalSummary: {
    ticker: "AAPL",
    company: "Apple Inc.",
    signal: "BUY",
    confidenceScore: 78,
    confidenceLabel: "High confidence",
    stats: [
      { label: "Trend strength", value: "Bullish", tone: "positive" },
      { label: "Momentum", value: "Strong", tone: "positive" },
      { label: "Volatility", value: "Low", tone: "positive" },
      { label: "Volume", value: "High", tone: "positive" },
      { label: "Sentiment", value: "Positive", tone: "positive" },
    ],
    timeframe: ["1D", "1W", "1M", "3M", "1Y"],
    selectedTimeframe: "1M",
    chart: [
      { label: "W1", value: 25 },
      { label: "W2", value: 27 },
      { label: "W3", value: 32 },
      { label: "W4", value: 30 },
      { label: "W5", value: 35 },
      { label: "W6", value: 37 },
      { label: "W7", value: 39 },
      { label: "W8", value: 44 },
    ],
  },
  signalDetails: {
    tabs: ["Summary", "Drivers", "Technical", "News"],
    activeTab: "Summary",
    rows: [
      { label: "Signal", value: "BUY", tone: "positive" },
      { label: "Confidence score", value: "78 / 100", tone: "neutral" },
      { label: "Confidence trend", value: "Rising", tone: "positive" },
      { label: "Expected move (14d)", value: "+2.81%", tone: "positive" },
      { label: "Risk level", value: "Moderate", tone: "warning" },
      { label: "Reward / risk", value: "2.4 : 1", tone: "neutral" },
      { label: "AI model", value: "Pulsora AI v2.1", tone: "neutral" },
    ],
    cta: "View full analysis",
  },
  drivers: {
    positive: [
      { label: "Strong earnings beat", value: "+0.18" },
      { label: "Revenue growth YoY", value: "+0.16" },
      { label: "Analyst upgrades", value: "+0.12" },
      { label: "Positive sentiment", value: "+0.10" },
      { label: "High institutional buying", value: "+0.08" },
    ],
    negative: [
      { label: "Market volatility", value: "-0.10" },
      { label: "High valuation", value: "-0.08" },
      { label: "Sector risk", value: "-0.05" },
    ],
  },
  regime: {
    currentRegime: "Bull trend",
    outlook: "Bullish",
    probability: "72%",
    since: "Apr 6, 2026",
    probabilities: [
      { label: "Bull trend", value: 72, tone: "positive" },
      { label: "Sideways", value: 18, tone: "warning" },
      { label: "Bear trend", value: 10, tone: "negative" },
    ],
    forwardView: {
      title: "Bullish",
      subtitle: "High conviction",
    },
  },
  marketPulse: {
    title: "Market Pulse",
    status: "Live",
    summary: "Markets are open. Breadth is constructive and large-cap leadership remains intact.",
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
});
