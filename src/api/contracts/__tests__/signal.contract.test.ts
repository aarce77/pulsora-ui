import { signalResponseSchema } from "@/api/contracts/signal";

describe("signalResponseSchema", () => {
  it("accepts a valid Markov Trader signal payload", () => {
    const parsed = signalResponseSchema.parse({
      ticker: "AAPL",
      timestamp: "2026-05-15T14:30:00Z",
      interval: "1d",
      signal: "BUY",
      composite_score: 0.73,
      confidence: { score: 78, tier: "high" },
      regime: {
        state: "bull_trend",
        profile: "trend",
        thresholds: { bullish: 0.6 },
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
      },
      sentiment: {
        market: {
          score: 0.12,
          weight: 0.15,
        },
      },
      risk_flags: ["high_valuation"],
      explanation: {
        bullish_drivers: ["Strong earnings beat"],
        bearish_drivers: ["High valuation"],
        forward_guidance: "Bullish bias with moderate risk.",
      },
    });

    expect(parsed.ticker).toBe("AAPL");
    expect(parsed.confidence.score).toBe(78);
  });

  it("rejects an invalid timestamp", () => {
    expect(() =>
      signalResponseSchema.parse({
        ticker: "AAPL",
        timestamp: "not-a-date",
        interval: "1d",
        signal: "BUY",
        composite_score: 0.73,
        confidence: { score: 78, tier: "high" },
        regime: { state: "bull", profile: "trend", thresholds: {} },
        indicators: {},
        sentiment: {},
        risk_flags: [],
        explanation: { bullish_drivers: [], bearish_drivers: [] },
      }),
    ).toThrow();
  });
});
