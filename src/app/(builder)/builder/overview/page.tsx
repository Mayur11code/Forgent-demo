import Link from "next/link";

export default function BuilderOverviewPage() {
  return (
    <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 space-y-8">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-border-default pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30">
            Phase 0 Verification
          </span>
          <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-surface-elevated text-zinc-300 border border-border-default">
            Persona: Jordan Lee (Demo Agent Studio Builder)
          </span>
          <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-status-success/20 text-status-success border border-status-success/30">
            Route: /builder/overview
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Builder Studio Command Centre
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          P0 verification placeholder route. Full builder dashboard and package publisher are scheduled for Phase 1 and Phase 2 (P1-A-003, P2-A-005, P2-B-003).
        </p>
      </div>

      {/* Verification Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg border border-border-default bg-surface-primary space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Studio Context</div>
          <div className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-indigo" />
            Demo Agent Studio
          </div>
          <p className="text-xs text-zinc-500">
            Publisher of Evidence Reader, Reconciliation Specialist, and Exception Reporter.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-border-default bg-surface-primary space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Eligible Earnings Target</div>
          <div className="text-base font-semibold text-accent-cyan font-mono">
            ₹5,500 (Simulated)
          </div>
          <p className="text-xs text-zinc-500">
            Stage attribution: v1.1.0 recovery ₹2,500, Reader ₹2,000, Reporter ₹1,000.
          </p>
        </div>

        <div className="p-5 rounded-lg border border-border-default bg-surface-primary space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">System Connectivity</div>
          <div className="text-base font-semibold text-status-success flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-success" />
            Neon PostgreSQL Live
          </div>
          <p className="text-xs text-zinc-500">
            Connection pooling and health probe verified.
          </p>
        </div>
      </div>

      {/* Navigation and Quick Links */}
      <div className="p-6 rounded-lg border border-border-default bg-surface-primary space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300 font-mono">
          Available Development & Foundation Endpoints
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/buyer/overview"
            className="px-4 py-2 bg-surface-elevated hover:bg-surface-secondary text-foreground border border-border-default rounded-md text-sm font-mono transition-colors"
          >
            Switch to Buyer Overview (/buyer/overview) →
          </Link>
          <Link
            href="/dev/tokens"
            className="px-4 py-2 bg-surface-elevated hover:bg-surface-secondary text-accent-indigo border border-border-default rounded-md text-sm font-mono transition-colors"
          >
            Design Token Preview (/dev/tokens) →
          </Link>
          <Link
            href="/api/health"
            target="_blank"
            className="px-4 py-2 bg-surface-elevated hover:bg-surface-secondary text-accent-cyan border border-border-default rounded-md text-sm font-mono transition-colors"
          >
            System Health API (/api/health) →
          </Link>
        </div>
      </div>
    </div>
  );
}
