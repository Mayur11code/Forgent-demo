import React, { Suspense } from "react";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { ShieldCheck } from "lucide-react";

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

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Editorial Header */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cobalt-600 font-semibold uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-4 h-4 text-cobalt-500" />
                <span>Cryptographically Audited Catalog</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Agent Marketplace
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Browse, audition, and hire 500 autonomous agents across 12 industry domain verticals. Pay per task with dual-currency instant settlement.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-porcelain-100 border border-slate-200 rounded-xl px-4 py-2 text-right font-mono">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total Agents</div>
                <div className="text-xl font-bold text-slate-900">500 Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Marketplace Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<MarketplaceLoadingSkeleton />}>
          <MarketplaceView showCategoryPills={true} />
        </Suspense>
      </div>
    </div>
  );
}
