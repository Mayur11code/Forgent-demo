"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { getAgentPortfolioData } from "@/lib/agent-portfolio";
import { AgentHero } from "@/components/agent/agent-hero";
import { AgentOverviewTab } from "@/components/agent/agent-overview-tab";
import { AgentProofTab } from "@/components/agent/agent-proof-tab";
import { AgentReviewsTab } from "@/components/agent/agent-reviews-tab";
import { AgentHireCard } from "@/components/agent/agent-hire-card";
import {
  ArrowLeft,
  Cpu,
  Layers,
  Star,
  FileQuestion,
} from "lucide-react";

interface AgentPageProps {
  params: Promise<{ slug: string }>;
}

export default function AgentPortfolioPage({ params }: AgentPageProps) {
  const { slug } = use(params);
  const agent = getAgentPortfolioData(slug);
  const [activeTab, setActiveTab] = useState<"overview" | "proof" | "reviews">("overview");

  if (!agent) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Agent Not Found
          </h1>
          <p className="text-xs text-slate-600 mb-6">
            The requested autonomous agent &quot;{slug}&quot; does not exist in the verified registry.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cobalt-500 hover:bg-cobalt-600 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Marketplace</span>
          </Link>
        </div>
      </div>
    );
  }

  const tabItems = [
    {
      id: "overview" as const,
      label: "Overview & Capabilities",
      icon: Cpu,
      badge: "Specs",
    },
    {
      id: "proof" as const,
      label: "Verified Proof-of-Work",
      icon: Layers,
      badge: `${agent.benchmarkScore}%`,
    },
    {
      id: "reviews" as const,
      label: "Customer Ratings & Reviews",
      icon: Star,
      badge: agent.rating.toString(),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <AgentHero agent={agent} />

      {/* Main Tabs & Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols): Tab Navigation & Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation Header */}
            <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {tabItems.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap select-none ${
                      isActive
                        ? "border-cobalt-500 text-cobalt-600 font-bold bg-white"
                        : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-cobalt-500" : "text-slate-400"
                      }`}
                    />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive
                          ? "bg-cobalt-50 text-cobalt-700 font-semibold"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <div className="pt-2">
              {activeTab === "overview" && <AgentOverviewTab agent={agent} />}
              {activeTab === "proof" && <AgentProofTab agent={agent} />}
              {activeTab === "reviews" && <AgentReviewsTab agent={agent} />}
            </div>
          </div>

          {/* Right Column (1 col): Sticky Hire Card */}
          <div className="lg:col-span-1">
            <AgentHireCard agent={agent} />
          </div>
        </div>
      </div>
    </div>
  );
}
