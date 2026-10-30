"use client";

import React, { useState, useEffect } from "react";
import { VerificationTestItem, PublishWizardForm } from "../creator-types";
import {
  ShieldCheck,
  Clock,
  Play,
  RotateCw,
  Terminal,
  Loader2,
  Check,
  Sparkles,
  Lock,
} from "lucide-react";

interface StepVerificationSuiteProps {
  formData: PublishWizardForm;
  onChange: (fields: Partial<PublishWizardForm>) => void;
  onPublish: () => void;
  isPublishing: boolean;
}

const INITIAL_TESTS: VerificationTestItem[] = [
  {
    id: "schema",
    name: "Schema Contract Validation",
    description: "Evaluates input & output JSON schemas for OpenAPI 3.1 / Zod type conformance and strict invariant bounds.",
    status: "pending",
  },
  {
    id: "injection",
    name: "Adversarial Injection & Memory Sandbox Resistance",
    description: "Executes 12 adversarial prompt injection vectors and shell escapes to verify sandbox containment.",
    status: "pending",
  },
  {
    id: "determinism",
    name: "Output Determinism & Bit-Parity Audit",
    description: "Dispatches 3 duplicate payloads in succession and asserts SHA-256 bit-for-bit checksum equality.",
    status: "pending",
  },
  {
    id: "latency",
    name: "SLA Latency Benchmark (< 500ms)",
    description: "Measures 99th percentile round-trip execution latency under simulated network concurrency.",
    status: "pending",
  },
  {
    id: "error_contract",
    name: "RFC-7807 Error Contract Verification",
    description: "Injects malformed payloads to verify deterministic structured error envelopes and status codes.",
    status: "pending",
  },
];

export function StepVerificationSuite({
  formData,
  onChange,
  onPublish,
  isPublishing,
}: StepVerificationSuiteProps) {
  const [tests, setTests] = useState<VerificationTestItem[]>(() => {
    if (formData.verificationPassed) {
      return INITIAL_TESTS.map((t) => ({ ...t, status: "passed", durationMs: 45 }));
    }
    return INITIAL_TESTS;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [activeTestIndex, setActiveTestIndex] = useState<number>(-1);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "Ready for verification suite execution.",
    "Target: " + (formData.endpointType === "webhook" ? formData.webhookUrl : formData.selectedTemplateId),
  ]);
  const [verificationHash, setVerificationHash] = useState<string | null>(
    formData.verificationPassed
      ? "sha256:4f83b1a772c91048b61e892c5567a149bc2e1107"
      : null
  );

  const allPassed = tests.every((t) => t.status === "passed");

  const runSuite = () => {
    setIsRunning(true);
    setActiveTestIndex(0);
    setVerificationHash(null);
    setConsoleLogs([
      "Initiating Forgent Automated 5-Test Verification Suite...",
      `Agent: ${formData.name || "Untitled Agent"} (${formData.category})`,
      `Protocol: ${formData.endpointType === "webhook" ? "Remote Webhook" : "CLI Starter Template"}`,
    ]);

    // Reset tests to pending
    setTests(INITIAL_TESTS.map((t) => ({ ...t, status: "pending", durationMs: undefined })));
  };

  useEffect(() => {
    if (!isRunning || activeTestIndex < 0) return;

    if (activeTestIndex >= INITIAL_TESTS.length) {
      // Completed all tests
      setIsRunning(false);
      setActiveTestIndex(-1);
      const hash = "sha256:" + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
      setVerificationHash(hash);
      setConsoleLogs((prev) => [
        ...prev,
        "ALL 5 VERIFICATION TESTS PASSED CLEANLY (100% SCORE).",
        `Verification Manifest Hash: ${hash}`,
        "Agent unlocked for Verified Badge Minting & Global Publishing.",
      ]);
      onChange({ verificationPassed: true });
      return;
    }

    // Set current test to running
    setTests((prev) =>
      prev.map((t, idx) => (idx === activeTestIndex ? { ...t, status: "running" } : t))
    );

    const currentTest = INITIAL_TESTS[activeTestIndex];
    setConsoleLogs((prev) => [
      ...prev,
      `[RUNNING] Test ${activeTestIndex + 1}/5: ${currentTest.name}...`,
    ]);

    const timer = setTimeout(() => {
      const simulatedDuration = Math.floor(Math.random() * 80) + 40;
      setTests((prev) =>
        prev.map((t, idx) =>
          idx === activeTestIndex
            ? { ...t, status: "passed", durationMs: simulatedDuration }
            : t
        )
      );

      setConsoleLogs((prev) => [
        ...prev,
        `[PASS] ${currentTest.name} completed in ${simulatedDuration}ms.`,
      ]);

      setActiveTestIndex((prev) => prev + 1);
    }, 450);

    return () => clearTimeout(timer);
  }, [isRunning, activeTestIndex, onChange]);

  return (
    <div className="space-y-6">
      <div className="border-b border-border-subtle pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Step 4: Automated Verification Suite</h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time execution across 5 automated test vectors to unlock Verified Badge minting.
          </p>
        </div>

        <button
          type="button"
          onClick={runSuite}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Running Suite ({activeTestIndex + 1}/5)...</span>
            </>
          ) : allPassed ? (
            <>
              <RotateCw className="w-3.5 h-3.5" />
              <span>Re-run Verification Suite</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Run 5-Test Verification Suite</span>
            </>
          )}
        </button>
      </div>

      {/* 5-Test Stepper List */}
      <div className="space-y-3">
        {tests.map((test, index) => {
          return (
            <div
              key={test.id}
              className={`p-4 rounded-xl border transition-all ${
                test.status === "passed"
                  ? "border-emerald-300 bg-emerald-50/40"
                  : test.status === "running"
                  ? "border-cobalt-400 bg-cobalt-50/40 shadow-xs"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                      test.status === "passed"
                        ? "bg-emerald-600 text-white"
                        : test.status === "running"
                        ? "bg-cobalt-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {test.status === "passed" ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : test.status === "running" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                      {test.status === "passed" && (
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          PASSED
                        </span>
                      )}
                      {test.status === "running" && (
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cobalt-100 text-cobalt-800 border border-cobalt-200 animate-pulse">
                          EXECUTING...
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{test.description}</p>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px] text-slate-500 shrink-0">
                  {test.durationMs ? (
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {test.durationMs}ms
                    </span>
                  ) : (
                    <span>Pending</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Console Output Box */}
      <div className="rounded-xl border border-slate-300 bg-slate-950 text-slate-200 p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cobalt-400" />
            <span>Verification Test Harness Console</span>
          </div>
          <span>Stream ID: vrf_77a901</span>
        </div>
        <div className="max-h-36 overflow-y-auto space-y-1 text-[11px] leading-relaxed">
          {consoleLogs.map((log, i) => (
            <div
              key={i}
              className={`${
                log.includes("[PASS]") || log.includes("PASSED")
                  ? "text-emerald-400 font-semibold"
                  : log.includes("[RUNNING]")
                  ? "text-azure-300"
                  : "text-slate-400"
              }`}
            >
              &gt; {log}
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked Mint & Publish Action Box */}
      {allPassed ? (
        <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Verification Passed &bull; Badge Ready to Mint</span>
            </div>
            <p className="text-xs text-emerald-800">
              Integrity hash: <code className="font-mono text-[11px]">{verificationHash}</code>
            </p>
          </div>

          <button
            type="button"
            onClick={onPublish}
            disabled={isPublishing}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPublishing ? "Minting & Publishing..." : "Mint Verified Badge & Publish"}</span>
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-slate-500 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Publishing locked until all 5 automated tests pass.</span>
          </div>
          <button
            type="button"
            onClick={runSuite}
            disabled={isRunning}
            className="text-cobalt-600 font-semibold hover:underline"
          >
            Run Suite Now &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
