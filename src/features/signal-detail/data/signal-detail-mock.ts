import { signalResponseSchema, type SignalResponse } from "@/api/contracts/signal";
import { signalsMock } from "@/features/signals/data/signals-mock";
import { watchlistMock } from "@/features/watchlist/data/watchlist-mock";

type TimeframeKey = "1D" | "1W" | "1M" | "3M" | "1Y";

type SignalDetailMeta = {
  company: string;
  confidenceLabel: string;
  stats: {
    label: string;
    value: string;
    tone: "positive" | "negative" | "neutral";
  }[];
  timeframe: TimeframeKey[];
  selectedTimeframe: TimeframeKey;
  chartSeries: Record<TimeframeKey, { label: string; value: number }[]>;
  updatedAt: string;
};

type SignalDetailScenario = {
  signal: SignalResponse;
  meta: SignalDetailMeta;
};

type ScenarioConfig = {
  ticker: string;
  company: string;
  signal: "BUY" | "HOLD" | "SELL";
  confidenceScore: number;
  confidenceLabel: string;
  updatedAt: string;
  regimeState: "bull_trend" | "sideways" | "bear_trend";
  regimeProfile: "trend" | "range";
  probability: number;
  expectedReturn5d: number;
  riskFlags: string[];
  bullishDrivers: string[];
  bearishDrivers: string[];
  forwardGuidance: string;
  charts: Record<TimeframeKey, number[]>;
  sentiment: {
    market: number;
    industry: number;
    competitor: number;
  };
  indicators: {
    rsi: { value: number; score: number };
    macd: { value: number; score: number };
    volume: { value: number; score: number };
    trend: { value: number; score: number };
  };
  stats?: SignalDetailMeta["stats"];
  selectedTimeframe?: TimeframeKey;
  thresholds?: {
    bullish: number;
    bearish: number;
  };
};

const defaultTimeframes: TimeframeKey[] = ["1D", "1W", "1M", "3M", "1Y"];

const chartLabels: Record<TimeframeKey, string[]> = {
  "1D": ["09:30", "10:30", "11:30", "12:30", "13:30", "15:30"],
  "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Next"],
  "1M": ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  "3M": ["M1", "M2", "M3", "M4", "M5", "M6"],
  "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
};

const defaultStatsBySignal: Record<ScenarioConfig["signal"], SignalDetailMeta["stats"]> = {
  BUY: [
    { label: "Trend strength", value: "Bullish", tone: "positive" },
    { label: "Momentum", value: "Strong", tone: "positive" },
    { label: "Volatility", value: "Low", tone: "positive" },
    { label: "Volume", value: "High", tone: "positive" },
    { label: "Sentiment", value: "Positive", tone: "positive" },
  ],
  HOLD: [
    { label: "Trend strength", value: "Balanced", tone: "neutral" },
    { label: "Momentum", value: "Mixed", tone: "neutral" },
    { label: "Volatility", value: "Elevated", tone: "negative" },
    { label: "Volume", value: "Average", tone: "neutral" },
    { label: "Sentiment", value: "Cautious", tone: "neutral" },
  ],
  SELL: [
    { label: "Trend strength", value: "Weakening", tone: "negative" },
    { label: "Momentum", value: "Negative", tone: "negative" },
    { label: "Volatility", value: "High", tone: "negative" },
    { label: "Volume", value: "Heavy", tone: "negative" },
    { label: "Sentiment", value: "Risk-off", tone: "negative" },
  ],
};

const indicatorWeights = {
  rsi: 0.2,
  macd: 0.16,
  volume: 0.14,
  trend: 0.22,
} as const;

function toConfidenceTier(score: number) {
  if (score >= 75) {
    return "high";
  }

  if (score >= 60) {
    return "medium";
  }

  return "low";
}

function toChartPoints(timeframe: TimeframeKey, values: number[]) {
  const timeframeLabels = chartLabels[timeframe];

  return values.map((value, index) => ({
    label: timeframeLabels[index] ?? `${timeframe}-${index + 1}`,
    value,
  }));
}

function buildChartSeries(charts: ScenarioConfig["charts"]) {
  return defaultTimeframes.reduce(
    (series, timeframe) => ({
      ...series,
      [timeframe]: toChartPoints(timeframe, charts[timeframe]),
    }),
    {} as Record<TimeframeKey, { label: string; value: number }[]>,
  );
}

function buildScenario(config: ScenarioConfig): SignalDetailScenario {
  const thresholds = config.thresholds ?? {
    bullish: 0.6,
    bearish: 0.35,
  };

  return {
    signal: signalResponseSchema.parse({
      ticker: config.ticker,
      timestamp: "2026-05-16T14:35:00Z",
      interval: "1d",
      signal: config.signal,
      composite_score: Number((config.confidenceScore / 100).toFixed(2)),
      confidence: {
        score: config.confidenceScore,
        tier: toConfidenceTier(config.confidenceScore),
      },
      regime: {
        state: config.regimeState,
        profile: config.regimeProfile,
        thresholds,
      },
      xgb_probability: {
        direction:
          config.signal === "SELL"
            ? "down"
            : config.signal === "HOLD"
              ? "flat"
              : "up",
        probability: config.probability,
        expected_return_5d: config.expectedReturn5d,
      },
      indicators: {
        rsi: {
          value: config.indicators.rsi.value,
          score: config.indicators.rsi.score,
          weight: indicatorWeights.rsi,
          contribution: Number((config.indicators.rsi.score * indicatorWeights.rsi).toFixed(4)),
        },
        macd: {
          value: config.indicators.macd.value,
          score: config.indicators.macd.score,
          weight: indicatorWeights.macd,
          contribution: Number((config.indicators.macd.score * indicatorWeights.macd).toFixed(4)),
        },
        volume: {
          value: config.indicators.volume.value,
          score: config.indicators.volume.score,
          weight: indicatorWeights.volume,
          contribution: Number((config.indicators.volume.score * indicatorWeights.volume).toFixed(4)),
        },
        trend: {
          value: config.indicators.trend.value,
          score: config.indicators.trend.score,
          weight: indicatorWeights.trend,
          contribution: Number((config.indicators.trend.score * indicatorWeights.trend).toFixed(4)),
        },
      },
      sentiment: {
        market: {
          score: config.sentiment.market,
          weight: 0.15,
        },
        industry: {
          score: config.sentiment.industry,
          weight: 0.1,
        },
        competitor: {
          score: config.sentiment.competitor,
          weight: 0.05,
        },
      },
      risk_flags: config.riskFlags,
      explanation: {
        bullish_drivers: config.bullishDrivers,
        bearish_drivers: config.bearishDrivers,
        forward_guidance: config.forwardGuidance,
      },
    }),
    meta: {
      company: config.company,
      confidenceLabel: config.confidenceLabel,
      stats: config.stats ?? defaultStatsBySignal[config.signal],
      timeframe: defaultTimeframes,
      selectedTimeframe: config.selectedTimeframe ?? "1M",
      chartSeries: buildChartSeries(config.charts),
      updatedAt: config.updatedAt,
    },
  };
}

function deriveSeries(baseValues: number[], length: number, offset: number) {
  const firstValue = baseValues[0] ?? 20;
  const lastValue = baseValues[baseValues.length - 1] ?? firstValue;
  const interpolated = Array.from({ length }, (_, index) => {
    if (length === 1) {
      return firstValue + offset;
    }

    const ratio = index / (length - 1);
    const baseline = firstValue + (lastValue - firstValue) * ratio;
    const modulation = ((index % 2 === 0 ? -1 : 1) * offset) / 2;
    return Math.round((baseline + modulation) * 10) / 10;
  });

  return interpolated;
}

function buildFallbackScenario(ticker: string): SignalDetailScenario {
  const sourceSignal = signalsMock.items.find((item) => item.ticker === ticker);
  const sourceWatchlist = watchlistMock.items.find((item) => item.ticker === ticker);
  const sourceSearchResult = watchlistMock.searchResults.find((item) => item.ticker === ticker);

  const company =
    sourceSignal?.company ??
    sourceWatchlist?.company ??
    sourceSearchResult?.name ??
    `${ticker} Holdings`;

  const signal = sourceSignal?.signal ?? sourceWatchlist?.signal ?? "BUY";
  const confidenceScore = sourceSignal?.confidenceScore ?? sourceWatchlist?.score ?? 64;
  const confidenceLabel =
    sourceSignal?.confidenceLabel ?? sourceWatchlist?.confidenceLabel ?? "Constructive";
  const updatedAt = sourceSignal?.updatedAt ?? "Updated just now";
  const expectedMove =
    Number.parseFloat(sourceSignal?.expectedMove.replace("%", "") ?? "1.25") / 100;
  const baseChart =
    sourceSignal?.chart.map((point) => point.value) ??
    [22, 25, 24, 27, 30, 34];

  return buildScenario({
    ticker,
    company,
    signal,
    confidenceScore,
    confidenceLabel,
    updatedAt,
    regimeState:
      signal === "BUY" ? "bull_trend" : signal === "HOLD" ? "sideways" : "bear_trend",
    regimeProfile: signal === "HOLD" ? "range" : "trend",
    probability: signal === "BUY" ? 0.69 : signal === "HOLD" ? 0.53 : 0.34,
    expectedReturn5d: expectedMove,
    riskFlags:
      signal === "BUY"
        ? ["high_valuation", "macro_event_risk"]
        : signal === "HOLD"
          ? ["range_bound", "headline_risk"]
          : ["trend_break", "downside_momentum"],
    bullishDrivers:
      signal === "SELL"
        ? [
            "Short-covering risk can fuel relief rallies",
            "Positioning is lighter after recent weakness",
            "Oversold conditions can stabilize quickly",
          ]
        : [
            `${company} remains constructive relative to peers`,
            "Participation and flow remain supportive",
            "Trend conditions still favor follow-through",
          ],
    bearishDrivers:
      signal === "BUY"
        ? [
            "Valuation sensitivity remains elevated",
            "Macro volatility can slow upside follow-through",
            "Crowded leadership can retrace quickly",
          ]
        : [
            "Trend conviction is still mixed",
            "Follow-through has not fully confirmed",
            "Risk appetite remains fragile",
          ],
    forwardGuidance:
      signal === "BUY"
        ? `${company} remains constructive while momentum and regime support stay intact. Monitor pullbacks for confirmation rather than deterioration.`
        : signal === "HOLD"
          ? `${company} is balanced for now, with mixed conviction and a less directional backdrop. Wait for cleaner confirmation before leaning aggressively.`
          : `${company} is under pressure while momentum and regime conditions remain weak. Risk control matters until the setup stabilizes.`,
    charts: {
      "1D": deriveSeries(baseChart, 6, signal === "SELL" ? -2 : 2),
      "1W": deriveSeries(baseChart, 6, signal === "SELL" ? -1 : 1),
      "1M": deriveSeries(baseChart, 8, signal === "SELL" ? -1.5 : 1.5),
      "3M": deriveSeries(baseChart, 6, signal === "SELL" ? -0.5 : 2.5),
      "1Y": deriveSeries(baseChart, 6, signal === "SELL" ? -3 : 3),
    },
    sentiment: {
      market: signal === "BUY" ? 0.11 : signal === "HOLD" ? 0.02 : -0.09,
      industry: signal === "BUY" ? 0.17 : signal === "HOLD" ? 0.03 : -0.07,
      competitor: signal === "BUY" ? 0.06 : signal === "HOLD" ? 0.01 : -0.05,
    },
    indicators: {
      rsi: {
        value: signal === "BUY" ? 59.4 : signal === "HOLD" ? 50.2 : 42.6,
        score: signal === "BUY" ? 0.43 : signal === "HOLD" ? 0.08 : -0.26,
      },
      macd: {
        value: signal === "BUY" ? 1.48 : signal === "HOLD" ? 0.18 : -1.12,
        score: signal === "BUY" ? 0.37 : signal === "HOLD" ? 0.04 : -0.22,
      },
      volume: {
        value: signal === "BUY" ? 1.14 : signal === "HOLD" ? 1.01 : 0.94,
        score: signal === "BUY" ? 0.28 : signal === "HOLD" ? 0.03 : -0.11,
      },
      trend: {
        value: signal === "BUY" ? 0.84 : signal === "HOLD" ? 0.12 : -0.46,
        score: signal === "BUY" ? 0.49 : signal === "HOLD" ? 0.06 : -0.31,
      },
    },
  });
}

const signalDetailScenarios: Record<string, SignalDetailScenario> = {
  AAPL: buildScenario({
    ticker: "AAPL",
    company: "Apple Inc.",
    signal: "BUY",
    confidenceScore: 78,
    confidenceLabel: "High confidence",
    updatedAt: "Updated 2m ago",
    regimeState: "bull_trend",
    regimeProfile: "trend",
    probability: 0.72,
    expectedReturn5d: 0.0281,
    riskFlags: ["high_valuation", "macro_event_risk"],
    bullishDrivers: [
      "Strong earnings beat",
      "Revenue growth YoY remains durable",
      "Positive analyst revisions",
      "Institutional accumulation",
    ],
    bearishDrivers: [
      "Premium valuation",
      "Macro event sensitivity",
      "Sector multiple compression risk",
    ],
    forwardGuidance:
      "Bullish bias remains intact while momentum and breadth stay constructive. Watch valuation and macro volatility into the next catalyst window.",
    charts: {
      "1D": [166, 168, 171, 170, 173, 175],
      "1W": [160, 162, 161, 165, 169, 175],
      "1M": [151, 154, 159, 157, 164, 168, 172, 175],
      "3M": [142, 147, 151, 156, 167, 175],
      "1Y": [128, 136, 145, 154, 166, 175],
    },
    sentiment: {
      market: 0.12,
      industry: 0.18,
      competitor: 0.07,
    },
    indicators: {
      rsi: { value: 58.1, score: 0.42 },
      macd: { value: 1.62, score: 0.38 },
      volume: { value: 1.18, score: 0.3 },
      trend: { value: 0.86, score: 0.51 },
    },
  }),
  MSFT: buildScenario({
    ticker: "MSFT",
    company: "Microsoft Corp.",
    signal: "BUY",
    confidenceScore: 74,
    confidenceLabel: "High confidence",
    updatedAt: "Updated 4m ago",
    regimeState: "bull_trend",
    regimeProfile: "trend",
    probability: 0.69,
    expectedReturn5d: 0.0214,
    riskFlags: ["cloud_spending_sensitivity", "macro_event_risk"],
    bullishDrivers: [
      "Enterprise cloud demand remains durable",
      "Margin profile is holding up well",
      "AI monetization narrative keeps improving",
      "Estimate revisions remain supportive",
    ],
    bearishDrivers: [
      "Large-cap leadership is crowded",
      "Capex pacing can pressure sentiment",
      "Macro rotation can slow upside follow-through",
    ],
    forwardGuidance:
      "Constructive bias remains intact while enterprise demand and margin resilience stay supportive. Watch rotation risk if leadership narrows further.",
    charts: {
      "1D": [332, 334, 337, 336, 339, 341],
      "1W": [326, 329, 331, 330, 334, 338],
      "1M": [312, 318, 323, 321, 328, 332, 336, 338],
      "3M": [301, 307, 314, 321, 330, 338],
      "1Y": [278, 286, 295, 309, 323, 338],
    },
    sentiment: {
      market: 0.11,
      industry: 0.16,
      competitor: 0.05,
    },
    indicators: {
      rsi: { value: 57.3, score: 0.38 },
      macd: { value: 1.24, score: 0.34 },
      volume: { value: 1.09, score: 0.22 },
      trend: { value: 0.79, score: 0.46 },
    },
  }),
  NVDA: buildScenario({
    ticker: "NVDA",
    company: "NVIDIA Corp.",
    signal: "BUY",
    confidenceScore: 82,
    confidenceLabel: "Very strong",
    updatedAt: "Updated 1m ago",
    regimeState: "bull_trend",
    regimeProfile: "trend",
    probability: 0.78,
    expectedReturn5d: 0.0342,
    riskFlags: ["high_valuation", "gap_risk"],
    bullishDrivers: [
      "AI infrastructure demand remains elevated",
      "Estimate revisions continue to move higher",
      "Leadership relative strength remains intact",
      "Institutional flows are supportive",
    ],
    bearishDrivers: [
      "Valuation remains extended",
      "Semiconductor cyclicality can reprice quickly",
      "Macro volatility can pressure multiples",
    ],
    forwardGuidance:
      "Bullish bias remains intact while AI demand and price leadership stay supportive. Watch valuation sensitivity if broader risk appetite weakens.",
    charts: {
      "1D": [861, 868, 872, 870, 876, 882],
      "1W": [836, 842, 854, 849, 863, 875],
      "1M": [792, 806, 822, 817, 839, 852, 867, 882],
      "3M": [741, 766, 789, 821, 854, 882],
      "1Y": [548, 596, 642, 713, 796, 882],
    },
    sentiment: {
      market: 0.16,
      industry: 0.24,
      competitor: 0.09,
    },
    indicators: {
      rsi: { value: 63.4, score: 0.49 },
      macd: { value: 2.14, score: 0.44 },
      volume: { value: 1.26, score: 0.37 },
      trend: { value: 0.91, score: 0.58 },
    },
  }),
  TSLA: buildScenario({
    ticker: "TSLA",
    company: "Tesla, Inc.",
    signal: "HOLD",
    confidenceScore: 58,
    confidenceLabel: "Neutral bias",
    updatedAt: "Updated 7m ago",
    regimeState: "sideways",
    regimeProfile: "range",
    probability: 0.54,
    expectedReturn5d: 0.0062,
    riskFlags: ["headline_risk", "range_bound"],
    bullishDrivers: [
      "Support is building around the recent base",
      "Delivery expectations are stabilizing",
      "Short interest can fuel tactical squeezes",
    ],
    bearishDrivers: [
      "Price action remains range-bound",
      "Margin uncertainty still pressures conviction",
      "Headline sensitivity can quickly reverse momentum",
    ],
    forwardGuidance:
      "The setup is balanced for now, with mixed conviction and a sideways regime backdrop. Wait for a cleaner directional break before leaning aggressively.",
    charts: {
      "1D": [249, 247, 246, 248, 247, 249],
      "1W": [252, 248, 246, 247, 245, 249],
      "1M": [256, 251, 247, 249, 245, 246, 248, 249],
      "3M": [273, 261, 254, 248, 246, 249],
      "1Y": [289, 272, 260, 251, 244, 249],
    },
    sentiment: {
      market: 0.01,
      industry: 0.02,
      competitor: -0.01,
    },
    indicators: {
      rsi: { value: 50.4, score: 0.07 },
      macd: { value: 0.16, score: 0.05 },
      volume: { value: 1.01, score: 0.02 },
      trend: { value: 0.12, score: 0.06 },
    },
  }),
  AMZN: buildScenario({
    ticker: "AMZN",
    company: "Amazon.com Inc.",
    signal: "BUY",
    confidenceScore: 68,
    confidenceLabel: "Constructive",
    updatedAt: "Updated 5m ago",
    regimeState: "bull_trend",
    regimeProfile: "trend",
    probability: 0.66,
    expectedReturn5d: 0.0146,
    riskFlags: ["consumer_spending_sensitivity", "margin_mix_risk"],
    bullishDrivers: [
      "Retail execution remains stable",
      "AWS demand continues to improve",
      "Operating leverage is still supporting margins",
      "Relative strength is rebuilding",
    ],
    bearishDrivers: [
      "Consumer softness can cap upside",
      "Competitive cloud pricing remains a watch item",
      "Macro volatility can slow estimate upgrades",
    ],
    forwardGuidance:
      "Constructive bias remains intact while cloud momentum and operating leverage stay supportive. Watch consumer sensitivity into the next macro data window.",
    charts: {
      "1D": [183, 184, 185, 184, 186, 187],
      "1W": [179, 181, 180, 182, 184, 187],
      "1M": [171, 173, 176, 175, 179, 181, 184, 187],
      "3M": [161, 166, 170, 175, 181, 187],
      "1Y": [145, 152, 160, 170, 179, 187],
    },
    sentiment: {
      market: 0.09,
      industry: 0.14,
      competitor: 0.04,
    },
    indicators: {
      rsi: { value: 56.2, score: 0.31 },
      macd: { value: 0.94, score: 0.28 },
      volume: { value: 1.08, score: 0.19 },
      trend: { value: 0.72, score: 0.39 },
    },
  }),
  META: buildScenario({
    ticker: "META",
    company: "Meta Platforms",
    signal: "BUY",
    confidenceScore: 71,
    confidenceLabel: "High confidence",
    updatedAt: "Updated 3m ago",
    regimeState: "bull_trend",
    regimeProfile: "trend",
    probability: 0.67,
    expectedReturn5d: 0.0188,
    riskFlags: ["regulatory_headline_risk", "ad_cycle_sensitivity"],
    bullishDrivers: [
      "Digital ad demand remains solid",
      "Efficiency gains continue to support margins",
      "Engagement trends are staying firm",
      "Relative strength has broadened again",
    ],
    bearishDrivers: [
      "Regulatory headlines can shift sentiment quickly",
      "Ad spending remains tied to macro confidence",
      "Leadership rotations can create sharp pullbacks",
    ],
    forwardGuidance:
      "The setup remains constructive while ad demand and margin discipline stay supportive. Watch regulatory headlines and any broad tech rotation for follow-through risk.",
    charts: {
      "1D": [507, 509, 511, 510, 513, 515],
      "1W": [498, 501, 505, 504, 509, 515],
      "1M": [481, 487, 494, 492, 501, 506, 511, 515],
      "3M": [456, 468, 479, 490, 503, 515],
      "1Y": [396, 419, 441, 468, 492, 515],
    },
    sentiment: {
      market: 0.1,
      industry: 0.15,
      competitor: 0.06,
    },
    indicators: {
      rsi: { value: 57.9, score: 0.34 },
      macd: { value: 1.08, score: 0.3 },
      volume: { value: 1.11, score: 0.21 },
      trend: { value: 0.75, score: 0.42 },
    },
  }),
};

export const signalDetailMock = signalDetailScenarios.AAPL.signal;
export const signalDetailMeta = signalDetailScenarios.AAPL.meta;

export function getSignalDetailScenario(ticker?: string): SignalDetailScenario {
  const normalizedTicker = ticker?.toUpperCase();

  if (normalizedTicker && signalDetailScenarios[normalizedTicker]) {
    return signalDetailScenarios[normalizedTicker];
  }

  if (normalizedTicker) {
    return buildFallbackScenario(normalizedTicker);
  }

  return signalDetailScenarios.AAPL;
}
