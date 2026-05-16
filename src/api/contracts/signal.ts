import { z } from "zod";

const indicatorDetailSchema = z.object({
  value: z.number().nullable(),
  score: z.number(),
  weight: z.number(),
  contribution: z.number(),
  detail: z.record(z.string(), z.number()).nullable().optional(),
});

const sentimentDetailSchema = z.object({
  score: z.number(),
  weight: z.number(),
});

const confidenceSchema = z.object({
  score: z.number().int(),
  tier: z.string(),
});

const regimeSchema = z.object({
  state: z.string(),
  profile: z.string(),
  thresholds: z.record(z.string(), z.number()),
});

const xgbProbabilitySchema = z.object({
  direction: z.string(),
  probability: z.number(),
  expected_return_5d: z.number().nullable().optional(),
});

const explanationSchema = z.object({
  bullish_drivers: z.array(z.string()),
  bearish_drivers: z.array(z.string()),
  forward_guidance: z.string().nullable().optional(),
});

export const signalResponseSchema = z.object({
  ticker: z.string(),
  timestamp: z.string().datetime(),
  interval: z.string(),
  signal: z.string(),
  composite_score: z.number(),
  confidence: confidenceSchema,
  regime: regimeSchema,
  xgb_probability: xgbProbabilitySchema.nullable().optional(),
  indicators: z.record(z.string(), indicatorDetailSchema),
  sentiment: z.record(z.string(), sentimentDetailSchema),
  risk_flags: z.array(z.string()),
  explanation: explanationSchema,
});

export type SignalResponse = z.infer<typeof signalResponseSchema>;
