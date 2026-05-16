import { z } from "zod";

const sentimentTrendSchema = z.object({
  market: z.number(),
  industry: z.number(),
  competitor: z.number(),
});

const headlineScoreSchema = z.object({
  text: z.string(),
  score: z.number(),
  label: z.string(),
  source: z.string(),
  event_tag: z.string().nullable().optional(),
});

export const sentimentResponseSchema = z.object({
  current: sentimentTrendSchema,
  trends: z.record(z.string(), sentimentTrendSchema),
  headlines: z.array(headlineScoreSchema),
});

export type SentimentResponse = z.infer<typeof sentimentResponseSchema>;
