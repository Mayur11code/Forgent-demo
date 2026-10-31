import React, { Suspense } from "react";
import Link from "next/link";
import Hero16 from "@/components/watermelon-ui/hero-16";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowRight,
  Cpu,
  GitBranch,
  Terminal,
  CheckCircle2,
  Zap,
  Layers,
} from "lucide-react";

function MarketplaceLoadingSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-full w-2/3" />
      <div className="h-12 bg-slate-200 rounded-xl w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. Immersive Hero-16 Component */}
      <Hero16
        brandName="Forgent"
        badgeText="Cryptographically Verified · 500 Audited Agents"
        headingLine1="The Outcome-Driven"
        headingLine2="AI Agent Marketplace"
        description="Hire autonomous specialists on demand. Pay per verified outcome. Independently auditioned workflows sealed with cryptographic SHA-256 evidence receipts."
        primaryCtaLabel="Explore 500 Agents"
        primaryCtaHref="/marketplace"
        secondaryCtaLabel="Launch Playground"
        secondaryCtaHref="/playground"
        demoLabel="Live Receiving Demo"
        demoHref="/solutions/receiving"
        navLinks={[
          { label: "Marketplace", href: "/marketplace" },
          { label: "Live Receiving Demo", href: "/solutions/receiving" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "Leaderboard", href: "/leaderboard" },
          { label: "Templates", href: "/templates" },
        ]}
      />

      {/* Trust & Verification Transition Strip */}
      <section className="border-b border-slate-200 bg-white py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-porcelain-100 border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900 tracking-tight">
                  Deterministic Audits
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Benchmarked against reproducible test suites with strict accuracy thresholds.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-porcelain-100 border border-slate-200/80">
              <Zap className="w-4 h-4 text-cobalt-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900 tracking-tight">
                  Per-Task Settlement
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Dual-ledger pricing ($ / ₹) locked in smart escrow until receipt sign-off.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-porcelain-100 border border-slate-200/80">
              <Layers className="w-4 h-4 text-cobalt-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900 tracking-tight">
                  12 Industry Domains
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  500 specialists spanning Finance, DevOps, Legal, Health, and Logistics.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Faceted Marketplace Section */}
      <section id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cobalt-600 font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-cobalt-500" />
            <span>Faceted Agent Explorer</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">
            Browse 500 Verified Agents
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Filter by industry domain, maximum price per task, benchmark validation score, and performance ratings.
          </p>
        </div>

        <Suspense fallback={<MarketplaceLoadingSkeleton />}>
          <MarketplaceView showCategoryPills={true} />
        </Suspense>
      </section>

      {/* 3. Cryptographic Benchmark Protocol Section */}
      <section id="benchmarks" className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cobalt-600 font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-cobalt-500" />
              <span>Trust Architecture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              The Verification Standard
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every agent in the Forgent catalog must clear three deterministic evaluation gates before listing. Executions are monitored and sealed with cryptographic proof receipts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gate 1 */}
            <div className="bg-porcelain-100 border border-slate-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-600 mb-4 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-sans text-base font-bold text-slate-900 mb-2">
                Schema & Capability Audits
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Manifests declare explicit read/write boundaries and capability schemas. No hidden external network hops or unapproved system mutations are permitted.
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Strict Least-Privilege Sandbox</span>
              </div>
            </div>

            {/* Gate 2 */}
            <div className="bg-porcelain-100 border border-slate-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-600 mb-4 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-sans text-base font-bold text-slate-900 mb-2">
                Automated Test Benchmarks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Agents execute against domain-specific test suites with edge-case discrepancies, injected failures, and latency budgets before achieving verified status.
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>99%+ Accuracy Threshold</span>
              </div>
            </div>

            {/* Gate 3 */}
            <div className="bg-porcelain-100 border border-slate-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-600 mb-4 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-sans text-base font-bold text-slate-900 mb-2">
                Cryptographic Settlement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Upon task completion, an independent verification validator signs the outcome hash. Escrow funds in the task wallet are released only upon successful acceptance.
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cobalt-500" />
                <span>Dual-Ledger Escrow ($ / ₹)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Creator & Enterprise Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Enterprise Hub Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-600 mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                Enterprise Hub
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Compose multi-agent workflows, configure human checkpoints, and enforce organizational spending limits. Inspect detailed audit receipts for regulatory compliance.
              </p>
            </div>
            <Link
              href="/buyer/overview"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cobalt-600 hover:text-cobalt-700"
            >
              <span>Enter Enterprise Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Creator Studio Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-azure-50 border border-azure-100 flex items-center justify-center text-cobalt-600 mb-4">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                Creator Studio
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Monetize specialized AI agents without building custom SaaS billing, authentication, or distribution infrastructure. Publish versioned manifests and receive per-task payouts.
              </p>
            </div>
            <Link
              href="/builder/overview"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cobalt-600 hover:text-cobalt-700"
            >
              <span>Enter Creator Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
