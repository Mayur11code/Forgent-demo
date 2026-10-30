# 09 — UI/UX Specification

**Status:** `PROPOSED — FREEZE AT P0`  
**Owner:** Team A  
**Primary viewport:** desktop/laptop, 1280–1440 CSS px  
**Design posture:** premium dark B2B operations console, not a marketing site and not a generic admin template

---

## 1. Design direction

ProofHire should feel like a high-trust operations product where money, evidence and failure are visible. The visual language is restrained and precise: deep graphite surfaces, strong typography, thin borders, purposeful colour and motion that explains state changes rather than decorating them.

Principles:

1. **Evidence over decoration.** Every number on screen comes from a persisted record or a labelled fixture.
2. **One system.** Buyer and builder surfaces share the same shell, primitives, spacing and badges.
3. **Failure is first-class.** A failed stage must look different from a running or successful stage without relying on colour alone.
4. **Money is explicit.** Amounts always show currency, simulation status and allocation context.
5. **No fake affordances.** Deferred features are not rendered as disabled buttons that imply imminent capability.
6. **Readable density.** A B2B operator should see the whole workflow, the checks and the economics without decorative whitespace.

---

## 2. Visual tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#07090D` | App background |
| `--surface-1` | `#0D1118` | Sidebar, base panels |
| `--surface-2` | `#121824` | Cards, table headers |
| `--surface-3` | `#18202D` | Raised cards, drawers |
| `--border` | `#232C3B` | Default borders |
| `--border-strong` | `#334056` | Focused/selected borders |
| `--text` | `#F3F6FB` | Primary text |
| `--text-muted` | `#93A0B5` | Secondary text |
| `--text-dim` | `#66748A` | Metadata |
| `--indigo` | `#6366F1` | Primary action, selected workflow |
| `--cyan` | `#22D3EE` | Live/running accent, data highlights |
| `--green` | `#22C55E` | Verified, passed, eligible |
| `--amber` | `#F59E0B` | Warning, pending approval, simulated |
| `--red` | `#EF4444` | Failed, blocked, critical |
| `--grey` | `#64748B` | Inactive, dropped, skipped |

Use colour plus icon/label. Never encode status by colour alone.

### Type and spacing

- UI font: **Inter** or **Geist** (self-hosted or local fallback; no external font dependency at demo time).
- Mono font: **JetBrains Mono** or system monospace for IDs, hashes, amounts in tables.
- Scale: 12 / 13 / 14 / 16 / 20 / 24 / 32 / 40 px.
- Weights: 400 body, 500 labels, 600 headings, 700 key metrics.
- Spacing: 4px base; component gaps 8/12/16; section padding 24; page padding 32.
- Radius: 8px controls, 12px cards, 16px large surfaces.
- Border: 1px solid `--border`; selected cards use `--border-strong` plus a subtle indigo glow.
- Shadow: `0 8px 24px rgba(0,0,0,.28)` for drawers/popovers only.

### Motion

- 150–220ms `ease-out` for state transitions, drawer entry and node status changes.
- A running stage may pulse a 2px cyan rail, not the whole card.
- Respect `prefers-reduced-motion`; disable pulses and transforms.
- No confetti, no infinite decorative animation and no animated “AI thinking” theatre.

---

## 3. Application shell

```
┌──────────────┬────────────────────────────────────────────────────────┐
│ Brand        │ Topbar: breadcrumb · demo status · persona · reset      │
│ 240px        ├────────────────────────────────────────────────────────┤
│ Role nav     │ Demo banner: SEEDED DATA · SIMULATED PAYMENTS · ...    │
│              ├────────────────────────────────────────────────────────┤
│ Workstream   │ Page header: title · status · primary action            │
│ context      │                                                        │
│              │ Content: max 1440px, 32px padding                       │
│ Footer       │                                                        │
└──────────────┴────────────────────────────────────────────────────────┘
```

- Sidebar: 240px expanded, 72px collapsed; brand at top; role nav grouped by section; workstream context at bottom.
- Topbar: 64px; breadcrumb left; persona switcher and reset right.
- Demo banner: persistent, thin amber/indigo strip, not dismissible. Copy: `Demo environment · Seeded profiles · Simulated payments and inventory`.
- Persona switcher: shows `Northstar Warehouse · Buyer` or `Demo Agent Studio · Builder`; switching reloads role context, not a login.
- Reset action: requires confirmation; shows reset state and toast; never a silent destructive action.
- Responsive: below 1100px sidebar collapses to icons; below 900px it becomes a drawer. The demo target is laptop, not phone.

### Role-aware navigation

**Buyer**

| Label | Route | Purpose |
|---|---|---|
| Overview | `/buyer/overview` | Spend, open job, verification summary |
| Jobs | `/buyer/jobs` | Job list and create |
| Marketplace | `/buyer/marketplace` | Builder capabilities and versions |
| Transactions | `/buyer/transactions` | ₹10,000 breakdown, eligibility |

**Builder**

| Label | Route | Purpose |
|---|---|---|
| Overview | `/builder/overview` | Agents, eligible earnings, recent evidence |
| Builder profile | `/builder/profile` | Jordan Lee / Demo Agent Studio |
| My agents | `/builder/agents` | Versioned capabilities and reputation |
| Contributions | `/builder/contributions` | Stage-level attribution |
| Earnings | `/builder/earnings` | ₹5,500 simulated eligibility |

No buyer route appears in builder navigation and vice versa. Direct-route access by the wrong role renders a role-boundary state, not a broken page.

---

## 4. Complete page list

| # | Route | Page | Phase / task | Role |
|---|---|---|---|---|
| 1 | `/` | Redirect to role home | P0-A-001 | any |
| 2 | `/buyer/overview` | Buyer command centre | P1-A-003 | buyer |
| 3 | `/buyer/jobs` | Jobs list | P2-A-004 | buyer |
| 4 | `/buyer/jobs/new` | Three-step job wizard | P2-A-003 | buyer |
| 5 | `/buyer/jobs/[jobId]` | Job detail / Contract tab | P2-A-004 | buyer |
| 6 | `/buyer/jobs/[jobId]/compiler` | Compiler and candidates | P3-A-003 | buyer |
| 7 | `/buyer/jobs/[jobId]/work-order` | Work-order approval | P4-A-001 | buyer |
| 8 | `/buyer/jobs/[jobId]/execution` | Execution monitor | P4-A-002 | buyer |
| 9 | `/buyer/jobs/[jobId]/verification` | Verification result | P5-A-001 | buyer |
| 10 | `/buyer/jobs/[jobId]/receipt` | Evidence Center / receipt | P5-A-002 | buyer |
| 11 | `/buyer/jobs/[jobId]/economics` | Job economics | P6-A-004 | buyer |
| 12 | `/buyer/marketplace` | Marketplace catalog | P2-A-001 | buyer |
| 13 | `/buyer/marketplace/agents/[agentId]` | Agent detail and versions | P2-A-002 | buyer |
| 14 | `/buyer/transactions` | Spend and transactions | P6-A-001 | buyer |
| 15 | `/builder/overview` | Builder command centre | P1-A-003 | builder |
| 16 | `/builder/profile` | Builder profile | P2-A-005 | builder |
| 17 | `/builder/agents` | My agents and versions | P2-A-005 | builder |
| 18 | `/builder/agents/new` | Register agent version | P2-A-005 | builder |
| 19 | `/builder/agents/[agentId]` | Agent/version detail, evaluations, reputation | P2-A-002 / P6-A-003 | builder |
| 20 | `/builder/agents/[agentId]/edit` | Edit draft version | P2-A-005 | builder |
| 21 | `/builder/contributions` | Stage-level contributions | P6-A-002 | builder |
| 22 | `/builder/earnings` | Earnings and eligibility | P6-A-002 | builder |

### Routes deliberately not created

- Public builder onboarding, billing, team management, API keys, settings, notifications.
- A global audit browser, PDF export, disputes centre, crypto settlement.
- A “create capability” bounty action. Capability gaps may be shown as honest information, but no fake submission flow.

No route listed above may remain a placeholder at P8. If a page is cut, remove its navigation item and record the scope decision.

---

## 5. Buyer flows

### 5.1 Buyer overview

Blocks:

1. **Command header:** “Northstar Warehouse · Receiving operations” + demo badge + `Post a job`.
2. **Metric row:** Open jobs (1), Verified outcomes (0→1), Simulated spend (₹0→₹10,000), Pending reviews (0→1).
3. **Active job card:** WH-204, PO/invoice/receiving counts 12/12/10, status badge, next action, deep link.
4. **Verification summary:** latest acceptance result or empty state “No verified outcome yet”.
5. **Marketplace pulse:** four seeded versions, builder link, “curated demo supply” label.

Empty state before any data: explain that WH-204 is seeded and ready to compile. Never show a zero-filled chart without a label.

### 5.2 Jobs list

- Table/card hybrid: job ID, title, SKU, expected/received, status, budget, updated, next action.
- Filters: status, search.
- CTA: `Post a job`.
- WH-204 row is the primary demo entry point with a subtle “Seeded demo” tag.
- Empty state includes a create CTA; error state offers retry.

### 5.3 Create job wizard

**Step 1 — Outcome and evidence**

- Title, business outcome, SKU, PO document + quantity, invoice document + quantity, receiving scan + scanned units.
- Inline evidence summary: 12 expected / 12 invoiced / 10 scanned.
- Validation: required fields, positive integer quantities, scan unit IDs unique.

**Step 2 — Acceptance contract**

- Read-only compiled checks, expected outcome, approval rule, limits.
- Ambiguity warnings (e.g., “Physical receiving is authoritative; confirm”).
- Human approval required for inventory commit, always on.
- User may not remove a critical check in the demo.

**Step 3 — Budget and deadline**

- ₹10,000 prefilled demo budget; deadline; risk level.
- Contract preview must show the exact ten checks and `BLOCKED_PENDING_APPROVAL`.
- Submit creates job + contract atomically; disable double submit.

### 5.4 Job detail / Contract tab

- Header: job ID, title, buyer, status badge, budget, deadline.
- Tabs: Contract · Compiler · Work order · Execution · Verification · Receipt · Economics.
- Contract tab: objective, inputs, expected outcome, ten checks, approval rules, limits, ambiguity warnings, frozen version.
- Next action is state-aware: `Run compiler`, `Review candidates`, `Approve work order`, `View execution`, `Review verification`, `Open receipt`.

### 5.5 Compiler tab

- Required capabilities as a six-item checklist with matched version chips.
- `Compile` action; progress: matching → generating candidates → persisted.
- Candidate cards for A/B/C with strategy, participating versions, estimated cost, latency, status.
- Capability-gap warning if any required capability has no match.
- CTA to audition; disabled until compile succeeds.

### 5.6 Audition comparison

Three columns, horizontally aligned, same row ordering. See §9.

### 5.7 Work order

- Header: selected workflow, audition evidence, selected candidate.
- Participating agents table with version, stage, price, fallback.
- Allocation table: evidence ₹1,500; reconciliation ₹2,500; exception reporting ₹1,000; builder subtotal ₹5,500; platform fee ₹2,500; execution/recovery reserve ₹1,200; human-review reserve ₹800; total ₹10,000.
- Terms: acceptance required, inventory commit approval, max 1 retry, max 1 replacement, simulated eligibility.
- `Approve work order` requires confirmation; disabled for non-buyer; no double approval.

### 5.8 Execution monitor

- Run header: execution ID, scenario label `Controlled failure injection`, status, elapsed, total cost.
- Start action after approval; if a run exists, resume polling.
- Stage timeline and graph side by side at 1440; stacked at 1024.
- Live status rail, stage cards, event log drawer.
- Failure moment: v1.0.0 red `FAILED`, error code `AGENT_SCHEMA_INVALID`, raw output link.
- Recovery card: replacement v1.1.0, compatibility checks, budget, reason.
- Replacement node: dashed indigo outline and `REPLACED BY v1.1.0` label.
- No success state until verification passes.

### 5.9 Verification

- Verdict block: `Verified pending human review`, not a green “Paid” state.
- Result numbers: expected 12, invoiced 12, physically received 10, discrepancy 2.
- Ten-check table: status, expected, actual, evidence, severity.
- State diff: committed 42→42; pending 0→10; variance 0→2; proposed on-hand 52 if approved; commit blocked.
- Human review panel and blocked commit badge.

### 5.10 Evidence Center / receipt

- Document-style layout with a verification seal, receipt ID, job/contract/execution IDs, timestamp.
- Result strip, checks, agent/version table including replaced v1.0.0, recovery summary, state diff, costs, economics, integrity hash.
- Simulated labels: payments, inventory, builder eligibility.
- Export JSON / Markdown. No PDF button.
- Print stylesheet: white background, no nav, page breaks before economics if needed.

### 5.11 Transactions

- Buyer total ₹10,000 and status `SIMULATED · NOT SETTLED`.
- Stacked allocation bar: builder ₹5,500, platform ₹2,500, reserves ₹2,000.
- Per-stage rows with agent version and accepted/replaced status.
- Link to receipt.
- Empty state before verification: “No eligible transaction yet”.

### 5.12 Marketplace

- Search and filters: capability, status.
- Agent cards: name, builder, latest version, capabilities, price from, latency, reliability or “No evidence yet”.
- Seeded labels and “curated demo supply”.
- Agent detail: version timeline, schema/permission panels, pricing, limitations, fallback link, evaluations (empty before demo), reputation.

---

## 6. Builder flows

### 6.1 Builder overview

- Header: Jordan Lee · Demo Agent Studio · Independent builder.
- Metrics: active versions (4), staged contributions (0→₹5,500 eligible), accepted stage successes (0→3), recovery provided (0→1).
- Agent cards with version status.
- Latest contribution/evidence panel.
- “Seeded demo profile” label.

### 6.2 Builder profile

- Identity, studio, bio, demo disclaimer.
- Terms: ownership retained; ProofHire receives execution/evaluation rights only.
- No fake ratings, followers or marketplace GMV.

### 6.3 My agents

- Table/cards: agent, versions, capabilities, status, price, latest evidence.
- Version timeline: v1.0.0 and v1.1.0 are distinct, with fallback link.
- Registration CTA opens `/builder/agents/new`; published versions are immutable.

### 6.4 Agent registration/edit

- Manifest fields: name, version, capabilities, input/output schema IDs, permissions, price, latency, limitations, fallback.
- Prominent warning: demo registration only; published versions immutable.
- Validation: unique version, known capability, integer paise, no `commit:inventory` permission.
- Successful creation lands on the agent detail with a draft/active badge and no fabricated evaluation score.

### 6.5 Contributions

- Rows: stage, agent version, accepted/replaced, amount, reason, evidence link.
- v1.0.0 reconciliation: ₹0, `REPLACED_BEFORE_ACCEPTED_OUTPUT`.
- v1.1.0 reconciliation: ₹2,500, `ACCEPTED_STAGE_OUTPUT`.
- Evidence Reader ₹1,500; Exception Reporter ₹1,000.
- Builder total ₹5,500; state `ELIGIBLE_SIMULATED`.
- No “Paid” or “Withdraw” action.

### 6.6 Earnings

- Summary: eligible ₹5,500, settled ₹0, platform fee not deducted from builder (fee is buyer-side in this demo).
- Payout rows by agent version, not by builder alone.
- Simulated eligibility banner.
- Link to the receipt and execution evidence.
- No provider reference, bank details or withdrawal flow.

### 6.7 Evaluations and reputation

- Tabs on agent detail: Overview · Versions · Evaluations · Reputation.
- Evaluations: suite version, fixtures run, critical failures, cost, latency, recovery, disclaimer. Empty before the demo.
- Reputation: version-scoped counters and reliability in basis points; v1.0.0 and v1.1.0 do not share evidence.
- Copy: “Derived from recorded demo executions. Not a public rating or production guarantee.”

---

## 7. Reusable components

| Component | Responsibility |
|---|---|
| `AppShell` | Sidebar/topbar/banner layout and role nav |
| `PersonaSwitcher` | Demo buyer/builder switch |
| `DemoBanner` | Persistent environment and simulation labels |
| `PageHeader` | Title, eyebrow, status, actions |
| `StatusBadge` | Typed status → label/icon/tone |
| `Money` | Paise → INR with `en-IN`, optional simulated suffix |
| `MetricCard` | Label, value, delta, context |
| `Surface` / `Card` | Layered panels |
| `DataTable` | Sticky header, row actions, empty/loading |
| `Tabs` | Deep-linkable job/agent sections |
| `WorkflowGraph` | Node/edge graph with status and replacement rendering |
| `StageNode` | Stage label, agent version, status, attempt |
| `NodeDrawer` | Input/output/error/evidence for a node |
| `CandidateComparison` | Three-column audition view |
| `CheckMatrix` | Assertion pass/fail by candidate |
| `CheckTable` | Ten acceptance checks |
| `StateDiff` | Before/after ledger diff |
| `ExecutionTimeline` | Stage-by-stage run narrative |
| `EventLog` | Ordered execution events |
| `RecoveryCard` | Failure code, compatibility checks, replacement |
| `ReceiptDocument` | Printable evidence receipt |
| `AllocationTable` | Work-order and transaction breakdown |
| `ContributionTable` | Stage-level earnings |
| `ReputationPanel` | Version-scoped stats |
| `Skeleton` / `EmptyState` / `ErrorState` | Page states |

Every component consumes typed props from `src/lib/contracts`; no page-local duplicated entity types.

---

## 8. Status badge semantics

| Status | Tone | Icon | Label |
|---|---|---|---|
| `DRAFT` | grey | pencil | Draft |
| `CONTRACT_READY` | indigo | file-check | Contract ready |
| `COMPILING` / `AUDITIONING` | cyan | spinner | Compiling / Auditioning |
| `CANDIDATES_READY` | indigo | layers | Candidates ready |
| `SELECTED` | indigo | check | Selected |
| `AWAITING_APPROVAL` | amber | clock | Awaiting approval |
| `APPROVED` | green | check | Approved |
| `EXECUTING` | cyan | activity | Executing |
| `RECOVERING` | amber | rotate | Recovering |
| `VERIFYING` | cyan | shield | Verifying |
| `VERIFIED_PENDING_REVIEW` | green + amber dot | shield-check | Verified · review pending |
| `COMPLETED` | green | check-circle | Completed |
| `VERIFICATION_FAILED` | red | x-shield | Verification failed |
| `FAILED_SAFE` | red | stop | Stopped safely |
| `CAPABILITY_GAP` | amber | puzzle | Capability gap |
| `CANCELLED` | grey | slash | Cancelled |
| `SUCCEEDED` | green | check | Passed |
| `FAILED` | red | x | Failed |
| `REPLACED` | amber/grey | swap | Replaced |
| `BLOCKED` | red | lock | Blocked |
| `SKIPPED` | grey | skip | Skipped |
| `ELIGIBLE_SIMULATED` | amber | clock | Eligible · simulated |
| `NOT_ELIGIBLE` | grey | minus | Not eligible |

Critical: `VERIFIED_PENDING_REVIEW` must not render as a plain green “Paid”. The review gate is visible.

---

## 9. Workflow graph behavior

- Layout: left-to-right DAG; entry at evidence read; human approval at the end.
- Node anatomy: stage label, capability, agent/version or `ProofHire deterministic`, status badge, attempt number, cost/latency on hover.
- Colours: pending grey, running cyan pulse, succeeded green, failed red, replaced amber dashed, awaiting approval amber lock, blocked red lock.
- Replacement: failed node remains; replacement node is inserted or tagged `v1.1.0` with a dashed edge from the failed node and a label `REPLACED BY v1.1.0`. Never hide the original failure.
- Deterministic nodes show a small `PROOFHIRE` chip. They do not show a builder avatar or payout.
- Human node shows `BUYER CHECKPOINT` and a lock icon.
- Click node → drawer with input/output refs, raw error, trace, permissions, cost, attempt history.
- Controls: fit view, zoom, pan; no auto-layout jump after a status change. Preserve viewport on poll.
- Accessibility: a toggle `View as list` renders the graph order and statuses in a table; arrow keys navigate nodes.
- Small screens: graph inside a fixed-height scroll container; never force the page to overflow.

---

## 10. Audition comparison layout

```
┌────────────────────────────── Header: "Three ways to deliver WH-204" ──────────────────────────────┐
│ [A Single-agent baseline]      [B Fixed specialist team]        [C ProofHire selected]              │
│ ✕ Rejected — critical failure  ✕ Rejected — no safe recovery    ✓ Selected                          │
│ 10/10 checks? 8/10 …           9/10 …                           10/10 incl. recovery                │
│ Cost ₹… / Latency …            Cost ₹… / Latency …              Cost ₹… / Latency …                 │
│ Critical failures 1            Critical failures 0              Critical failures 0                 │
│ Recovery ✕                     Recovery ✕                       Recovery ✓                          │
│ [expand assertions]            [expand assertions]              [expand assertions]                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
Why C: passes all critical checks, includes a bound compatible fallback, and is the least costly qualifying workflow.
Audition evidence: 10 fixtures (8 visible, 2 held out) · suite wh204-suite-v1 · deterministic seed.
```

- Same fixture order in every column; every result is measured, never a hard-coded score.
- Hard failures are above the fold; cost/latency below.
- The selected column has an indigo border and a `SELECTED BY COMPILER` chip.
- Rejection reasons are explicit and linked to the failed assertion.
- Held-out cases show aggregate pass/fail only; do not reveal their inputs.
- Disclaimer: “Audition evidence is conditional on this suite and configuration; it is not a production guarantee.”
- On 1024px, columns become a tabbed comparison or horizontally scrollable grid; the selected summary stays visible.

---

## 11. Execution timeline

- Vertical rail with stage cards; each card shows attempt, agent version, start/end, latency, cost, status.
- Failed attempt remains expanded with `View raw output`; the replacement appears directly below with a connector.
- Recovery card: failure code, failed version, strategy, compatibility checks, reserve consumption.
- Event log: monospace timestamps, sequence numbers, event type, actor, payload summary.
- Live indicator: `Running · polling every 500ms`; stops at terminal.
- Reload: fetch persisted execution and resume polling; never restart the run from the UI.
- If the run is `FAILED_SAFE`, the page shows a stop banner and no receipt/earnings CTA.

---

## 12. Evidence receipt layout

1. **Header:** ProofHire mark, `EVIDENCE RECEIPT`, receipt ID, status seal `VERIFIED · PENDING HUMAN APPROVAL`, issued time.
2. **Truth strip:** expected 12 · invoiced 12 · physically received 10 · discrepancy 2 · inventory commit blocked.
3. **Job and contract:** buyer, job, contract version, execution, work order.
4. **Workflow:** selected strategy, graph summary, suite version.
5. **Participants:** agent, version, stage, stage status, replaced version, contribution.
6. **Acceptance checks:** ten rows with expected/actual/evidence.
7. **State diff:** before/after table, proposed on-hand, commit status.
8. **Recovery:** failure code, replacement, compatibility, invalidated/rerun stages.
9. **Costs:** audition cost, execution cost, recovery cost; measured vs simulated.
10. **Economics:** buyer total, builder total, platform fee, reserves, settlement status.
11. **Integrity:** SHA-256 hash, canonical scope, copy action.
12. **Footer:** demo truth statement and “not a production audit”.

Print: light surface, black text, no sidebar, no charts that rely on colour alone.

---

## 13. Money and charts

- All amounts use `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })` on paise/100.
- Show ₹10,000 not ₹10,000.00 when the value is whole; show paise only when needed.
- Stacked allocation bar: builder (indigo), platform fee (cyan), reserves (amber/grey). Label each segment and the total.
- Earnings chart: by agent version, with replaced v1.0.0 at ₹0 clearly visible.
- Reputation chart: version-scoped, no cross-version aggregation.
- Every chart has a table alternative or accessible label; no chart without underlying record data.
- Never plot a trend from one data point. If only one run exists, show a value card and say “single demo run”.

---

## 14. Loading, empty, error and success states

| Page | Loading | Empty | Error | Success |
|---|---|---|---|---|
| Overview | Skeleton metric cards + rows | “No jobs yet” with create CTA | Retry panel, preserve shell | Live counts + next action |
| Marketplace | Card skeletons | “No agents match these filters” + clear filters | Retry + filter state preserved | Cards + result count |
| Job detail | Header skeleton + tab skeleton | Invalid ID → not found | Error code + retry | State-aware next action |
| Compiler | Step progress | “Not compiled yet” | Capability gap or typed error | Candidates + compare CTA |
| Auditions | Column skeletons | “Auditions not run” | Runner error + preserved prior run | Measured three-way result |
| Work order | Allocation skeleton | “No selection yet” | Invalid state / forbidden | Approved state + execution CTA |
| Execution | Timeline skeleton | “Not started” | Timeout / safe stop | Terminal + verification CTA |
| Verification | Check skeletons | “Not verified” | Failed verification with codes | Verified pending review |
| Receipt | Document skeleton | “Receipt not issued” | Export error | Printable receipt |
| Transactions | Row skeletons | “No eligible transaction” | Retry | ₹10,000 simulated breakdown |
| Earnings | Row skeletons | “No contributions yet” | Retry | ₹5,500 eligible simulated |

Every error state includes: what happened, whether retrying is safe, a request ID if available, and a recovery action. Never show a raw stack trace.

---

## 15. Demo environment indicators

Permanent, visible, non-dismissible:

- `DEMO ENVIRONMENT` chip in the topbar.
- `SEEDED DATA` on Northstar and Jordan profiles.
- `SIMULATED PAYMENTS` on work order, transactions, contributions, earnings, receipt.
- `SIMULATED INVENTORY` on the ledger and state diff.
- `CONTROLLED FAILURE INJECTION` on the execution page and recovery card.
- `EVALUATION BASELINE — NOT FOR HIRE` on candidate A.
- `PROOFHIRE DETERMINISTIC` on policy, inventory proposal and verifier.
- `NOT A PUBLIC RATING` on reputation.
- `DEMO REGISTRATION ONLY` on builder registration.

Do not label a seeded value as real market activity. Do not show a payment-provider logo.

---

## 16. Responsive requirements

| Width | Behaviour |
|---|---|
| ≥1440 | Full sidebar, three-column comparison, graph + timeline side by side |
| 1280 | Full sidebar, comparison columns narrower, tables horizontally scroll inside cards |
| 1024 | Collapsed sidebar, stacked graph/timeline, comparison becomes scrollable or tabbed |
| 768 | Drawer nav, single-column cards; demo not optimised below this |
| <768 | Functional but not demo-critical; no horizontal page overflow |

No primary CTA may be clipped. Tables scroll inside their container. The receipt remains printable at A4-ish width.

---

## 17. UI acceptance checklist

- [ ] Buyer and builder personas see different navigation and data.
- [ ] All routes in §4 exist and are reachable; no dead nav item.
- [ ] All displayed money comes from paise records and is formatted consistently.
- [ ] `VERIFIED_PENDING_REVIEW` is not presented as paid.
- [ ] v1.0.0 failure remains visible after v1.1.0 replacement.
- [ ] Deterministic functions and the verifier are labelled ProofHire, not builder agents.
- [ ] The single-agent baseline is labelled evaluation-only and is absent from the marketplace.
- [ ] Every simulated value is labelled.
- [ ] Graph, comparison, timeline and receipt survive a 1024px viewport.
- [ ] Loading, empty, error and success states exist for every data page.
- [ ] No deferred feature is rendered as a fake action.

**Related documents:** [02 — Implementation Master Plan](02_IMPLEMENTATION_MASTER_PLAN.md) · [07 — Integration Contracts](07_INTEGRATION_CONTRACTS.md) · [13 — Demo Runbook](13_DEMO_RUNBOOK.md)
