"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { AGENTS_DATASET, getAgentBySlug } from "@/data/agents";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  User,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

function JobWizardContent() {
  const searchParams = useSearchParams();
  const agentSlug = searchParams.get("agent");

  const { formatPrice, walletBalanceUsd, topUpWallet, setIsTopUpOpen } = useCurrency();

  const selectedAgent = agentSlug ? getAgentBySlug(agentSlug) : AGENTS_DATASET[0];

  const [jobTitle, setJobTitle] = useState(
    selectedAgent ? `Execute Task: ${selectedAgent.title}` : "Autonomous Work Order"
  );
  const [jobDescription, setJobDescription] = useState(
    "Automate deterministic verification and reconciliation for batch evidence payloads according to declared schema specifications."
  );
  const [inputPayload, setInputPayload] = useState(
    JSON.stringify(
      {
        batchId: "batch_2026_10_30_001",
        priority: "HIGH",
        acceptanceThreshold: 0.99,
        webhookUrl: "https://api.forgent.internal/v1/callbacks",
      },
      null,
      2
    )
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [workOrderId, setWorkOrderId] = useState("");
  const [activeAgentId, setActiveAgentId] = useState<string>(selectedAgent?.id || "agent-001");

  const currentAgent = AGENTS_DATASET.find((a) => a.id === activeAgentId) || selectedAgent || AGENTS_DATASET[0];
  const requiredUsd = currentAgent.pricePerTaskUsd;
  const hasSufficientFunds = walletBalanceUsd >= requiredUsd;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSufficientFunds) {
      setIsTopUpOpen(true);
      return;
    }

    // Deduct simulated escrow
    topUpWallet(-requiredUsd);
    setWorkOrderId(`wo_verified_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cobalt-600 font-semibold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-cobalt-500" />
                <span>Verified Work Order Contract</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">
                Create Task Job
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Configure execution parameters and escrow task funds for autonomous execution.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Agent Picker Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Selected Autonomous Agent
                </label>
                <div className="relative">
                  <select
                    value={activeAgentId}
                    onChange={(e) => setActiveAgentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-slate-200 rounded-xl text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-cobalt-500 cursor-pointer shadow-sm pr-9"
                  >
                    {AGENTS_DATASET.slice(0, 100).map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.title} ({a.category}) — {formatPrice(a.pricePerTaskUsd)} / task
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Job Contract Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-cobalt-500 shadow-sm"
                />
              </div>

              {/* Task Requirements */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Execution Requirements & Acceptance Criteria
                </label>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-cobalt-500 shadow-sm leading-relaxed"
                />
              </div>

              {/* Input Schema / Payload */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Task Input Parameters (JSON Schema)
                </label>
                <textarea
                  rows={6}
                  value={inputPayload}
                  onChange={(e) => setInputPayload(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cobalt-500 shadow-inner"
                />
              </div>

              {/* Escrow & Action Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    hasSufficientFunds
                      ? "bg-cobalt-500 hover:bg-cobalt-600 text-white"
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }`}
                >
                  {hasSufficientFunds ? (
                    <>
                      <span>Lock Escrow & Dispatch Work Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Top Up Wallet ({formatPrice(requiredUsd)} required)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Agent Spec Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Agent Specifications
                </span>
                {currentAgent.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-sans text-base font-bold text-slate-900">
                  {currentAgent.title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{currentAgent.creatorHandle}</span>
                  <span>•</span>
                  <span>{currentAgent.version}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {currentAgent.bio}
              </p>

              <div className="bg-porcelain-100 rounded-xl p-3 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Category:</span>
                  <span className="font-semibold text-slate-900">{currentAgent.category}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Avg Latency:</span>
                  <span className="font-semibold text-slate-900">{currentAgent.latencyMs}ms</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Benchmark:</span>
                  <span className="font-semibold text-emerald-700">{currentAgent.benchmarkScore}% pass</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span>Task Fee:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {formatPrice(currentAgent.pricePerTaskUsd)}
                  </span>
                </div>
              </div>

              {/* Wallet Check */}
              <div className="p-3 bg-porcelain-100 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Wallet Balance:</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(walletBalanceUsd)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Required Escrow:</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(requiredUsd)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span>Status:</span>
                  {hasSufficientFunds ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Funds Available</span>
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">
                      Insufficient Balance
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Success Confirmation */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Work Order Dispatched
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
            Escrow funds of {formatPrice(requiredUsd)} locked in task wallet. Autonomous task execution has begun under verified audit observation.
          </p>

          <div className="bg-porcelain-100 border border-slate-200 rounded-xl p-4 text-left font-mono text-xs mb-6 space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Work Order ID:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[220px]">{workOrderId}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Assigned Agent:</span>
              <span className="font-semibold text-slate-900">{currentAgent.title}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Settlement Amount:</span>
              <span className="font-semibold text-emerald-700">{formatPrice(requiredUsd)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Status:</span>
              <span className="font-semibold text-cobalt-600">AUDITING_EXECUTION</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/buyer/overview"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-cobalt-500 hover:bg-cobalt-600 rounded-xl shadow-sm transition-colors"
            >
              Go to Enterprise Hub
            </Link>
            <Link
              href="/marketplace"
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
            >
              Browse More Agents
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JobNewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-slate-500">Loading Job Wizard...</div>}>
        <JobWizardContent />
      </Suspense>
    </div>
  );
}
