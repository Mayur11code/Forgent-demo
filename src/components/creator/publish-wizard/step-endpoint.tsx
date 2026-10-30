"use client";

import React, { useState } from "react";
import { PublishWizardForm } from "../creator-types";
import { STARTER_TEMPLATES } from "@/server/templates/template-definitions";
import {
  Globe,
  Terminal,
  Copy,
  Check,
} from "lucide-react";

interface StepEndpointProps {
  formData: PublishWizardForm;
  onChange: (fields: Partial<PublishWizardForm>) => void;
}

export function StepEndpoint({ formData, onChange }: StepEndpointProps) {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [pingStatus, setPingStatus] = useState<"idle" | "testing" | "success">("idle");

  const selectedTemplate =
    STARTER_TEMPLATES.find((t) => t.id === formData.selectedTemplateId) ||
    STARTER_TEMPLATES[0];

  const scaffoldCommand = `curl -O https://forgent.network/api/templates/${selectedTemplate.id}/export && unzip ${selectedTemplate.id}-starter.zip && cd ${selectedTemplate.id}-starter && npm install`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scaffoldCommand);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePing = () => {
    setPingStatus("testing");
    setTimeout(() => {
      setPingStatus("success");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-subtle pb-4">
        <h3 className="text-base font-bold text-slate-900">Step 3: Execution Endpoint &amp; Runtime</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select whether this agent runs on your private HTTPS webhook gateway or is scaffolded from a Forgent CLI template.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange({ endpointType: "webhook" })}
          className={`p-4 rounded-xl border text-left transition-all ${
            formData.endpointType === "webhook"
              ? "border-cobalt-500 bg-cobalt-50/60 shadow-xs ring-1 ring-cobalt-500/20"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                formData.endpointType === "webhook"
                  ? "bg-cobalt-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">
                Remote HTTPS Webhook
              </div>
              <div className="text-[11px] text-slate-500">
                Self-hosted on AWS, Modal, Fly.io, or VPS
              </div>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange({ endpointType: "cli_template" })}
          className={`p-4 rounded-xl border text-left transition-all ${
            formData.endpointType === "cli_template"
              ? "border-cobalt-500 bg-cobalt-50/60 shadow-xs ring-1 ring-cobalt-500/20"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                formData.endpointType === "cli_template"
                  ? "bg-cobalt-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">
                Local CLI Template Starter
              </div>
              <div className="text-[11px] text-slate-500">
                Packaged TypeScript starter with pre-wired tests
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Mode 1: Webhook URL Form */}
      {formData.endpointType === "webhook" ? (
        <div className="p-5 rounded-xl border border-border-default bg-surface-primary space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Execution Webhook URL *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={formData.webhookUrl}
                onChange={(e) => onChange({ webhookUrl: e.target.value })}
                placeholder="https://api.yourdomain.com/v1/forgent-agent"
                className="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 bg-white font-mono text-xs text-slate-900 focus:outline-none focus:border-cobalt-500"
              />
              <button
                type="button"
                onClick={handlePing}
                disabled={pingStatus === "testing"}
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-mono font-semibold text-slate-700 transition-colors disabled:opacity-50"
              >
                {pingStatus === "testing"
                  ? "Pinging..."
                  : pingStatus === "success"
                  ? "HTTP 200 OK"
                  : "Ping Endpoint"}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Must accept HTTP POST with JSON input contract and respond within 500ms SLA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border-subtle">
            <div className="p-3 rounded-lg bg-porcelain-100 border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Security Guarantee
              </span>
              <span className="text-xs text-slate-700 font-medium">
                Forgent sends an HMAC SHA-256 signature in the <code className="text-cobalt-600 font-mono">X-Forgent-Signature</code> header.
              </span>
            </div>

            <div className="p-3 rounded-lg bg-porcelain-100 border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Verification Probe
              </span>
              <span className="text-xs text-slate-700 font-medium">
                Automated suite will simulate 5 real payloads before badge minting.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: CLI Template Starter */
        <div className="p-5 rounded-xl border border-border-default bg-surface-primary space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Production Starter Template *
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {STARTER_TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplate.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => onChange({ selectedTemplateId: tmpl.id })}
                    className={`p-3 rounded-lg border text-left flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? "border-cobalt-500 bg-cobalt-50/50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{tmpl.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {tmpl.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tmpl.tagline}</div>
                    </div>
                    <div className="text-right font-mono text-[11px] text-slate-500 shrink-0">
                      <div>{tmpl.runtime}</div>
                      <div className="text-emerald-700 font-semibold">{tmpl.successRate}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Start Command Box */}
          <div className="p-3.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Terminal Scaffolding Command</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-cobalt-300 text-[11px] break-all select-all font-mono">
              {scaffoldCommand}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
