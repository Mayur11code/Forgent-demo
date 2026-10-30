import Link from "next/link";

export default function TokenPreviewPage() {
  return (
    <div className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-10">
      {/* Header */}
      <div className="border-b border-border-default pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30">
              Phase 0 Foundation
            </span>
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-status-success/20 text-status-success border border-status-success/30">
              Neon PostgreSQL Connected
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            ProofHire Design Token & Foundation Preview
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Verification harness for dark graphite B2B console tokens, surface hierarchy, and system health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/buyer/overview"
            className="px-4 py-2 bg-surface-primary hover:bg-surface-secondary text-foreground border border-border-default rounded-md text-sm font-mono transition-colors"
          >
            ← Buyer Overview
          </Link>
          <Link
            href="/api/health"
            target="_blank"
            className="px-4 py-2 bg-surface-elevated hover:bg-surface-secondary text-accent-cyan border border-border-default rounded-md text-sm font-mono transition-colors"
          >
            GET /api/health →
          </Link>
        </div>
      </div>

      {/* Surface Hierarchy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>1. Surface Hierarchy</span>
          <span className="text-xs font-mono text-zinc-500 font-normal">Layered depth</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-lg border border-border-subtle bg-background space-y-2">
            <span className="text-xs font-mono text-zinc-400">--background</span>
            <div className="text-sm font-semibold">Application Base</div>
            <p className="text-xs text-zinc-500">#090a0f Deep graphite viewport canvas</p>
          </div>
          <div className="p-5 rounded-lg border border-border-subtle bg-surface-primary space-y-2">
            <span className="text-xs font-mono text-zinc-400">--surface-primary</span>
            <div className="text-sm font-semibold">Primary Surface</div>
            <p className="text-xs text-zinc-500">#11131a Main content cards & tables</p>
          </div>
          <div className="p-5 rounded-lg border border-border-subtle bg-surface-secondary space-y-2">
            <span className="text-xs font-mono text-zinc-400">--surface-secondary</span>
            <div className="text-sm font-semibold">Secondary Surface</div>
            <p className="text-xs text-zinc-500">#171b26 Sidebars & toolbars</p>
          </div>
          <div className="p-5 rounded-lg border border-border-subtle bg-surface-elevated space-y-2">
            <span className="text-xs font-mono text-zinc-400">--surface-elevated</span>
            <div className="text-sm font-semibold">Elevated Surface</div>
            <p className="text-xs text-zinc-500">#1e2333 Modals & dropdown menus</p>
          </div>
        </div>
      </section>

      {/* Accents & Brand Tokens */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>2. Restrained Accents</span>
          <span className="text-xs font-mono text-zinc-500 font-normal">Functional indicators</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg border border-border-default bg-surface-primary flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-accent-indigo">Indigo Accent</div>
              <div className="text-xs font-mono text-zinc-400">--accent-indigo (#6366f1)</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent-indigo" />
          </div>
          <div className="p-5 rounded-lg border border-border-default bg-surface-primary flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-accent-cyan">Cyan Accent</div>
              <div className="text-xs font-mono text-zinc-400">--accent-cyan (#06b6d4)</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent-cyan" />
          </div>
          <div className="p-5 rounded-lg border border-border-default bg-surface-primary flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-accent-violet">Violet Accent</div>
              <div className="text-xs font-mono text-zinc-400">--accent-violet (#8b5cf6)</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent-violet" />
          </div>
        </div>
      </section>

      {/* Objective Status Tokens */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>3. Objective Status Badges</span>
          <span className="text-xs font-mono text-zinc-500 font-normal">Verification states</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border-default bg-surface-primary space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-status-success/15 text-status-success border border-status-success/30">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
              VERIFIED / PASS
            </span>
            <div className="text-xs text-zinc-500">10/10 acceptance checks pass</div>
          </div>
          <div className="p-4 rounded-lg border border-border-default bg-surface-primary space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-status-warning/15 text-status-warning border border-status-warning/30">
              <span className="w-1.5 h-1.5 rounded-full bg-status-warning" />
              REQUIRES REVIEW
            </span>
            <div className="text-xs text-zinc-500">Inventory commit gate blocked</div>
          </div>
          <div className="p-4 rounded-lg border border-border-default bg-surface-primary space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-status-error/15 text-status-error border border-status-error/30">
              <span className="w-1.5 h-1.5 rounded-full bg-status-error" />
              FAILED / REPLACED
            </span>
            <div className="text-xs text-zinc-500">v1.0.0 schema invalid (?0 payout)</div>
          </div>
          <div className="p-4 rounded-lg border border-border-default bg-surface-primary space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-status-inactive/15 text-status-inactive border border-status-inactive/30">
              <span className="w-1.5 h-1.5 rounded-full bg-status-inactive" />
              PENDING / SEEDED
            </span>
            <div className="text-xs text-zinc-500">Candidate A single-agent baseline</div>
          </div>
        </div>
      </section>

      {/* Typography & Spacing */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span>4. Operational Typography</span>
          <span className="text-xs font-mono text-zinc-500 font-normal">Technical clarity</span>
        </h2>
        <div className="p-6 rounded-lg border border-border-default bg-surface-primary space-y-4 font-mono text-sm">
          <div className="flex justify-between border-b border-border-subtle pb-2">
            <span className="text-zinc-400">Canonical Job ID</span>
            <span className="text-accent-cyan">WH-204</span>
          </div>
          <div className="flex justify-between border-b border-border-subtle pb-2">
            <span className="text-zinc-400">PO / Invoiced / Scanned</span>
            <span className="text-foreground">12 / 12 / 10</span>
          </div>
          <div className="flex justify-between border-b border-border-subtle pb-2">
            <span className="text-zinc-400">Inventory Invariant</span>
            <span className="text-status-success">42 → 42 (Commit Blocked)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Commercial Settlement</span>
            <span className="text-accent-indigo">₹10,000 Total (Builder: ₹5,500)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
