"use client";

import React, { useState } from "react";
import { EnterprisePipeline } from "@/lib/contracts/enterprise-types";
import { useCurrency } from "@/context/currency-context";
import {
  GitFork,
  ArrowRight,
  ShieldCheck,
  Clock,
  Coins,
  Layers,
  ChevronRight,
  FileCode,
  Sliders,
  Sparkles,
} from "lucide-react";

interface PipelineBuilderTabProps {
  pipeline: EnterprisePipeline;
  onUpdatePipeline: (updated: EnterprisePipeline) => void;
  onOpenGeneratorModal: () => void;
  onNavigateToTestFlight: () => void;
  allPipelines: EnterprisePipeline[];
  onSelectPipeline: (id: string) => void;
}

export function PipelineBuilderTab({
  pipeline,
  onUpdatePipeline,
  onOpenGeneratorModal,
  onNavigateToTestFlight,
  allPipelines,
  onSelectPipeline,
}: PipelineBuilderTabProps) {
  const { currency, formatPrice } = useCurrency();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    pipeline.nodes[0]?.id || ""
  );

  const selectedNode =
    pipeline.nodes.find((n) => n.id === selectedNodeId) || pipeline.nodes[0];

  // Helper to format paise with dual currency support
  const formatCost = (costPaise: number) => {
    const usd = costPaise / 8000;
    return formatPrice(usd);
  };

  const handleUpdateParameterValue = (
    nodeId: string,
    paramKey: string,
    newValue: string
  ) => {
    const updatedNodes = pipeline.nodes.map((node) => {
      if (node.id !== nodeId) return node;
      const updatedParams = node.inputParameters.map((param) => {
        if (param.key === paramKey) {
          return { ...param, value: newValue };
        }
        return param;
      });
      return { ...node, inputParameters: updatedParams };
    });

    onUpdatePipeline({
      ...pipeline,
      nodes: updatedNodes,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Workflow:
          </label>
          <select
            value={pipeline.id}
            onChange={(e) => onSelectPipeline(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-1 focus:ring-cobalt-500 shadow-2xs"
          >
            {allPipelines.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>

          <span
            className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border font-semibold ${
              pipeline.certificationStatus === "CERTIFIED"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {pipeline.certificationStatus}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenGeneratorModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cobalt-700 bg-cobalt-50 hover:bg-cobalt-100 border border-cobalt-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Custom Workflow</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToTestFlight}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-cobalt-500 hover:bg-cobalt-600 rounded-lg shadow-xs transition-colors"
          >
            <span>Proceed to Test Flight</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pipeline Summary Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 uppercase">
            <Coins className="w-3.5 h-3.5 text-cobalt-600" />
            <span>Run Cost ({currency})</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {formatCost(pipeline.totalCostPaise)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
            ₹{(pipeline.totalCostPaise / 100).toLocaleString("en-IN")} paise
          </div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 uppercase">
            <Clock className="w-3.5 h-3.5 text-cobalt-600" />
            <span>Est. Latency</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {(pipeline.estimatedLatencyMs / 1000).toFixed(2)}s
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-mono">
            &lt; 3.5s SLA Guaranteed
          </div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 uppercase">
            <Layers className="w-3.5 h-3.5 text-cobalt-600" />
            <span>DAG Stages</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {pipeline.nodes.length} Nodes
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
            {pipeline.connections.length} Live Bindings
          </div>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Deployment</span>
          </div>
          <div className="text-base font-bold font-mono text-slate-900 mt-1">
            {pipeline.deploymentStatus === "DEPLOYED_ORG"
              ? "Organization Active"
              : "Draft Spec"}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
            {pipeline.lastTestedAt
              ? `Audited ${new Date(pipeline.lastTestedAt).toLocaleDateString()}`
              : "Pending Test Flight"}
          </div>
        </div>
      </div>

      {/* DAG Visualizer: Multi-Agent Step-by-Step Flow */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <GitFork className="w-4 h-4 text-cobalt-600" />
              <span>Multi-Agent DAG Constructor</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Deterministic sequential execution graph with strongly typed parameter pipes
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Click any node to inspect parameters
          </span>
        </div>

        {/* Step-by-Step DAG Node Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {pipeline.nodes.map((node, index) => {
            const isSelected = node.id === selectedNode?.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative ${
                  isSelected
                    ? "border-cobalt-500 bg-cobalt-50/20 shadow-sm ring-1 ring-cobalt-500"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {/* Stage Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Step {index + 1}: {node.stage}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {(node.estimatedLatencyMs / 1000).toFixed(2)}s
                  </span>
                </div>

                <div className="text-sm font-semibold text-slate-900 line-clamp-1">
                  {node.agentName}
                </div>
                <div className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {node.description}
                </div>

                {/* Node Metadata Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">
                    {formatCost(node.costPaise)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {node.inputParameters.length} in / {node.outputParameters.length} out
                  </span>
                </div>

                {/* Arrow indicator between nodes on desktop */}
                {index < pipeline.nodes.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-300 items-center justify-center text-slate-500 shadow-xs">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Parameter Mappings Overview */}
        <div className="p-3.5 bg-porcelain-100 rounded-lg border border-slate-200 space-y-2">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-cobalt-600" />
            <span>Live Node Parameter Mapping (DAG Pipes)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {pipeline.connections.map((conn) => {
              const fromNode = pipeline.nodes.find((n) => n.id === conn.fromNodeId);
              const toNode = pipeline.nodes.find((n) => n.id === conn.toNodeId);
              return (
                <div
                  key={conn.id}
                  className="p-2.5 bg-white border border-slate-200 rounded-md font-mono flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <span className="text-slate-500">{fromNode?.stageName.split(" ")[0]}.</span>
                    <span className="font-semibold text-cobalt-700">{conn.fromOutputKey}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                  <div className="truncate text-right">
                    <span className="text-slate-500">{toNode?.stageName.split(" ")[0]}.</span>
                    <span className="font-semibold text-slate-800">{conn.toInputKey}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Inspector & Live Parameter Editor */}
      {selectedNode && (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Step Inspector: {selectedNode.stage}
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                {selectedNode.agentName}
              </h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                Agent ID: {selectedNode.agentId}
              </span>
              <span className="px-2.5 py-1 rounded bg-cobalt-50 text-cobalt-700 font-semibold">
                Cost: {formatCost(selectedNode.costPaise)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Parameters Config */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cobalt-600" />
                  <span>Input Parameters</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedNode.inputParameters.length} parameters
                </span>
              </div>

              <div className="space-y-3">
                {selectedNode.inputParameters.map((param) => (
                  <div
                    key={param.key}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-800 font-mono">
                          {param.key}
                        </span>
                        {param.required && (
                          <span className="text-[10px] font-mono text-red-500">*</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 uppercase">
                        {param.type}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500">{param.label}</div>

                    {param.mappedFrom ? (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-cobalt-700 bg-cobalt-50/70 p-1.5 rounded border border-cobalt-200">
                        <span className="text-slate-500">Bound from:</span>
                        <span className="font-semibold">
                          {param.mappedFrom.nodeId}.{param.mappedFrom.outputKey}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={param.value}
                        onChange={(e) =>
                          handleUpdateParameterValue(
                            selectedNode.id,
                            param.key,
                            e.target.value
                          )
                        }
                        className="w-full px-2.5 py-1 text-xs font-mono bg-white border border-slate-300 rounded focus:ring-1 focus:ring-cobalt-500 text-slate-800"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Output Parameters Schema */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-cobalt-600" />
                  <span>Emitted Output Schema</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedNode.outputParameters.length} outputs
                </span>
              </div>

              <div className="space-y-3">
                {selectedNode.outputParameters.map((out) => (
                  <div
                    key={out.key}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800 font-mono">
                        {out.key}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 uppercase">
                        {out.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{out.label}</div>
                    <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-emerald-400 overflow-x-auto">
                      {out.sampleValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
