import { describe, it, expect } from "vitest";
import RootPage from "@/app/page";
import { NAVIGATION_REGISTRY } from "@/lib/navigation";

describe("Root Routing & Navigation Verification", () => {
  it("redirects GET / to /buyer/overview via Next.js server-side redirect", () => {
    try {
      RootPage();
      expect.fail("RootPage should have thrown a NEXT_REDIRECT signal");
    } catch (error: unknown) {
      // Next.js redirect() throws an internal error with digest containing the destination
      const redirectError = error as { message?: string; digest?: string };
      expect(redirectError.digest).toBeDefined();
      expect(redirectError.digest).toContain("/buyer/overview");
      expect(redirectError.digest).toContain("NEXT_REDIRECT");
    }
  });

  it("verifies that /buyer/overview is registered in the canonical navigation registry", () => {
    const buyerOverviewNav = NAVIGATION_REGISTRY.find(
      (item) => item.route === "/buyer/overview"
    );
    expect(buyerOverviewNav).toBeDefined();
    expect(buyerOverviewNav?.role).toBe("BUYER");
    expect(buyerOverviewNav?.section).toBe("Overview");
  });
});
