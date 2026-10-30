import { describe, it, expect } from "vitest";
import { db } from "@/server/db";

describe("Database & Platform Health Suite", () => {
  it("connects to Neon PostgreSQL and executes a query cleanly", async () => {
    const start = Date.now();
    const rows = await db.$queryRaw<Array<{ connected: number; time: Date }>>`SELECT 1 as connected, NOW() as time`;
    const duration = Date.now() - start;

    expect(rows).toBeDefined();
    expect(rows.length).toBe(1);
    expect(rows[0].connected).toBe(1);
    expect(rows[0].time).toBeInstanceOf(Date);
    expect(duration).toBeLessThan(10000);
  });
});
