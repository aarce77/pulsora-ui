import { z } from "zod";

const toneSchema = z.enum(["positive", "negative", "warning", "neutral"]);

const sentimentPulseSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(100),
  change: z.string(),
  tone: toneSchema,
});

const eventTagSchema = z.object({
  label: z.string(),
  impact: z.enum(["High", "Medium", "Low"]),
  tone: toneSchema,
});

const marketInsightSchema = z.object({
  title: z.string(),
  summary: z.string(),
  confidence: z.string(),
  tone: toneSchema,
});

const newsItemSchema = z.object({
  source: z.string(),
  headline: z.string(),
  sentiment: z.string(),
  time: z.string(),
  tone: toneSchema,
});

const intelligenceMockSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  sentimentPulse: z.array(sentimentPulseSchema),
  eventTags: z.array(eventTagSchema),
  marketInsights: z.array(marketInsightSchema),
  news: z.array(newsItemSchema),
});

export type IntelligenceMock = z.infer<typeof intelligenceMockSchema>;

export const intelligenceMock: IntelligenceMock = intelligenceMockSchema.parse({
  title: "Intelligence",
  subtitle:
    "Follow sentiment, catalysts, and market context without losing the explainable signal thread.",
  sentimentPulse: [
    { label: "Macro", score: 74, change: "+6 pts", tone: "positive" },
    { label: "Semis", score: 81, change: "+4 pts", tone: "positive" },
    { label: "Consumers", score: 58, change: "-2 pts", tone: "warning" },
    { label: "Crypto beta", score: 43, change: "-7 pts", tone: "negative" },
  ],
  eventTags: [
    { label: "Fed speakers", impact: "High", tone: "warning" },
    { label: "CPI next week", impact: "High", tone: "warning" },
    { label: "NVIDIA supply chain", impact: "Medium", tone: "positive" },
    { label: "Retail earnings", impact: "Medium", tone: "neutral" },
    { label: "Treasury auction", impact: "Low", tone: "neutral" },
    { label: "OPEC rhetoric", impact: "Low", tone: "negative" },
  ],
  marketInsights: [
    {
      title: "Leadership remains narrow but constructive",
      summary:
        "Mega-cap breadth is still carrying the tape, but internal participation is improving enough to support trend continuation.",
      confidence: "High confidence",
      tone: "positive",
    },
    {
      title: "Volatility is contained, not absent",
      summary:
        "Cross-asset calm is supportive for risk, though macro event risk can still reprice crowded trades quickly.",
      confidence: "Balanced",
      tone: "warning",
    },
    {
      title: "Rotation is selective rather than broad",
      summary:
        "Cyclicals are participating in pockets, but the strongest impulse still sits with quality growth and AI-linked names.",
      confidence: "Constructive",
      tone: "positive",
    },
  ],
  news: [
    {
      source: "MarketWatch",
      headline: "NVIDIA suppliers see stronger second-half AI demand",
      sentiment: "Bullish read-through",
      time: "7m ago",
      tone: "positive",
    },
    {
      source: "Bloomberg",
      headline: "Treasury yields edge higher ahead of next inflation print",
      sentiment: "Macro caution",
      time: "18m ago",
      tone: "warning",
    },
    {
      source: "Reuters",
      headline: "Retail earnings guidance remains mixed into summer demand check",
      sentiment: "Neutral",
      time: "32m ago",
      tone: "neutral",
    },
    {
      source: "Financial Times",
      headline: "Oil rhetoric adds pressure to transport and discretionary names",
      sentiment: "Bearish cross-current",
      time: "51m ago",
      tone: "negative",
    },
  ],
});
