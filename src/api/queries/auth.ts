import { useMutation } from "@tanstack/react-query";

import { authService } from "@/api/services/auth-service";
import { type AuthRequest } from "@/api/contracts/auth";
import { useAuthStore } from "@/store/auth-store";

function useAuthMutation(action: (payload: AuthRequest) => Promise<any>) {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: action,
    onSuccess: (data) => {
      setSession({
        accessToken: data.access_token,
        userId: data.user_id,
        email: data.email,
      });
    },
  });
}

export function useLoginMutation() {
  return useAuthMutation(authService.login);
}

export function useSignupMutation() {
  return useAuthMutation(authService.signup);
}
