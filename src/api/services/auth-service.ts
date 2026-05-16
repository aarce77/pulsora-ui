import { apiClient } from "@/api/client";
import { authRequestSchema, authResponseSchema, type AuthRequest } from "@/api/contracts/auth";
import { endpoints } from "@/api/endpoints";

async function postAuth(endpoint: string, payload: AuthRequest) {
  const body = authRequestSchema.parse(payload);
  const response = await apiClient.post(endpoint, body);
  return authResponseSchema.parse(response.data);
}

export const authService = {
  signup: (payload: AuthRequest) => postAuth(endpoints.signup, payload),
  login: (payload: AuthRequest) => postAuth(endpoints.login, payload),
};
