# ProofHire — 24-Hour Build Documentation

**Status:** `DOCUMENTATION COMPLETE — IMPLEMENTATION NOT STARTED`  
**Date:** 30 October 2026  
**Product source:** [`BLUEPRINT.md`](../../BLUEPRINT.md)  
**Execution source:** [`TASK_TRACKER.md`](TASK_TRACKER.md)  
**Team:** Three permanent workstreams (A frontend, B backend, C compiler/AI); no Team D  
**Window:** P0–P8 across 24 elapsed hours (H0–H24)

---

## 1. What this package is

A complete, implementation-ready plan for building and demonstrating ProofHire in 24 hours. It covers the marketplace, Team Compiler, execution/recovery, independent verification, economics and the judge demo.

It is **not** a claim that the product exists. The repository is greenfield: no application source, dependencies or migrations have been written. Every task is `NOT_STARTED` except two explicitly deferred items.

### The product in one sentence

> A buyer posts a paid outcome; ProofHire compiles a team of independent agents, auditions competing workflows, survives failure with bounded recovery, verifies the result independently, and attributes payment only to accepted work.

### The demo truth

| Fact | Value |
|---|---|
| Buyer | Northstar Warehouse (seeded) |
| Builder | Jordan Lee / Demo Agent Studio (seeded) |
| Job | WH-204, starts `CONTRACT_READY` |
| Evidence | PO 12 / invoice 12 / physical scan 10 |
| Result | 10 received, 2 discrepancy, `EXCEPTION_REQUIRES_REVIEW` |
| Failure | Reconciliation v1.0.0 → `AGENT_SCHEMA_INVALID` |
| Recovery | v1.1.0 replaces it; downstream reruns |
| Verification | 10 checks pass; receipt hash; `VERIFIED_PENDING_HUMAN_APPROVAL` |
| Inventory | 42 → 42, pending 10, variance 2, commit `BLOCKED_PENDING_APPROVAL` |
| Economics | Buyer ₹10,000; builder ₹5,500; platform fee ₹2,500; reserves ₹1,200/₹800 |
| Payout | v1.0.0 ₹0; v1.1.0 ₹2,500; `ELIGIBLE_SIMULATED`; no real money moves |

---

## 2. Reading paths

### If you have 10 minutes

1. This README.
2. [`13 — Demo Runbook`](13_DEMO_RUNBOOK.md) — what the demo proves.
3. [`TASK_TRACKER.md`](TASK_TRACKER.md) — what must be built.

### If you are building

| Role | Read first | Then |
|---|---|---|
| **A — Frontend** | [`09 — UI/UX`](09_UI_UX_SPECIFICATION.md) | [`03`](03_PHASE_BREAKDOWN.md), [`07`](07_INTEGRATION_CONTRACTS.md), [`04`](04_WORKSTREAM_OWNERSHIP.md) |
| **B — Backend** | [`08 — Database/Seed`](08_DATABASE_AND_SEED_PLAN.md) | [`07`](07_INTEGRATION_CONTRACTS.md), [`04`](04_WORKSTREAM_OWNERSHIP.md), [`14`](14_TESTING_AND_ACCEPTANCE_PLAN.md) |
| **C — Compiler/AI** | [`10 — Compiler/Eval`](10_COMPILER_AND_EVALUATION_SPEC.md) | [`11`](11_EXECUTION_RECOVERY_VERIFICATION_SPEC.md), [`12`](12_MARKETPLACE_AND_ECONOMICS_SPEC.md), [`07`](07_INTEGRATION_CONTRACTS.md) |
| **Joint/lead** | [`02 — Master Plan`](02_IMPLEMENTATION_MASTER_PLAN.md) | [`03`](03_PHASE_BREAKDOWN.md), [`05`](05_EXECUTION_TRACKING.md), [`15`](15_RISK_AND_SCOPE_REGISTER.md) |
| **Judge/demo** | [`13 — Runbook`](13_DEMO_RUNBOOK.md) | [`12`](12_MARKETPLACE_AND_ECONOMICS_SPEC.md), [`14`](14_TESTING_AND_ACCEPTANCE_PLAN.md) |

### If you are auditing

1. [`01 — Repository Audit`](01_REPOSITORY_AUDIT.md)
2. [`DOCUMENTATION_AUDIT.md`](DOCUMENTATION_AUDIT.md)
3. [`16 — Decisions/Changelog`](16_DECISIONS_AND_CHANGELOG.md)

---

## 3. Document map

| # | Document | Purpose |
|---|---|---|
| 01 | [Repository Audit](01_REPOSITORY_AUDIT.md) | Verified greenfield state, proposed stack, blueprint conflicts C-01…C-10 |
| 02 | [Implementation Master Plan](02_IMPLEMENTATION_MASTER_PLAN.md) | Architecture, three engines, data flow, 24h schedule, milestones, definition of done |
| 03 | [Phase Breakdown](03_PHASE_BREAKDOWN.md) | P0–P8, 18 fields per phase, gates, prototypes, cuts |
| 04 | [Workstream Ownership](04_WORKSTREAM_OWNERSHIP.md) | File/route/API boundaries, RACI, prohibited actions, handoffs |
| 05 | [Execution Tracking Guide](05_EXECUTION_TRACKING.md) | Tracker protocol, statuses, evidence, escalation |
| 06 | [CSV Companion](06_CSV_COMPANION.md) | CSV schema, counts, validation, filters |
| 07 | [Integration Contracts](07_INTEGRATION_CONTRACTS.md) | Frozen domain types, API routes, state machines, examples |
| 08 | [Database and Seed Plan](08_DATABASE_AND_SEED_PLAN.md) | Schema, indexes, seed values, reset, idempotency |
| 09 | [UI/UX Specification](09_UI_UX_SPECIFICATION.md) | Premium dark system, routes, flows, states, acceptance |
| 10 | [Compiler and Evaluation](10_COMPILER_AND_EVALUATION_SPEC.md) | Matching, contract, candidates, ten fixtures, selection |
| 11 | [Execution, Recovery and Verification](11_EXECUTION_RECOVERY_VERIFICATION_SPEC.md) | Runtime, failure, fallback, verifier, receipt, review |
| 12 | [Marketplace and Economics](12_MARKETPLACE_AND_ECONOMICS_SPEC.md) | Supply, pricing, ₹10,000 model, attribution, simulation labels |
| 13 | [Demo Runbook](13_DEMO_RUNBOOK.md) | Three-minute script, Q&A, fallbacks, rehearsal log |
| 14 | [Testing and Acceptance](14_TESTING_AND_ACCEPTANCE_PLAN.md) | AC-01…10, negative suite, determinism, gates |
| 15 | [Risk and Scope Register](15_RISK_AND_SCOPE_REGISTER.md) | 20 risks, scope in/out, cut order, assumptions |
| 16 | [Decisions and Changelog](16_DECISIONS_AND_CHANGELOG.md) | D-001…D-024, open questions, checkpoint template |
| — | [Task Tracker](TASK_TRACKER.md) | Canonical 108-task execution state |
| — | [Task Tracker CSV](TASK_TRACKER.csv) | Machine-readable export of the same tasks |
| — | [Documentation Audit](DOCUMENTATION_AUDIT.md) | Coverage and consistency verification |

---

## 4. Task counts

| Measure | Value |
|---|---:|
| Total tasks | 108 |
| DONE | 0 |
| Actionable remaining | 106 |
| Dropped/deferred | 2 (`P5-A-005`, `P7-B-004`) |
| Critical path | 46 |
| A tasks | 40 |
| B tasks | 34 |
| C tasks | 34 |
| Total estimated minutes | 4,080 |
| Core (non-optional) minutes | 3,970 |

Per phase: P0 9 · P1 10 · P2 13 · P3 15 · P4 12 · P5 13 · P6 13 · P7 11 · P8 12.

**Capacity warnings:** A is over its window in P3 (245 vs 240), P6 (145 vs 120) and P7 (135 vs 120) before optional work. Optional tasks are the first cut.

---

## 5. The 24-hour schedule

| Phase | Elapsed | Theme | Tag |
|---|---|---|---|
| P0 | H0–H1 | Foundation and contract freeze | `p0-foundation` |
| P1 | H1–H4 | Shell, personas, schema, seed | `p1-shell` |
| P2 | H4–H7 | Marketplace and job creation | `p2-marketplace` |
| P3 | H7–H11 | Compiler, auditions, selection | `p3-compiler` |
| P4 | H11–H15 | Work order, execution, recovery | `p4-recovery` |
| P5 | H15–H18 | Verification, receipt, review | `p5-trust` |
| P6 | H18–H20 | Contributions and economics | `p6-economics` |
| P7 | H20–H22 | Live integration and polish | `p7-polish` |
| P8 | H22–H24 | Regression and rehearsal | `v1.0-demo` |

A phase is complete only when its gate passes, its prototype is usable and its tag exists.

---

## 6. Ownership at a glance

| Workstream | Owns | Does not own |
|---|---|---|
| **A — Product & Frontend** | All pages, components, graph, client/mocks, navigation, visual QA, judge script | DB, business rules, compiler, verifier |
| **B — Backend & Platform** | Prisma, seed, APIs, role guards, idempotency, reset, backup, ops | UI design, matching/selection, verifier semantics |
| **C — Compiler & Evaluation** | Contracts, manifests, adapters, compiler, auditions, runtime rules, verifier, receipt body, attribution | Page layout, migrations, route envelopes |

**No Team D.** QA/integration/demo ops are distributed; the joint lead owns gates.

---

## 7. Simulation and label policy

| Category | Label | Reality |
|---|---|---|
| Northstar, Jordan Lee, agent versions | `Seeded demo data` | Pre-created fixtures |
| ₹ amounts | `Simulated` | No money moves |
| Settlement | `Eligible (simulated)` | No provider; `provider: null` |
| Inventory | `Simulated inventory ledger` | No warehouse mutation |
| Auditions | `Measured on wh204-suite-v1` | Deterministic local run |
| Reputation | `Derived from demo evidence` | Not a public rating |
| Verification | `Independent deterministic verifier` | Not an agent claim |

**Never claim:** real payment, live inventory, production auth, public demand, certified compliance or guaranteed earnings.

---

## 8. How to use this package

1. **Freeze at P0.** Read `07` and `16`; sign off contracts, stack and scope.
2. **Work from the tracker.** One task per person, one `IN_PROGRESS` at a time.
3. **Use the contracts, not screenshots.** A builds against typed mocks; B/C build the truth.
4. **Gate every phase.** Demonstrate the prototype; get second-person verification; tag.
5. **Cut optional, never core.** The cut order is in `15`.
6. **Rehearse three times.** The demo is part of the product.

### Proposed commands (created at P0)

```powershell
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run db:generate
npm run db:push
npm run db:seed
npm run db:reset
```

These commands do not exist yet. They are part of P0-B-001 and must not be presented as working until the scaffold is built.

---

## 9. Source-of-truth rules

1. `BLUEPRINT.md` is the canonical product specification.
2. `TASK_TRACKER.md` is the canonical execution state; the CSV is an export.
3. `07_INTEGRATION_CONTRACTS.md` freezes shapes at P0.
4. `08_DATABASE_AND_SEED_PLAN.md` freezes seed IDs and values.
5. `09_UI_UX_SPECIFICATION.md` freezes the route list and design system.
6. Any material change goes through `16_DECISIONS_AND_CHANGELOG.md`.

If two documents disagree, the more specific frozen document wins for implementation, and the conflict is recorded and fixed. Do not silently diverge.

---

## 10. What success looks like

- A judge sees a premium product, not a prototype.
- Three candidates are auditioned; A/B are rejected for recorded reasons; C is selected.
- v1.0.0 visibly fails; v1.1.0 visibly replaces it.
- Ten independent checks pass; the receipt hash is stable.
- Inventory stays blocked; no false claim of a commit.
- Jordan earns ₹5,500 simulated; v1.0.0 earns ₹0; v1.1.0 earns ₹2,500.
- The demo resets and repeats in under 3:15.
- Every simulated value is labelled.
- No application source was changed by this documentation task.

---

**Next step:** start P0-B-001. Do not mark anything done until its acceptance criteria and verification method pass.
