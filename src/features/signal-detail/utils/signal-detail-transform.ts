import { type SignalResponse } from "@/api/contracts/signal";

type DashboardSignalSummary = {
  ticker: string;
  company: string;
  signal: "BUY" | "HOLD" | "SELL";
  confidenceScore: number;
  confidenceLabel: string;
  stats: {
    label: string;
    value: string;
    tone: "positive" | "negative" | "neutral";
  }[];
  timeframe: string[];
  selectedTimeframe: string;
  chart: { label: string; value: number }[];
};

type DashboardSignalDetails = {
  tabs: string[];
  activeTab: string;
  rows: {
    label: string;
    value: string;
    tone: "positive" | "negative" | "warning" | "neutral";
  }[];
  cta: string;
};

type DashboardDrivers = {
  positive: { label: string; value: string }[];
  negative: { label: string; value: string }[];
};

type DashboardRegime = {
  currentRegime: string;
  outlook: string;
  probability: string;
  since: string;
  probabilities: {
    label: string;
    value: number;
    tone: "positive" | "warning" | "negative";
  }[];
  forwardView: {
    title: string;
    subtitle: string;
  };
};

export function toSignalSummary(
  signal: SignalResponse,
  meta: Omit<DashboardSignalSummary, "ticker" | "signal" | "confidenceScore">,
): DashboardSignalSummary {
  return {
    ticker: signal.ticker,
    signal: signal.signal as "BUY" | "HOLD" | "SELL",
    confidenceScore: signal.confidence.score,
    ...meta,
  };
}

export function toSignalDetails(signal: SignalResponse): DashboardSignalDetails {
  return {
    tabs: ["Summary", "Drivers", "Technical", "News"],
    activeTab: "Summary",
    rows: [
      { label: "Signal", value: signal.signal, tone: "positive" },
      {
        label: "Confidence score",
        value: `${signal.confidence.score} / 100`,
        tone: "neutral",
      },
      {
        label: "Confidence tier",
        value: signal.confidence.tier,
        tone: "positive",
      },
      {
        label: "Expected move (5d)",
        value: signal.xgb_probability?.expected_return_5d
          ? `${(signal.xgb_probability.expected_return_5d * 100).toFixed(2)}%`
          : "N/A",
        tone: "positive",
      },
      {
        label: "Regime profile",
        value: signal.regime.profile,
        tone: "neutral",
      },
      {
        label: "Composite score",
        value: signal.composite_score.toFixed(2),
        tone: "neutral",
      },
      {
        label: "AI model",
        value: "Pulsora AI v2.1",
        tone: "neutral",
      },
    ],
    cta: "View full analysis",
  };
}

export function toDrivers(signal: SignalResponse): DashboardDrivers {
  return {
    positive: signal.explanation.bullish_drivers.map((label, index) => ({
      label,
      value: `+${(0.18 - index * 0.03).toFixed(2)}`,
    })),
    negative: signal.explanation.bearish_drivers.map((label, index) => ({
      label,
      value: `${(-0.08 - index * 0.02).toFixed(2)}`,
    })),
  };
}

export function toRegime(signal: SignalResponse): DashboardRegime {
  const probability = Math.round((signal.xgb_probability?.probability ?? 0.72) * 100);

  return {
    currentRegime: signal.regime.state.replaceAll("_", " "),
    outlook: probability >= 65 ? "Bullish" : "Neutral",
    probability: `${probability}%`,
    since: "Apr 6, 2026",
    probabilities: [
      {
        label: "Bull trend",
        value: probability,
        tone: "positive",
      },
      {
        label: "Sideways",
        value: 100 - probability - 10,
        tone: "warning",
      },
      {
        label: "Bear trend",
        value: 10,
        tone: "negative",
      },
    ],
    forwardView: {
      title: probability >= 65 ? "Bullish" : "Balanced",
      subtitle:
        signal.explanation.forward_guidance ??
        "Signal remains constructive while current regime stays intact.",
    },
  };
}
