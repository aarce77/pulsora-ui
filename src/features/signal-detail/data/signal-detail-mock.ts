import { signalResponseSchema, type SignalResponse } from "@/api/contracts/signal";

export const signalDetailMock: SignalResponse = signalResponseSchema.parse({
  ticker: "AAPL",
  timestamp: "2026-05-16T14:30:00Z",
  interval: "1d",
  signal: "BUY",
  composite_score: 0.73,
  confidence: {
    score: 78,
    tier: "high",
  },
  regime: {
    state: "bull_trend",
    profile: "trend",
    thresholds: {
      bullish: 0.6,
      bearish: 0.35,
    },
  },
  xgb_probability: {
    direction: "up",
    probability: 0.72,
    expected_return_5d: 0.0281,
  },
  indicators: {
    rsi: {
      value: 58.1,
      score: 0.42,
      weight: 0.2,
      contribution: 0.084,
    },
    macd: {
      value: 1.62,
      score: 0.38,
      weight: 0.16,
      contribution: 0.0608,
    },
    volume: {
      value: 1.18,
      score: 0.3,
      weight: 0.14,
      contribution: 0.042,
    },
    trend: {
      value: 0.86,
      score: 0.51,
      weight: 0.22,
      contribution: 0.1122,
    },
  },
  sentiment: {
    market: {
      score: 0.12,
      weight: 0.15,
    },
    industry: {
      score: 0.18,
      weight: 0.1,
    },
    competitor: {
      score: 0.07,
      weight: 0.05,
    },
  },
  risk_flags: ["high_valuation", "macro_event_risk"],
  explanation: {
    bullish_drivers: [
      "Strong earnings beat",
      "Revenue growth YoY remains durable",
      "Positive analyst revisions",
      "Institutional accumulation",
    ],
    bearish_drivers: [
      "Premium valuation",
      "Macro event sensitivity",
      "Sector multiple compression risk",
    ],
    forward_guidance:
      "Bullish bias remains intact while momentum and breadth stay constructive. Watch valuation and macro volatility into the next catalyst window.",
  },
});

export const signalDetailMeta = {
  company: "Apple Inc.",
  confidenceLabel: "High confidence",
  stats: [
    { label: "Trend strength", value: "Bullish", tone: "positive" as const },
    { label: "Momentum", value: "Strong", tone: "positive" as const },
    { label: "Volatility", value: "Low", tone: "positive" as const },
    { label: "Volume", value: "High", tone: "positive" as const },
    { label: "Sentiment", value: "Positive", tone: "positive" as const },
  ],
  timeframe: ["1D", "1W", "1M", "3M", "1Y"],
  selectedTimeframe: "1M",
  chart: [
    { label: "W1", value: 24 },
    { label: "W2", value: 27 },
    { label: "W3", value: 31 },
    { label: "W4", value: 29 },
    { label: "W5", value: 34 },
    { label: "W6", value: 36 },
    { label: "W7", value: 39 },
    { label: "W8", value: 43 },
  ],
  updatedAt: "Updated 2m ago",
};
