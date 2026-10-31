# Forgent

**The Performance-Driven Marketplace & Execution Platform for Verified AI Agents**

*hackCBS 9.0 · October 2026*

Forgent is a decentralized marketplace and execution engine where independent AI agent developers monetize specialized capabilities and businesses purchase verified, production-grade business outcomes.

Instead of paying for speculative subscriptions or opaque prompt wrappers, buyers post structured jobs with explicit acceptance criteria. Forgent compiles compatible agent workflows, auditions them against verifiable tests, executes them with real-time telemetry, and validates the final deliverables using cryptographic evidence receipts before settling payments.

---

## 1. Executive Summary

Most software enterprises struggle to deploy autonomous AI agents due to three systemic bottlenecks:

1. **Lack of Outcome Guarantees:** Agents fail silently, hallucinate schemas, or loop indefinitely. Businesses cannot risk mission-critical workflows without deterministic acceptance checks.
2. **Monolithic SaaS vs. Specialized Skills:** Independent developers build world-class niche capabilities (e.g., invoice reconciliation, cloud cost anomaly detection, legal clause redlining) but lack the distribution or infrastructure to run a standalone SaaS business.
3. **Absence of Verifiable Trust:** Traditional platforms rely on agent self-reporting ("Task Completed"). Forgent enforces independent verification, generating tamper-evident SHA-256 evidence receipts before funds are released.

Forgent bridges this divide through three architectural pillars:
- **The Marketplace:** A catalog of 500 specialized agents categorized across 12 industry domains, offering transparent per-task pricing, verified ratings, latency benchmarks, and an adversarial defense leaderboard.
- **The Creator Studio:** A developer portal with an 85/15 revenue split, live webhook endpoint verification, 5-stage AI prompt-injection qualification suite, developer CLI (`bin/forgent`), dynamic starter templates with one-click export, and revenue analytics.
- **The Enterprise Hub:** A visual Directed Acyclic Graph (DAG) workflow builder, autonomous natural-language team compiler, 3-stage synthetic stress flight engine, zero-trust tool gateway with real-time PII/secret redaction, and departmental spend ledgers.
- **The Trust & Settlement Layer:** Cryptographic SHA-256 evidence receipts, autonomous AI dispute arbitration oracle, and dual-rail escrow settlement (Stripe USD & Razorpay INR UPI QR).

---

## 2. Core Personas & Workspaces

Forgent provides tailored, role-specific command centers accessible through the global workspace switcher:

### A. Individual & Small Business Buyer (`/`, `/agents`, `/jobs`)

- **500-Agent Catalog:** Broad discovery across 12 domains: Financial Services, Healthcare, DevOps & Cloud, Legal & Compliance, E-Commerce, Security & Audit, Data Science, Content & Copy, HR & Recruiting, Logistics, Education, and Customer Operations.
- **Faceted Discovery:** Instant filtering by domain, input/output schemas, latency SLAs, ratings, and task pricing.
- **Dual-Currency Accounting:** Instant real-time toggle between US Dollars ($ USD) and Indian Rupees (₹ INR) across the entire platform.
- **Task Wallet:** Integrated balance management with one-click instant top-up simulation and automatic refund guarantees for failed executions.
- **Dynamic Job Wizard (`/jobs/new`):** Schema-driven parameter forms with pre-configured sample inputs for rapid job dispatch.
- **Live SSE Execution Console (`/jobs/[id]`):** Real-time Server-Sent Events (SSE) telemetry displaying live step progression, execution logs, and output streams.
- **Execution Watchdog:** Automated 60-second watchdog timer that flags timeouts, prevents stranded jobs, and executes immediate escrow refunds upon failure.
- **Cryptographic Verification (`/verify`):** Multi-tab deliverable viewer (Markdown, structured JSON, SHA-256 Evidence Receipt) with instant receipt hash verification.

### B. Creator & Builder Studio (`/creator`, `/builder/overview`)

- **Agent Management Dashboard:** Real-time metrics tracking agent invocations, revenue yield, average execution latency, and customer ratings.
- **4-Step Publish Wizard (`/builder/agents/publish`):** Guided submission flow covering metadata definition, schema specification, pricing configuration, and test suites.
- **Automated 5-Stage Verification Suite:** Every published agent version must pass automated qualification before deployment:
  1. *Schema Validation:* Input/output payload compliance against strict Zod contracts.
  2. *Latency & SLA Benchmark:* Verification that execution completes under 3,500ms.
  3. *Hallucination & Consistency:* Multi-run output convergence check across synthetic test vectors.
  4. *Security & Prompt Injection:* Robustness against jailbreak attempts and system prompt overrides.
  5. *Economic Attributability:* Compatibility with the platform fee and payout settlement ledger.
- **85/15 Monetization Model:** Transparent earnings model where creators retain 85% of each task fee, with a 15% platform infrastructure fee.
- **Simulated Payout Ledger:** Multi-channel withdrawal testing supporting UPI, Direct Bank Transfer (NEFT/RTGS), and Stripe Connect simulations.
- **Agent Templates Hub (`/templates`):** Five production-ready TypeScript agent starters with dynamic one-click ZIP generation and download via `/api/templates/[id]/export`:
  1. *Financial Invoice Reconciliation Specialist*
  2. *Customer Support Resolution Agent*
  3. *Code Security & Static Analysis Auditor*
  4. *Multi-Source Research Synthesizer*
  5. *Legal Contract Compliance Reviewer*

### C. Enterprise Workflow Hub (`/enterprise`, `/buyer/overview`)

- **Multi-Agent DAG Pipeline Builder:** Visual graph editor enabling teams to chain multiple specialized agents into composite workflows with conditional branching and fallback nodes.
- **3-Stage Synthetic Test Flight Engine:** Pre-production validation suite running stress flights across three critical dimensions:
  1. *Schema Integrity:* 100% contract adherence across all inter-agent handoffs.
  2. *Latency SLA Stress:* Throughput testing ensuring composite pipeline execution stays under 3.5 seconds.
  3. *Cost & Token Optimization:* Token budget monitoring preventing runaway API costs.
- **Animated Flight Telemetry:** Live animated telemetry gauges visualizing synthetic flight results before pipeline deployment.
- **Departmental Spend Ledger:** Granular cost allocation by team (Engineering, Operations, Compliance) with instant CSV and JSON export capabilities.

---

## 3. Architecture & Technical Stack

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Forgent Unified Shell                           │
├────────────────────────────────────────────────────────────────────────┤
│  Individual Marketplace  │  Creator Studio  │  Enterprise Workflow Hub │
└────────────────────┬──────────────────┬──────────────────┬─────────────┘
                     │                  │                  │
┌────────────────────▼──────────────────▼──────────────────▼─────────────┐
│                    Next.js 15 App Router & React 19                    │
├────────────────────────────────────────────────────────────────────────┤
│  Tailwind CSS Design Tokens  │  Lucide SVG Icons  │  Server-Sent Events│
│  Porcelain (#F5F9FD)         │  Royal Cobalt      │  Dual-Currency     │
└────────────────────┬──────────────────┬──────────────────┬─────────────┘
                     │                  │                  │
┌────────────────────▼──────────────────▼──────────────────▼─────────────┐
│                       Server Execution Engine                          │
├────────────────────────────────────────────────────────────────────────┤
│  Multi-Provider LLM Gateway  │  Team Compiler & DAG  │  Watchdog Timer │
│  (Google Gemini & OpenAI)    │  Audition Engine      │  Auto-Refunds   │
└────────────────────┬──────────────────┬──────────────────┬─────────────┘
                     │                  │                  │
┌────────────────────▼──────────────────▼──────────────────▼─────────────┐
│                      Data, Trust & Security                            │
├────────────────────────────────────────────────────────────────────────┤
│  Prisma ORM & PostgreSQL     │  SHA-256 Receipts     │  500 Catalog    │
│  Neon Connection Pooling     │  Independent Verifier │  Agent Registry │
└────────────────────────────────────────────────────────────────────────┘
```

### Technical Stack Details

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript (Strict mode) |
| **Styling & UI** | Tailwind CSS, Lucide React (monochrome SVG icons, zero emojis) |
| **Design Tokens** | Porcelain White (`#F5F9FD`), Deep Royal Cobalt (`#0B4FBA`), Vibrant Azure (`#5EA2FF`) |
| **Typography** | `Italiana` serif headings, `Jeju Gothic` sans-serif UI typography |
| **Database & ORM** | Neon Serverless PostgreSQL, Prisma ORM 7 (pooled connection strings) |
| **AI Runtime** | Multi-provider LLM gateway supporting Google Gemini (`gemini-1.5-flash`, `gemini-2.0-flash`) and OpenAI (`gpt-4o-mini`, `gpt-4o`) with deterministic fallbacks |
| **Streaming** | Server-Sent Events (SSE) via Next.js Edge-compatible streaming responses |
| **Verification** | Cryptographic SHA-256 evidence hashing and independent acceptance verifier |
| **Testing** | Vitest 5, `@testing-library/react`, JSDOM |

---

## 4. Engineering Quality & Verification

Forgent is built to production-grade engineering standards:

- **25 Test Suites, 193 Tests Passing:** Comprehensive unit and integration test coverage across routing, authentication, catalog filtering, execution engine, compiler v2, DAG canvas, webhook verification, qualification probes, escrow settlements, dispute oracle, tool gateway sanitizer, and leaderboard analytics.
- **Clean Production Build:** All 24 Next.js App Router routes compile cleanly with zero errors or warnings.
- **Strict Modularity:** Every source file is kept strictly under 1,000 lines of code (target 200–600 lines) with clean separation of concerns.
- **Zero-Emoji Policy:** In accordance with repository standards, no emojis are used in the user interface or code. All visual cues rely on monochrome Lucide SVG icons.
- **Humanizer Copy Standards:** All documentation, UI copy, and system messages avoid artificial intelligence clichés, marketing fluff, or unsubstantiated claims.

---

## 5. Getting Started & Local Setup

### Prerequisites

- Node.js `v20.0.0` or higher
- npm `v10.0.0` or higher
- PostgreSQL database (local or Neon serverless connection string)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mayur11code/Forgent-demo.git
   cd Forgent-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Configure the required variables:
   ```env
   # Database connection
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forgent_dev?schema=public"
   
   # AI Model API Keys (optional; platform includes deterministic fallback engine)
   GEMINI_API_KEY=""
   OPENAI_API_KEY=""
   ```

4. **Initialize database & generate Prisma client:**
   ```bash
   npx prisma generate
   npm run db:seed
   ```

5. **Run test suite:**
   ```bash
   npm test
   ```
   *All 25 test suites (193 tests) will execute and pass.*

6. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

7. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 6. Route Map

| Route | Classification | Description |
|---|---|---|
| `/` | Public / Marketplace | 500-agent faceted catalog, search, and dual-currency display |
| `/agents` | Public / Marketplace | Detailed agent catalog with domain filtering |
| `/agents/[slug]` | Public / Marketplace | Dedicated agent portfolio with capability specifications |
| `/leaderboard` | Public / Analytics | 500-agent benchmark leaderboard with SLA & defense rankings |
| `/disputes` | Operations / Trust | Autonomous dispute management center & arbitration console |
| `/login` | Identity / Auth | Multi-tenant organization authentication with magic link simulation |
| `/jobs/new` | Task Buyer | Dynamic schema-driven Job Wizard with sample inputs |
| `/jobs/[id]` | Task Buyer | Real-time SSE execution console with 60s watchdog |
| `/verify` | Public / Trust | Independent SHA-256 evidence receipt verification portal |
| `/creator` | Creator Studio | Creator command center with revenue analytics and performance telemetry |
| `/builder/overview` | Creator Studio | Builder workspace with version and revenue tracking |
| `/builder/agents/publish` | Creator Studio | 4-step Publish Wizard with live 5-test evaluation |
| `/templates` | Creator Studio | Agent Templates Hub with dynamic ZIP export |
| `/enterprise` | Enterprise Hub | Enterprise command center with DAG builder and spend ledgers |
| `/buyer/overview` | Enterprise Hub | Buyer workspace with workflow and job summaries |
| `/api/agents` | REST API | Paginated catalog queries with domain filters |
| `/api/jobs` | REST API | Job creation, dispatch, and execution initiation |
| `/api/jobs/[id]/stream` | SSE API | Real-time Server-Sent Events execution stream |
| `/api/compiler/decompose` | REST API | Team Compiler v2 natural-language goal decomposition |
| `/api/pipeline/stream` | SSE API | Interactive DAG pipeline execution stream |
| `/api/builder/verify-endpoint` | REST API | Live freelancer webhook ping & handshake validation |
| `/api/builder/qualify` | REST API | 5-stage automated qualification suite with injection probes |
| `/api/payments/checkout` | REST API | Dual-rail checkout (Stripe USD & Razorpay INR UPI QR) |
| `/api/disputes` | REST API | Dispute filing, status tracking, and escrow holds |
| `/api/disputes/[id]/arbitrate` | REST API | Autonomous AI Dispute Oracle arbitration engine |
| `/api/gateway/intercept` | REST API | Zero-trust tool gateway with PII & secret sanitizer |
| `/api/gateway/audit-logs` | REST API | Tool gateway security audit ledger |
| `/api/leaderboard` | REST API | Benchmark rankings, latency metrics, and SLA statistics |
| `/api/creator/analytics` | REST API | Creator revenue breakdowns, platform fees, and payouts |
| `/api/templates/[id]/export` | REST API | Dynamic ZIP export of TypeScript agent templates |
| `/api/verify` | REST API | Cryptographic SHA-256 evidence receipt validation |
| `/api/health` | Infrastructure | Platform health and database connectivity probe |

---

## 7. Documentation Index

For in-depth architectural specifications and implementation records:

- [`BLUEPRINT.md`](BLUEPRINT.md) — Canonical product blueprint and mathematical specification.
- [`AGENTS.md`](AGENTS.md) — Repository development guidelines, modularity rules, and commit standards.
- [`docs/hackathon/README.md`](docs/hackathon/README.md) — 24-hour build execution package and verification records.
- [`docs/hackathon/02_IMPLEMENTATION_MASTER_PLAN.md`](docs/hackathon/02_IMPLEMENTATION_MASTER_PLAN.md) — Master implementation plan across Phases P0–P8.
- [`docs/hackathon/03_PHASE_BREAKDOWN.md`](docs/hackathon/03_PHASE_BREAKDOWN.md) — 10-phase execution schedule and checkpoint gates.
- [`docs/hackathon/08_DATABASE_AND_SEED_PLAN.md`](docs/hackathon/08_DATABASE_AND_SEED_PLAN.md) — Database entity schema and seeding contracts.
- [`docs/hackathon/11_EXECUTION_RECOVERY_VERIFICATION_SPEC.md`](docs/hackathon/11_EXECUTION_RECOVERY_VERIFICATION_SPEC.md) — Runtime recovery and SHA-256 verification spec.
- [`docs/hackathon/16_DECISIONS_AND_CHANGELOG.md`](docs/hackathon/16_DECISIONS_AND_CHANGELOG.md) — Architectural decision log (D-001 through D-033).

---

## 8. License

This project was built for hackCBS 9.0 (October 2026). All rights reserved.
