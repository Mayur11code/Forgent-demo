# 02 — Implementation Master Plan

**Status:** `PROPOSED — FREEZE AT P0`  
**Owner:** Joint A/B/C lead (architecture), with Team B as build custodian  
**Product source:** [`BLUEPRINT.md`](../../BLUEPRINT.md)  
**Execution source:** [`TASK_TRACKER.md`](TASK_TRACKER.md)  
**Window:** 24 elapsed hours, P0 at H0 to P8 at H24  
**Team size:** Three developers, three permanent workstreams, no Team D

---

## 1. Purpose

This plan turns the ProofHire blueprint into a build that three people can finish and demonstrate in 24 hours without weakening the product's core claim:

> A buyer posts a real business outcome. ProofHire compiles a team of independently built agents, auditions competing workflows, exposes failure, recovers within bounds, verifies the result independently, and attributes payment only to accepted work.

The plan is deliberately narrower than the long-term product and deliberately wider than a compiler demo. The marketplace, the compiler and the trust/execution engine must all be visible in one continuous journey. A compiler-only or evaluator-only demo fails the plan even if it is technically impressive.

### Non-negotiable product properties

1. **The economic loop stays intact.** Jordan Lee is a seeded independent builder with four marketplace versions. Work is attributed per stage. A replaced version earns ₹0; the accepted fallback earns ₹2,500.
2. **Verification is independent.** The verifier recomputes the truth. It does not trust an agent's `SUCCESS` status, and it is not a marketplace agent.
3. **Failure is shown, not hidden.** Reconciliation v1.0.0 fails with a schema-invalid output. v1.1.0 recovers the stage. Downstream work reruns.
4. **Consequential action is blocked.** Inventory remains 42 committed, 10 pending and 2 variance. The commit stays `BLOCKED_PENDING_APPROVAL`.
5. **Everything simulated is labelled.** Payments are simulated eligibility, not settlement. Inventory is a local ledger, not a warehouse integration. Demo profiles are seeded.
6. **The UI is a product, not a wireframe.** Premium dark B2B operations console with no dead routes and no fake deferred actions.

---

## 2. Scope

### In scope for the 24-hour build

| Area | Included |
|---|---|
| Marketplace | Buyer catalog, agent detail, version timeline, builder profile, demo-scoped agent registration, versioned manifests and reputation |
| Job creation | Three-step wizard, structured evidence inputs, budget/deadline, acceptance contract compile |
| Team Compiler | Capability matching, compatibility checks, three candidates, ten-fixture audition, hard-constraint selection, capability gaps |
| Commercial | Work order, ₹10,000 allocation, buyer approval, simulated settlement eligibility |
| Execution | Six-stage runtime, persisted events, injected failure, bounded replacement, downstream rerun, safe stop |
| Trust | Independent ten-check verifier, state diff, receipt with SHA-256 hash, human review, blocked inventory commit |
| Economics | Stage attribution, v1.0.0 ₹0, v1.1.0 ₹2,500, builder ₹5,500, platform ₹2,500, reserves |
| Operations | Deterministic seed/reset, health endpoint, demo runbook, backup, rehearsals |

### Explicitly out of scope

- Real authentication, real payments, escrow, KYC, billing or payout rails.
- Real warehouse or ERP integration; the ledger is simulated.
- Public builder onboarding, third-party acquisition or unrestricted bidding.
- Arbitrary agent code execution, external model calls on the critical path, queues or websockets.
- PDF receipt export, cross-job audit browser, disputes centre, crypto settlement.
- A real capability-bounty submission flow.
- Production multi-tenancy, horizontal scale, SLA or compliance claims.

Deferred items are recorded in [15 — Risk and Scope Register](15_RISK_AND_SCOPE_REGISTER.md) and the tracker's optional/deferred register. They must not appear as dead UI.

---

## 3. Product story in one screen

```text
Northstar Warehouse has a receiving exception.
  PO 12 / Invoice 12 / Physical scan 10.
  Inventory must not be changed without human approval.

Northstar posts WH-204 with a ₹10,000 budget.

ProofHire compiles three candidate workflows:
  A  single-agent baseline          (evaluation only; not for hire)
  B  fixed specialist team          (no recovery path)
  C  compiler-selected team         (with v1.1.0 fallback)

All three audition on the same ten fixtures and fixed seed.
C is selected because it passes hard constraints and has a recovery path.

Jordan Lee's agents are hired by the stage:
  Evidence Reader        ₹1,500
  Reconciliation v1.0.0  ₹2,500  → fails schema validation
  Reconciliation v1.1.0  ₹2,500  → replaces it; v1.0.0 earns ₹0
  Exception Reporter     ₹1,000
  Policy + inventory proposal are ProofHire-owned deterministic functions.

The independent verifier passes 10 checks against 10 received / 2 discrepancy.
The inventory proposal is blocked pending human approval.
The receipt hashes the evidence, checks, recovery and economics.
Jordan's simulated eligible earnings are ₹5,500.
ProofHire's platform fee is ₹2,500. Reserves are ₹1,200 and ₹800.
No money moves. The marketplace and attribution logic are real.
```

---

## 4. Architecture

### 4.1 Logical architecture

```mermaid
flowchart TB
    subgraph Browser["Browser — premium dark operations console"]
        A1["Buyer routes"]
        A2["Builder routes"]
        A3["Shared shell, primitives, charts, React Flow"]
    end

    subgraph Next["Next.js 15 App Router — single deployable app"]
        B1["Route handlers /api/*"]
        B2["Server services"]
        B3["Persona cookie + role guard"]
    end

    subgraph Engines["Three product engines"]
        C1["Marketplace engine\nregistry, manifests, versions, reputation"]
        C2["Team Compiler\nmatcher, compatibility, contract, candidates, auditions, selector"]
        C3["Trust & Execution engine\nwork order, runtime, recovery, verifier, receipt, economics"]
    end

    subgraph Deterministic["Deterministic demo core — no LLM, no network"]
        D1["Agent adapters\nEvidence Reader · Reconciliation v1.0.0/v1.1.0 · Exception Reporter"]
        D2["Platform functions\nPolicy Validator · Inventory Proposal"]
        D3["Independent verifier\nnot an AgentAdapter"]
        D4["Fixture suite\nwh204-suite-v1"]
    end

    subgraph Data["Persistence"]
        E1[("Prisma + SQLite\nprisma/dev.db")]
        E2["Seed / reset\nseeded demo rows only"]
    end

    A1 --> B1
    A2 --> B1
    A3 --> A1
    A3 --> A2
    B1 --> B3
    B1 --> B2
    B2 --> C1
    B2 --> C2
    B2 --> C3
    C2 --> D1
    C2 --> D4
    C3 --> D1
    C3 --> D2
    C3 --> D3
    C1 --> E1
    C2 --> E1
    C3 --> E1
    E2 --> E1
```

### 4.2 Runtime shape

- **One app.** Next.js serves the UI and the API. No second service and no queue.
- **In-process orchestrator.** Execution runs inside a route handler, persisting each stage before and after it runs. The browser polls every 500 ms.
- **Resume from persistence.** A reload or dev-server restart reads the last persisted stage and continues or renders a terminal state.
- **Deterministic adapters.** Stage functions are pure TypeScript over seeded fixtures. No API key and no network are required.
- **Single-writer demo.** SQLite is sufficient for one demo user and one run. WAL mode is enabled if needed.

### 4.3 Repository shape (to be created at P0)

```text
app-or-src/
  app/
    (buyer)/buyer/...              buyer routes
    (builder)/builder/...          builder routes
    api/...                        route handlers
  components/
    ui/                            primitives
    shell/                         sidebar, topbar, banner
    workflow/                      React Flow graph
    compiler/                      candidates, comparison
    execution/                     timeline, events, recovery
    verification/                  checks, state diff
    receipt/                       receipt document
    economics/                     allocations, contributions
  lib/
    contracts/                     frozen types, Zod schemas, constants
    api/                           typed client + mocks
    navigation.ts
  server/
    db.ts
    agents/                        adapter, registry, manifests, adapters/*
    compiler/                      matcher, compatibility, candidates, auditions, selector
    runtime/                       orchestrator, recovery, limits, failure injection
    verification/                  verifier, state diff, approval gate
    evidence/                      receipt
    economics/                     attribution, contributions, settlement, reputation
    fixtures/                      WH-204 + audition fixtures
prisma/
  schema.prisma
  seed.ts
  migrations/
scripts/
  reset-demo.ts
  verify-seed.ts
docs/hackathon/                    this package
```

**File ownership** is defined in [04 — Workstream Ownership](04_WORKSTREAM_OWNERSHIP.md). Frozen contracts live in `src/lib/contracts/` and are owned by Team C after P0 sign-off.

---

## 5. The three engines and their boundaries

### 5.1 Marketplace — the economic engine

**Owns:** buyer and builder identities, agent identity, versioned manifests, capabilities, pricing, latency, limitations, fallback links, visibility, version statistics.

**Must prove:** an independent builder can list a versioned capability, a buyer can discover it, and accepted work produces an attributable earning. The marketplace is not a decorative catalog; it is where Jordan's participation becomes economically real (simulated).

**Never:** show the hidden baseline as a listing; show the verifier as an agent; invent ratings; claim a real payout.

### 5.2 Team Compiler — the intelligence engine

**Owns:** capability decomposition, hard matching, schema/permission compatibility, acceptance-contract compilation, candidate generation, auditions, assertions, selection.

**Must prove:** three workflows are compared on the same evidence and the same suite; the selection is explained by hard constraints, not vibes; the compiled team includes a bound fallback.

**Never:** use an LLM on the critical path; claim a benchmark that was not measured; let a high score override a critical failure; hide the held-out fixtures' values.

### 5.3 Verification & Execution — the trust engine

**Owns:** work order, approved allocations, execution, stage events, failure injection, recovery, independent verification, state diff, receipt, review gate, attribution and settlement eligibility.

**Must prove:** an agent saying "done" is not proof; failure is visible and bounded; a replacement can complete the work; consequential inventory action stays blocked; payment follows accepted evidence.

**Never:** let an agent commit inventory; let a failed version earn; let the verifier be registry-selectable; call simulated eligibility "paid".

---

## 6. End-to-end data flow

```mermaid
sequenceDiagram
    participant Buyer
    participant UI
    participant API
    participant Compiler
    participant Runtime
    participant Verifier
    participant Ledger

    Buyer->>UI: Open seeded WH-204
    UI->>API: GET /api/jobs/job-wh-204
    API-->>UI: CONTRACT_READY + contract v1
    Buyer->>UI: Run compiler
    UI->>API: POST /compile (idempotency key)
    API->>Compiler: match capabilities + generate A/B/C
    Compiler-->>API: three candidates persisted
    Buyer->>UI: Run auditions
    UI->>API: POST /auditions
    API->>Compiler: run wh204-suite-v1 on A/B/C
    Compiler-->>API: measured results + assertions
    API->>Compiler: hard-constraint selection
    Compiler-->>API: C selected; A/B reasons persisted
    Buyer->>UI: Approve ₹10,000 work order
    UI->>API: POST /work-orders/:id/approve
    API->>Ledger: snapshot allocations
    Buyer->>UI: Start execution
    UI->>API: POST /executions
    API->>Runtime: execute six stages
    Runtime-->>API: v1.0.0 fails AGENT_SCHEMA_INVALID
    Runtime->>Runtime: compatibility check + v1.1.0 replacement
    Runtime-->>API: downstream stages rerun and complete
    API->>Verifier: recompute truth independently
    Verifier-->>API: 10/2 + ten checks + blocked commit
    API->>Ledger: receipt hash + contributions + eligibility
    UI-->>Buyer: verified receipt, economics, blocked inventory
```

**Polling contract:** the execution endpoint returns ordered events and stage state. The UI stops polling at `AWAITING_APPROVAL`, `COMPLETED`, `FAILED_SAFE` or `VERIFICATION_FAILED`. A reload resumes from persisted state.

---

## 7. The 24-hour schedule

H0 is the first implementation minute. Calendar time is irrelevant; elapsed hours are the only clock. The windows below sum to exactly 1,440 minutes.

| Phase | Elapsed | Window | Theme | Gate outcome |
|---|---|---:|---|---|
| **P0** | H0–H1 | 60m | Architecture freeze and running foundation | App boots, contracts compile, `/api/health` 200, `p0-foundation` tag |
| **P1** | H1–H4 | 180m | Premium shell, personas, schema and seeded overviews | Both personas see seeded overviews with labelled data |
| **P2** | H4–H7 | 180m | Marketplace, builder profile, registry, job creation | Northstar browses versions and opens WH-204 with a compiled contract |
| **P3** | H7–H11 | 240m | Compiler, auditions and selection | A/B rejected with recorded reasons; C selected |
| **P4** | H11–H15 | 240m | Work order, execution, failure and recovery | v1.0.0 fails; v1.1.0 replaces it; downstream completes |
| **P5** | H15–H18 | 180m | Independent verification, receipt and review | Ten checks pass; receipt hash exists; inventory commit blocked |
| **P6** | H18–H20 | 120m | Contributions, economics and reputation | v1.1.0 ₹2,500, v1.0.0 ₹0, builder ₹5,500, simulated eligibility |
| **P7** | H20–H22 | 120m | Premium UX completion and live integration | Whole journey runs live; reset deterministic; visuals frozen |
| **P8** | H22–H24 | 120m | Regression, hardening, rehearsal and lock | Three clean rehearsals; `v1.0-demo`; signed runbook |

### Phase-level capacity warning

| Phase | A minutes | B minutes | C minutes | Window | Rule |
|---|---:|---:|---:|---:|---|
| P0 | 60 | 60 | 60 | 60 | Zero slack; scaffold is critical path. |
| P1 | 175 | 160 | 155 | 180 | 5–25m slack. |
| P2 | 180 | 175 | 175 | 180 | Tight; optional P1 items slip first. |
| P3 | **245** | 220 | 240 | 240 | A is 5m over before optional work. Cut `P3-A-006` first; parallelize `P3-A-005`. |
| P4 | 210 | 210 | 210 | 240 | 30m buffer for recovery debugging. |
| P5 | 180 | 170 | 170 | 180 | No buffer for A; receipt polish is the risk. |
| P6 | **145** | 115 | 120 | 120 | A is 25m over before optional work. Cut `P6-A-005`; protect `P6-A-001/002`. |
| P7 | **135** | 95 | 100 | 120 | A is 15m over before optional work. Cut `P7-A-004`; integration wins. |
| P8 | 100 | 95 | 120 | 120 | Rehearsals are non-negotiable. |

Optional tasks `P3-A-006`, `P6-A-005`, `P7-A-004` and `P8-C-004` are excluded from the critical path. Never cut marketplace, recovery, verification or attribution work to save optional polish.

---

## 8. Workstreams

| Workstream | Permanent mandate | Primary surfaces | Does not own |
|---|---|---|---|
| **A — Product & Frontend** | Premium shell, all buyer/builder routes, graph, comparison, execution monitor, receipt, economics views, visual QA | `src/app/**`, `src/components/**`, `src/lib/api/**`, `src/lib/navigation.ts` | Prisma schema, business rules, compiler algorithms, verifier logic |
| **B — Backend & Platform** | Schema, seed/reset, route handlers, persistence, idempotency, role guards, aggregation, performance, backup | `prisma/**`, `src/server/db.ts`, `src/app/api/**`, `src/server/services/**`, `scripts/**` | Visual design, matching/selection rules, receipt semantics |
| **C — AI, Compiler & Evaluation** | Frozen contracts, manifests, adapters, matcher, contract compiler, candidates, auditions, selector, runtime policy, recovery, verifier, attribution/economics rules | `src/lib/contracts/**`, `src/server/agents/**`, `src/server/compiler/**`, `src/server/runtime/**`, `src/server/verification/**`, `src/server/economics/**`, fixtures | Page layout, database migrations, API envelope conventions |

**No Team D.** QA, integration and demo operations are distributed:

- **A** owns visual QA, route parity, buyer/builder journey regression and the judge script.
- **B** owns API contract tests, schema/reset integrity, API regression and the seeded backup.
- **C** owns compiler/execution/verification determinism, negative-path tests, the canonical truth chain and rehearsal timing for the technical chain.
- **Joint** ownership: P0 freeze, phase gates, integration checkpoints, three rehearsals and final sign-off.

Detailed boundaries, RACI and prohibited files are in [04 — Workstream Ownership](04_WORKSTREAM_OWNERSHIP.md).

---

## 9. Dependency strategy

### 9.1 The safe critical path

```text
scaffold → contracts → schema → seed → manifests → adapters
  → matcher → contract compiler → candidates → auditions → assertions
  → selector → selection persistence → work order → execution
  → failure → fallback → safe limits → verifier → state diff
  → acceptance persistence → receipt → attribution → contributions
  → settlement → live integration → rehearsal
```

The full 46-task critical path is listed in [TASK_TRACKER.md §4](TASK_TRACKER.md#4-critical-path).

### 9.2 Parallelisation rules

1. **Contracts before screens.** A builds against typed mocks from `07_INTEGRATION_CONTRACTS.md` while B builds persistence and C builds engines.
2. **One writer per shared file.** `src/lib/contracts/**` is C-owned. `prisma/schema.prisma` is B-owned. `src/lib/navigation.ts` is A-owned.
3. **Vertical slices at every gate.** Every phase ends in a runnable, clickable slice, not a branch full of unmerged work.
4. **No silent shape change.** Any contract change requires a decision-log entry and a same-hour update to mocks, schemas and consumers.
5. **Integration is a task, not a hope.** P3-A-004, P7-A-001 and P7-C-001 exist specifically to replace mocks and prove parity.

### 9.3 Handoff points

| From → To | Artifact | Freeze condition |
|---|---|---|
| C → A/B | Contracts + Zod schemas | P0-C-003 signed |
| B → A/C | Schema + seed + health | P1-B-002 passes twice |
| C → A | Manifest fixtures + audition payloads | P1-C-001, P3-C-005 pass |
| B → A | Live compile/audition/selection APIs | P3-B-004 passes |
| B/C → A | Live execution/recovery payloads | P4-B-003 passes |
| C/B → A | Verification + receipt payloads | P5-B-002 passes |
| C/B → A | Contributions + settlement payloads | P6-B-002 passes |

---

## 10. Milestones and gates

A phase is complete only when **all four** are true:

1. The gate outcome is demonstrable in the running app.
2. The prototype is usable by a person who did not build it.
3. The phase smoke test passes and is recorded.
4. The checkpoint commit/tag exists.

| Checkpoint | Tag | Target | Evidence required |
|---|---|---|---|
| P0 | `p0-foundation` | H1 | `npm run dev`, health 200, typecheck/lint, contract parse tests |
| P1 | `p1-shell` | H4 | Persona switch, seeded overviews, schema/seed idempotency |
| P2 | `p2-marketplace` | H7 | Catalog filters, agent versions, WH-204 contract preview |
| P3 | `p3-compiler` | H11 | Three candidates, measured auditions, C selected with reasons |
| P4 | `p4-recovery` | H15 | Approval, failure, v1.1.0 replacement, downstream completion |
| P5 | `p5-trust` | H18 | Ten checks, receipt hash, review, blocked inventory |
| P6 | `p6-economics` | H20 | ₹5,500 eligible, ₹2,500 fee, v1.0.0 ₹0, reserves reconcile |
| P7 | `p7-polish` | H22 | Live route parity, three resets, visual freeze |
| P8 | `v1.0-demo` | H24 | Three rehearsals, backup, signed runbook |

If a gate slips, **cut optional scope before extending the phase**. P8 cannot be compressed: rehearsal time is part of the product.

---

## 11. Operating cadence

### Every 60–90 minutes

- 5-minute stand-up: current task, next task, blocker, gate risk.
- Update `TASK_TRACKER.md` status and blocker text.
- Run the phase smoke command.
- Commit a coherent slice; never leave `main` broken at a checkpoint.

### At every phase gate

1. Owner demonstrates the usable prototype.
2. A second workstream runs the verification method.
3. Record the gate result in the checkpoint log and decision changelog.
4. Tag the checkpoint.
5. Only then start the next phase's parallel work.

### Communication rules

- Interface questions go to the contract owner (C) and are answered in the contract document, not only in chat.
- Database questions go to B; UI questions go to A; algorithm questions go to C.
- A blocker older than 20 minutes is escalated to the joint lead.
- No one edits another workstream's owned file without agreement and a note.

---

## 12. Quality bar

| Dimension | Bar |
|---|---|
| Type safety | `tsc --noEmit` clean; no `any` in contract boundaries |
| Contracts | Every endpoint payload parses against a shared Zod schema |
| Determinism | Same seed + same scenario = identical checks, amounts and receipt hash |
| Idempotency | Duplicate compile/approve/start/review produces no duplicate rows or payouts |
| Failure | Every failure has a typed code, preserved raw output and safe terminal state |
| Money | Integer paise everywhere; allocations sum exactly to 1,000,000 |
| Labelling | Every seeded profile, simulated payment and simulated inventory value is labelled |
| UX | No dead route, no fake action, no unlabelled placeholder, keyboard focus visible |
| Performance | Full demo flow under 15 seconds; audition suite under 60 seconds; dashboard reads under 300 ms locally |
| Claims | No claim of real payment, real inventory integration or production security |

---

## 13. Definition of done

### A task is done when

- Its acceptance criteria are met in the running app or test suite.
- Its verification method has been run and recorded.
- Its output exists at the declared path.
- Any contract change is logged.
- The tracker row is `DONE`, not merely "code written".

### A phase is done when

- Every P0 task in the phase is `DONE` or explicitly `DROPPED`.
- The gate prototype is usable and demonstrated.
- The checkpoint tag exists.
- No unresolved blocker crosses the gate.

### The hackathon build is done when

- All nine gates are passed.
- Three clean rehearsals of the judge script succeed.
- The WH-204 chain produces 10 received / 2 discrepancy / `EXCEPTION_REQUIRES_REVIEW`.
- The verifier passes all ten checks; the receipt hash is stable.
- Inventory stays 42/10/2 and blocked.
- Jordan's simulated eligible earnings are ₹5,500; v1.0.0 is ₹0; v1.1.0 is ₹2,500.
- The reset restores `CONTRACT_READY` with identical IDs and counts.
- The runbook is signed and the `v1.0-demo` tag exists.
- No documentation claims more than the demo actually does.

---

## 14. Related documents

- [03 — Phase Breakdown](03_PHASE_BREAKDOWN.md) — phase-by-phase gates and prototypes.
- [04 — Workstream Ownership](04_WORKSTREAM_OWNERSHIP.md) — file and API boundaries.
- [07 — Integration Contracts](07_INTEGRATION_CONTRACTS.md) — frozen shapes.
- [10 — Compiler and Evaluation](10_COMPILER_AND_EVALUATION_SPEC.md) — matching, auditions, selection.
- [11 — Execution, Recovery and Verification](11_EXECUTION_RECOVERY_VERIFICATION_SPEC.md) — runtime and trust.
- [12 — Marketplace and Economics](12_MARKETPLACE_AND_ECONOMICS_SPEC.md) — attribution and platform model.
- [13 — Demo Runbook](13_DEMO_RUNBOOK.md) — the three-minute script.
