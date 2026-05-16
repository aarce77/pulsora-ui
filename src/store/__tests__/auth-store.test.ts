import { useAuthStore } from "@/store/auth-store";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession();
  });

  it("persists session semantics in memory", () => {
    useAuthStore.getState().setSession({
      accessToken: "token-123",
      userId: "user-456",
      email: "test@example.com",
    });

    expect(useAuthStore.getState().status).toBe("signed-in");
    expect(useAuthStore.getState().session?.userId).toBe("user-456");
  });

  it("clears a signed-in session", () => {
    useAuthStore.getState().setSession({
      accessToken: "token-123",
      userId: "user-456",
      email: "test@example.com",
    });

    useAuthStore.getState().clearSession();

    expect(useAuthStore.getState().status).toBe("signed-out");
    expect(useAuthStore.getState().session).toBeNull();
  });
});
