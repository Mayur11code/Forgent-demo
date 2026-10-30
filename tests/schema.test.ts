import { describe, it, expect } from "vitest";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

describe("P1-B-001: Prisma Schema v1 Model Reflection Suite", () => {
  it("reflects all 30 domain models plus SystemHealth in Prisma.ModelName enum", () => {
    const models = Object.keys(Prisma.ModelName);
    expect(models).toHaveLength(31);
    expect(models).toContain("SystemHealth");
    expect(models).toContain("UserAccount");
    expect(models).toContain("Buyer");
    expect(models).toContain("Builder");
    expect(models).toContain("Agent");
    expect(models).toContain("AgentVersion");
    expect(models).toContain("AgentPackageArtifact");
    expect(models).toContain("Capability");
    expect(models).toContain("AgentVersionCapability");
    expect(models).toContain("AgentManifestSnapshot");
    expect(models).toContain("Job");
    expect(models).toContain("AcceptanceContract");
    expect(models).toContain("WorkflowCandidate");
    expect(models).toContain("CandidateStage");
    expect(models).toContain("EvaluationRun");
    expect(models).toContain("EvaluationFixtureResult");
    expect(models).toContain("EvaluationAssertion");
    expect(models).toContain("WorkOrder");
    expect(models).toContain("WorkOrderAllocation");
    expect(models).toContain("ExecutionRun");
    expect(models).toContain("StageRun");
    expect(models).toContain("ExecutionEvent");
    expect(models).toContain("RecoveryEvent");
    expect(models).toContain("AcceptanceResult");
    expect(models).toContain("AcceptanceCheck");
    expect(models).toContain("EvidenceReceipt");
    expect(models).toContain("ContributionRecord");
    expect(models).toContain("SettlementRecord");
    expect(models).toContain("AgentVersionStats");
    expect(models).toContain("InventoryLedgerEntry");
    expect(models).toContain("IdempotencyRecord");
  });

  it("reflects all 30 domain models plus SystemHealth in generated Prisma Client delegates", () => {
    // Inspect generated Prisma Client prototype/properties without connecting to DB
    const adapter = new PrismaNeon({
      connectionString: "postgresql://mock:mock@localhost:5432/mock",
    });
    const client = new PrismaClient({ adapter });

    // 0. Platform Infrastructure
    expect(client.systemHealth).toBeDefined();

    // 1. Identity & Accounts (3)
    expect(client.userAccount).toBeDefined();
    expect(client.buyer).toBeDefined();
    expect(client.builder).toBeDefined();

    // 2. Catalog, Packages & Manifests (6)
    expect(client.agent).toBeDefined();
    expect(client.agentVersion).toBeDefined();
    expect(client.agentPackageArtifact).toBeDefined();
    expect(client.capability).toBeDefined();
    expect(client.agentVersionCapability).toBeDefined();
    expect(client.agentManifestSnapshot).toBeDefined();

    // 3. Job & Specification (2)
    expect(client.job).toBeDefined();
    expect(client.acceptanceContract).toBeDefined();

    // 4. Compiler & Auditions (5)
    expect(client.workflowCandidate).toBeDefined();
    expect(client.candidateStage).toBeDefined();
    expect(client.evaluationRun).toBeDefined();
    expect(client.evaluationFixtureResult).toBeDefined();
    expect(client.evaluationAssertion).toBeDefined();

    // 5. Commercial (2)
    expect(client.workOrder).toBeDefined();
    expect(client.workOrderAllocation).toBeDefined();

    // 6. Runtime & Trust (7)
    expect(client.executionRun).toBeDefined();
    expect(client.stageRun).toBeDefined();
    expect(client.executionEvent).toBeDefined();
    expect(client.recoveryEvent).toBeDefined();
    expect(client.acceptanceResult).toBeDefined();
    expect(client.acceptanceCheck).toBeDefined();
    expect(client.evidenceReceipt).toBeDefined();

    // 7. Settlement & Reputation (3)
    expect(client.contributionRecord).toBeDefined();
    expect(client.settlementRecord).toBeDefined();
    expect(client.agentVersionStats).toBeDefined();

    // 8. Invariant & Idempotency (2)
    expect(client.inventoryLedgerEntry).toBeDefined();
    expect(client.idempotencyRecord).toBeDefined();
  });
});
