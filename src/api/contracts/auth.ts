import { z } from "zod";

export const authRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const authResponseSchema = z.object({
  access_token: z.string().min(1),
  user_id: z.string().min(1),
  email: z.email(),
});

export type AuthRequest = z.infer<typeof authRequestSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
