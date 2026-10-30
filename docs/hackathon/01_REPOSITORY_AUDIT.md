# 01 — Repository Audit

**Audit date:** 2026-10-30  
**Branch:** `main`  
**Last commit:** `b547a7d Initial commit`  
**Working tree:** clean except `BLUEPRINT.md`, which is untracked (`?? BLUEPRINT.md`)  
**Auditor:** Principal Architect / TPM (documentation baseline)

---

## 1. What is actually in the repository

| Path | State | Notes |
|---|---|---|
| `README.md` | Present | 14 bytes: `# Forgent-demo`. No run instructions, stack or product description. |
| `BLUEPRINT.md` | Present, untracked | 1,606 lines. The canonical ProofHire product and hackathon blueprint. |
| `.gitignore` | Present | Generic Node/Vite/Next ignore list. Includes `.next`, `node_modules`, `.env*`, `dist`, coverage, `.turbo`, `.vite`. It does **not** currently ignore Prisma SQLite files such as `prisma/dev.db` or `backups/`. |
| `.git/` | Present | Single commit on `main`. |

Nothing else exists. There is **no** `package.json`, lockfile, `src/`, `app/`, `prisma/`, tests, CI workflow, `.env.example`, Dockerfile or deployed configuration.

### Verified environment

| Tool | Version |
|---|---|
| Node.js | `v22.18.0` |
| npm | `10.9.3` |
| Git | `2.50.0.windows.1` |
| Platform | Windows (`win32`), repository under `C:\Users\Mayur\Desktop\Forgent-demo` |

### Verified Git state

```text
Branch: main
Commit: b547a7d Initial commit
Status: ?? BLUEPRINT.md
```

**Audit conclusion:** this is a greenfield repository. Every application feature in the blueprint is unimplemented. The documentation must not claim any existing product capability.

---

## 2. Source-of-truth blueprint

The task brief refers to `ProofHire_Final_Solution_Blueprint.md`. The actual file in this repository is:

```text
C:\Users\Mayur\Desktop\Forgent-demo\BLUEPRINT.md
```

It is the same canonical content: ProofHire v2.0, dated 30 October 2026, covering the marketplace, Team Compiler, verification/execution, the Northstar receiving scenario, the 24-hour plan, economics and demo authenticity rules.

**Decision:** `BLUEPRINT.md` remains the canonical product source. The documentation package links to it rather than duplicating it. A future rename to `ProofHire_Final_Solution_Blueprint.md` is optional and should be done as a tracked move with a decision-log entry; do not maintain two copies.

The blueprint is currently **untracked**. It should be committed before implementation so every teammate and checkpoint sees the same product source.

---

## 3. Existing stack and configuration

### What exists

- Git repository and a generic Node `.gitignore`.
- Node 22 and npm 10 on the development machine.
- No application framework, dependency manifest, compiler configuration, database, migration, test runner or runtime.

### What does not exist

- No `package.json`, `package-lock.json`, `pnpm-lock.yaml` or `yarn.lock`.
- No TypeScript configuration or source files.
- No Next.js/React/Vite configuration.
- No database schema, ORM, migrations or seed.
- No API routes or server actions.
- No UI components, design tokens or pages.
- No tests, test fixtures, CI or lint configuration.
- No environment template or secrets policy.
- No existing roadmap, PR plan, tracker or task list.
- No existing documentation directory.

There is therefore **no pre-existing technology stack to preserve**. The stack is a proposal, not a discovered decision. Every stack item is marked `PROPOSED` in [16 — Decisions and Changelog](16_DECISIONS_AND_CHANGELOG.md) until the P0 freeze.

---

## 4. Proposed stack (PROPOSED — freeze at P0)

| Layer | Proposal | Why it fits the 24-hour demo |
|---|---|---|
| App framework | Next.js 15 App Router, React 19, TypeScript strict | One deployable app for UI and API; fast route handlers; no separate service to coordinate. |
| Styling | Tailwind CSS + CSS variables + local component primitives | Premium dark system with token control; no heavy design-system dependency. |
| Components | Radix primitives, `lucide-react` icons | Accessible dialogs/tabs/tooltips without building every primitive. |
| Workflow graph | `@xyflow/react` (React Flow) | Purpose-built node/edge graph with pan, zoom, fit-view and custom node states. |
| Charts | Recharts | Small, record-driven spend/earnings/reputation visuals. |
| Validation | Zod | Shared runtime schemas for API payloads, manifests, contracts and fixtures. |
| ORM / DB | Prisma + SQLite for the hackathon; PostgreSQL-compatible schema target | Zero external DB operations and deterministic local reset. SQLite is a demo decision, not a production claim. |
| Tests | Vitest for unit/integration; Playwright optional for one happy-path UI smoke | Compiler, verifier and economics require deterministic tests. |
| Execution | In-process Node orchestrator behind Next.js route handlers, with persisted stage/event records and client polling | Reliable on a demo laptop; no queue/worker infrastructure. |
| Auth | Demo persona cookie and server-side role guard | Enough to demonstrate buyer vs builder permissions; **not** real authentication. |
| Payments | None. Simulated eligibility only | The blueprint prohibits claiming real settlement without a provider. |
| Inventory | Simulated local ledger | 42 → 42 on-hand invariant; commit blocked until human approval. |
| LLM / Adapters | Hybrid adapter architecture: Evidence Reader is model-backed (Gemini/OpenAI via API key) with deterministic fallback; Reconciliation and Verifier are deterministic rules. | Provides authentic AI execution while guaranteeing zero-failure offline demo resilience. |

### Why SQLite instead of PostgreSQL

The blueprint suggests PostgreSQL + Prisma. The repository has no database infrastructure, no Docker configuration and no provisioned Postgres instance. For a 24-hour judged demo, SQLite removes an external failure mode and makes reset/backup trivial.

Constraints of this choice:

- Store enums as strings validated by Zod (SQLite does not support Prisma enums).
- Store JSON as text and parse through typed helpers (avoid connector-specific JSON behaviour).
- Use integer paise for money, never floats.
- Keep the Prisma schema free of Postgres-only features so a later migration is mechanical.
- Accept single-writer demo concurrency; do not claim production multi-tenant scale.

This is recorded as `D-002` and requires P0 approval.

---

## 5. Existing features and infrastructure

| Area | Exists? | Evidence |
|---|---|---|
| Buyer/freelancer personas | No | Greenfield. |
| Job posting / acceptance contract | No | Greenfield. |
| Agent registry / versions | No | Greenfield. |
| Capability matching / compiler | No | Greenfield. |
| Audition runner | No | Greenfield. |
| Execution runtime / recovery | No | Greenfield. |
| Independent verifier | No | Greenfield. |
| Evidence receipt | No | Greenfield. |
| Economics / contribution ledger | No | Greenfield. |
| Dashboards | No | Greenfield. |
| Seed/reset | No | Greenfield. |
| Tests / CI | No | Greenfield. |

No feature may be described as "existing" in a demo or document unless it is implemented and verified later.

---

## 6. Commands and environment requirements

### Available now

```powershell
node --version      # v22.18.0
npm --version       # 10.9.3
git --version       # 2.50.0.windows.1
```

### To be created at P0 (PROPOSED)

```powershell
npm install
npm run dev
npm run build
npm run typecheck
npm run lint
npm run test
npm run db:generate
npm run db:push
npm run db:seed
npm run db:reset
```

### Environment variables to define

```dotenv
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_USE_MOCKS="true"
NEXT_PUBLIC_DEMO_MODE="true"
DEMO_SEED="wh204-v1"
DEMO_FAILURE_SCENARIO="WH204_DEFAULT_FAILURE"
DEMO_STAGE_DELAY_MS="900"
```

No secret, real payment key, warehouse credential or model API key is required for the critical path. That is deliberate.

### Ports and local assumptions

- Next.js dev server on `http://localhost:3000`.
- SQLite file inside `prisma/` and ignored by Git.
- Single local browser, desktop/laptop viewport 1280–1440 primary.
- No external network required after `npm install`.

---

## 7. Conflicts and gaps between repository reality and the blueprint

| # | Conflict / gap | Resolution recorded |
|---|---|---|
| C-01 | The brief names `ProofHire_Final_Solution_Blueprint.md`; the repository file is `BLUEPRINT.md`. | Treat `BLUEPRINT.md` as canonical; do not duplicate. Decision `D-008`. |
| C-02 | Blueprint suggests PostgreSQL; no Postgres infrastructure exists. | SQLite + Prisma for the demo, Postgres-compatible schema. Decision `D-002`. |
| C-03 | Blueprint's receiving example lists five candidate specialists including a Policy Checker and a separate Fallback Reconciler; the task specifies one freelancer with four versions (Evidence Reader, Reconciliation v1.0.0/v1.1.0, Exception Reporter). | Policy validation becomes a deterministic ProofHire capability; v1.1.0 is the compatible fallback. No fake fifth builder. Decision `D-009`, `D-010`, `D-011`. |
| C-04 | Blueprint often speaks of Builders A–E; the task seeds a single freelancer, Jordan Lee. | All builder allocations aggregate to Jordan / Demo Agent Studio; per-agent contributions remain visible. |
| C-05 | Blueprint marks buyer/builder dashboards as "should build if time permits"; the task requires them as part of the demo. | Dashboards and economics views are P0, not optional. |
| C-06 | Blueprint defers public builder onboarding; the task lists agent registration/edit UI. | Implement a demo-scoped registration/edit flow with immutable published versions; no public onboarding or fake third-party acquisition. |
| C-07 | Blueprint says team may use Next.js/Postgres "suggested"; no repository preference exists. | All stack decisions are `PROPOSED` and frozen at P0, not presented as approved facts. |
| C-08 | Blueprint says 8–12 test cases; the plan must be concrete. | Ten fixtures: eight visible, two held-out, versioned `wh204-suite-v1`. Decision `D-015`. |
| C-09 | Blueprint warns that an agent saying "Done" is not proof; the demo needs an independent verifier. | Verifier is a deterministic module owned by ProofHire, excluded from the agent registry and marketplace. |
| C-10 | No task tracker, roadmap or docs exist. | This package creates them under `docs/hackathon/`; `TASK_TRACKER.md` is canonical. |
| C-11 | Blueprint mentions workflow selection; previous draft implied Candidate C was predetermined. | Dynamic selection algorithm implemented: selection is computed from persisted audition runs; Candidate A, B or C can qualify; example 10/10 and ₹10,000 are illustrative. Decision `D-025`. |

No existing user work is overwritten. The only pre-existing files are preserved.

---

## 8. Technical risks introduced by the greenfield state

| Risk | Impact | Mitigation |
|---|---|---|
| No scaffold exists; P0 is on the critical path | A slow setup consumes marketplace/compiler time | One owner (B) initialises the project first; A/C work from the frozen contract document in parallel. |
| SQLite write concurrency | Polling + event writes can contend | Single demo user, short transactions, WAL mode if needed, no parallel execution runs. |
| In-process async runtime | Next.js hot reload or a crash can interrupt a run | Persist stage state before/after each stage; UI resumes from persisted state; demo reset is one click. |
| Windows paths and line endings | Scripts may break on `/` assumptions | Use Node `path` APIs; enforce LF in Git attributes; document PowerShell commands. |
| Untracked blueprint | Teammates/checkpoints may miss the source | Commit `BLUEPRINT.md` before implementation. |
| No real auth | Role checks are demo-only | Clearly label; enforce role at route level; never claim production security. |
| No CI | Regressions reach the demo | Local gate commands at every phase; P8 regression; tag only after gates. |
| Three developers, 108 tasks | Concurrency conflicts | Frozen contracts, file ownership in 04, typed mocks, one owner per module. |
| Demo depends on laptop runtime | A failed live run loses the story | Seeded backup, reset, offline mode, pre-recorded fallback only if clearly labelled. |

---

## 9. Audit sign-off checklist

- [x] Repository structure inspected.
- [x] `README.md`, `.gitignore`, Git branch and working tree inspected.
- [x] Canonical blueprint located and fully read.
- [x] No package/configuration/stack decision found to preserve.
- [x] No existing roadmap, tracker, PR plan or documentation directory found.
- [x] Conflicts with the task brief identified and recorded.
- [x] No application source, package, dependency or migration modified by this documentation task.
- [x] Proposed decisions marked `PROPOSED`, not `ACCEPTED`.

**Next document:** [02 — Implementation Master Plan](02_IMPLEMENTATION_MASTER_PLAN.md)
