import { signalResponseSchema, type SignalResponse } from "@/api/contracts/signal";
import { signalsMock } from "@/features/signals/data/signals-mock";

type SignalDetailMeta = {
  company: string;
  confidenceLabel: string;
  stats: {
    label: string;
    value: string;
    tone: "positive";
  }[];
  timeframe: string[];
  selectedTimeframe: string;
  chart: {
    label: string;
    value: number;
  }[];
  updatedAt: string;
};

type SignalDetailScenario = {
  signal: SignalResponse;
  meta: SignalDetailMeta;
};

const defaultStats = [
  { label: "Trend strength", value: "Bullish", tone: "positive" as const },
  { label: "Momentum", value: "Strong", tone: "positive" as const },
  { label: "Volatility", value: "Low", tone: "positive" as const },
  { label: "Volume", value: "High", tone: "positive" as const },
  { label: "Sentiment", value: "Positive", tone: "positive" as const },
];

const defaultTimeframe = ["1D", "1W", "1M", "3M", "1Y"];

function buildFallbackScenario(ticker: string): SignalDetailScenario {
  const sourceItem =
    signalsMock.items.find((item) => item.ticker === ticker) ?? signalsMock.items[0];

  const bullish =
    sourceItem.signal === "SELL"
      ? [
          "Short-term oversold conditions can trigger relief moves",
          "Volume support is stabilizing near recent levels",
          "Positioning is less crowded after recent weakness",
        ]
      : [
          `${sourceItem.company} retains constructive relative strength`,
          "Momentum and participation remain supportive",
          "Institutional flows still favor the current setup",
        ];

  const bearish =
    sourceItem.signal === "BUY"
      ? [
          "Valuation sensitivity remains elevated",
          "Macro volatility can slow upside follow-through",
          "Crowded leadership can retrace quickly",
        ]
      : [
          "Trend conviction is still mixed",
          "Follow-through has not fully confirmed",
          "Risk appetite remains fragile",
        ];

  const probability =
    sourceItem.signal === "BUY" ? 0.71 : sourceItem.signal === "HOLD" ? 0.54 : 0.34;

  return {
    signal: signalResponseSchema.parse({
      ticker: sourceItem.ticker,
      timestamp: "2026-05-16T14:35:00Z",
      interval: "1d",
      signal: sourceItem.signal,
      composite_score: Number((sourceItem.confidenceScore / 100).toFixed(2)),
      confidence: {
        score: sourceItem.confidenceScore,
        tier:
          sourceItem.confidenceScore >= 75
            ? "high"
            : sourceItem.confidenceScore >= 60
              ? "medium"
              : "low",
      },
      regime: {
        state:
          sourceItem.regime === "Bull trend"
            ? "bull_trend"
            : sourceItem.regime === "Sideways"
              ? "sideways"
              : "bear_trend",
        profile: sourceItem.signal === "HOLD" ? "range" : "trend",
        thresholds: {
          bullish: 0.6,
          bearish: 0.35,
        },
      },
      xgb_probability: {
        direction:
          sourceItem.signal === "SELL"
            ? "down"
            : sourceItem.signal === "HOLD"
              ? "flat"
              : "up",
        probability,
        expected_return_5d: Number.parseFloat(sourceItem.expectedMove) / 100,
      },
      indicators: {
        rsi: {
          value: sourceItem.signal === "BUY" ? 59.4 : sourceItem.signal === "HOLD" ? 50.2 : 42.6,
          score: sourceItem.signal === "BUY" ? 0.43 : sourceItem.signal === "HOLD" ? 0.08 : -0.26,
          weight: 0.2,
          contribution: sourceItem.signal === "BUY" ? 0.086 : sourceItem.signal === "HOLD" ? 0.016 : -0.052,
        },
        macd: {
          value: sourceItem.signal === "BUY" ? 1.48 : sourceItem.signal === "HOLD" ? 0.18 : -1.12,
          score: sourceItem.signal === "BUY" ? 0.37 : sourceItem.signal === "HOLD" ? 0.04 : -0.22,
          weight: 0.16,
          contribution: sourceItem.signal === "BUY" ? 0.0592 : sourceItem.signal === "HOLD" ? 0.0064 : -0.0352,
        },
        volume: {
          value: sourceItem.signal === "BUY" ? 1.14 : sourceItem.signal === "HOLD" ? 1.01 : 0.94,
          score: sourceItem.signal === "BUY" ? 0.28 : sourceItem.signal === "HOLD" ? 0.03 : -0.11,
          weight: 0.14,
          contribution: sourceItem.signal === "BUY" ? 0.0392 : sourceItem.signal === "HOLD" ? 0.0042 : -0.0154,
        },
        trend: {
          value: sourceItem.signal === "BUY" ? 0.84 : sourceItem.signal === "HOLD" ? 0.12 : -0.46,
          score: sourceItem.signal === "BUY" ? 0.49 : sourceItem.signal === "HOLD" ? 0.06 : -0.31,
          weight: 0.22,
          contribution: sourceItem.signal === "BUY" ? 0.1078 : sourceItem.signal === "HOLD" ? 0.0132 : -0.0682,
        },
      },
      sentiment: {
        market: {
          score: sourceItem.signal === "BUY" ? 0.11 : sourceItem.signal === "HOLD" ? 0.02 : -0.09,
          weight: 0.15,
        },
        industry: {
          score: sourceItem.signal === "BUY" ? 0.17 : sourceItem.signal === "HOLD" ? 0.03 : -0.07,
          weight: 0.1,
        },
        competitor: {
          score: sourceItem.signal === "BUY" ? 0.06 : sourceItem.signal === "HOLD" ? 0.01 : -0.05,
          weight: 0.05,
        },
      },
      risk_flags:
        sourceItem.signal === "BUY"
          ? ["high_valuation", "macro_event_risk"]
          : sourceItem.signal === "HOLD"
            ? ["range_bound", "headline_risk"]
            : ["trend_break", "downside_momentum"],
      explanation: {
        bullish_drivers: bullish,
        bearish_drivers: bearish,
        forward_guidance:
          sourceItem.signal === "BUY"
            ? `${sourceItem.company} remains constructive while regime support and momentum stay intact. Watch pullbacks for confirmation rather than deterioration.`
            : sourceItem.signal === "HOLD"
              ? `${sourceItem.company} is balanced for now, with mixed conviction and a less directional regime backdrop. Wait for confirmation before leaning aggressively.`
              : `${sourceItem.company} is under pressure while momentum and regime conditions remain weak. Risk control matters until the setup stabilizes.`,
      },
    }),
    meta: {
      company: sourceItem.company,
      confidenceLabel: sourceItem.confidenceLabel,
      stats: defaultStats,
      timeframe: defaultTimeframe,
      selectedTimeframe: "1M",
      chart: sourceItem.chart.map((point, index) => ({
        label: `W${index + 1}`,
        value: point.value,
      })),
      updatedAt: sourceItem.updatedAt,
    },
  };
}

const signalDetailScenarios: Record<string, SignalDetailScenario> = {
  AAPL: {
    signal: signalResponseSchema.parse({
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
    }),
    meta: {
      company: "Apple Inc.",
      confidenceLabel: "High confidence",
      stats: defaultStats,
      timeframe: defaultTimeframe,
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
    },
  },
  NVDA: {
    signal: signalResponseSchema.parse({
      ticker: "NVDA",
      timestamp: "2026-05-16T14:33:00Z",
      interval: "1d",
      signal: "BUY",
      composite_score: 0.79,
      confidence: {
        score: 82,
        tier: "high",
      },
      regime: {
        state: "bull_trend",
        profile: "trend",
        thresholds: {
          bullish: 0.62,
          bearish: 0.33,
        },
      },
      xgb_probability: {
        direction: "up",
        probability: 0.78,
        expected_return_5d: 0.0342,
      },
      indicators: {
        rsi: {
          value: 63.4,
          score: 0.49,
          weight: 0.2,
          contribution: 0.098,
        },
        macd: {
          value: 2.14,
          score: 0.44,
          weight: 0.16,
          contribution: 0.0704,
        },
        volume: {
          value: 1.26,
          score: 0.37,
          weight: 0.14,
          contribution: 0.0518,
        },
        trend: {
          value: 0.91,
          score: 0.58,
          weight: 0.22,
          contribution: 0.1276,
        },
      },
      sentiment: {
        market: {
          score: 0.16,
          weight: 0.15,
        },
        industry: {
          score: 0.24,
          weight: 0.1,
        },
        competitor: {
          score: 0.09,
          weight: 0.05,
        },
      },
      risk_flags: ["high_valuation", "gap_risk"],
      explanation: {
        bullish_drivers: [
          "AI infrastructure demand remains elevated",
          "Estimate revisions continue to move higher",
          "Leadership relative strength remains intact",
          "Institutional flows are supportive",
        ],
        bearish_drivers: [
          "Valuation remains extended",
          "Semiconductor cyclicality can reprice quickly",
          "Macro volatility can pressure multiples",
        ],
        forward_guidance:
          "Bullish bias remains intact while AI demand and price leadership stay supportive. Watch valuation sensitivity if broader risk appetite weakens.",
      },
    }),
    meta: {
      company: "NVIDIA Corp.",
      confidenceLabel: "Very strong",
      stats: defaultStats,
      timeframe: defaultTimeframe,
      selectedTimeframe: "1M",
      chart: [
        { label: "W1", value: 28 },
        { label: "W2", value: 33 },
        { label: "W3", value: 37 },
        { label: "W4", value: 41 },
        { label: "W5", value: 46 },
        { label: "W6", value: 49 },
        { label: "W7", value: 53 },
        { label: "W8", value: 58 },
      ],
      updatedAt: "Updated 1m ago",
    },
  },
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
