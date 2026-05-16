import { appStorage } from "@/store/storage";
import { createJSONStorage, persist } from "@/vendor/zustand-middleware";
import { create } from "@/vendor/zustand";

export type AuthSession = {
  accessToken: string;
  userId: string;
  email: string;
};

type AuthStoreState = {
  session: AuthSession | null;
  status: "signed-out" | "signed-in";
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      session: null,
      status: "signed-out",
      setSession: (session) =>
        set({
          session,
          status: "signed-in",
        }),
      clearSession: () =>
        set({
          session: null,
          status: "signed-out",
        }),
    }),
    {
      name: "pulsora-auth",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        session: state.session,
        status: state.status,
      }),
    },
  ),
);
