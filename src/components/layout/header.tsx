"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import {
  ChevronDown,
  Layers,
  Sparkles,
  Building2,
  Wallet,
  Plus,
  ArrowRight,
} from "lucide-react";

export type WorkspaceId = "individual" | "creator" | "enterprise";

interface WorkspaceOption {
  id: WorkspaceId;
  name: string;
  role: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WORKSPACES: WorkspaceOption[] = [
  {
    id: "individual",
    name: "Individual Marketplace",
    role: "Autonomous Agent Catalog",
    href: "/marketplace",
    icon: Layers,
  },
  {
    id: "creator",
    name: "Creator Studio",
    role: "Publish & Monetize Agents",
    href: "/builder/overview",
    icon: Sparkles,
  },
  {
    id: "enterprise",
    name: "Enterprise Hub",
    role: "Verified Workflows & Audits",
    href: "/buyer/overview",
    icon: Building2,
  },
];

export function Header() {
  const pathname = usePathname();
  const {
    currency,
    setCurrency,
    walletBalanceUsd,
    walletBalanceInr,
    setIsTopUpOpen,
  } = useCurrency();

  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceOption>(() => {
    if (pathname.startsWith("/builder")) return WORKSPACES[1];
    if (pathname.startsWith("/buyer")) return WORKSPACES[2];
    return WORKSPACES[0];
  });

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Sync workspace on route changes
  useEffect(() => {
    if (pathname.startsWith("/builder")) {
      setActiveWorkspace(WORKSPACES[1]);
    } else if (pathname.startsWith("/buyer")) {
      setActiveWorkspace(WORKSPACES[2]);
    } else {
      setActiveWorkspace(WORKSPACES[0]);
    }
  }, [pathname]);

  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ActiveIcon = activeWorkspace.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Wordmark & Workspace Switcher */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-cobalt-500 text-white flex items-center justify-center font-serif text-xl font-bold tracking-tight shadow-sm group-hover:bg-cobalt-600 transition-colors">
              F
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 leading-none">
                FORGENT
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-0.5">
                Verified Agents
              </span>
            </div>
          </Link>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Workspace Switcher Dropdown */}
          <div className="relative" ref={workspaceRef}>
            <button
              type="button"
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-porcelain-100 hover:bg-slate-100 text-slate-800 text-xs font-medium transition-colors"
              aria-expanded={isWorkspaceOpen}
              aria-haspopup="true"
            >
              <ActiveIcon className="w-3.5 h-3.5 text-cobalt-500" />
              <span className="font-medium">{activeWorkspace.name}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  isWorkspaceOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isWorkspaceOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50">
                <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Select Workspace
                </div>
                {WORKSPACES.map((ws) => {
                  const Icon = ws.icon;
                  const isCurrent = ws.id === activeWorkspace.id;
                  return (
                    <Link
                      key={ws.id}
                      href={ws.href}
                      onClick={() => {
                        setActiveWorkspace(ws);
                        setIsWorkspaceOpen(false);
                      }}
                      className={`flex items-start gap-3 px-3 py-2.5 transition-colors ${
                        isCurrent
                          ? "bg-cobalt-50 text-cobalt-900 font-medium"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? "bg-cobalt-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold">{ws.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {ws.role}
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cobalt-500 self-center" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/marketplace"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === "/marketplace"
                ? "bg-slate-100 text-cobalt-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Marketplace
          </Link>
          <Link
            href="/templates"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === "/templates"
                ? "bg-slate-100 text-cobalt-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Templates
          </Link>
          <Link
            href="/buyer/overview"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname.startsWith("/buyer")
                ? "bg-slate-100 text-cobalt-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Enterprise Hub
          </Link>
          <Link
            href="/builder/overview"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname.startsWith("/builder")
                ? "bg-slate-100 text-cobalt-600 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Creator Studio
          </Link>
          <Link
            href="/#benchmarks"
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Benchmarks
          </Link>
        </nav>

        {/* Right: Currency Toggle & Wallet Badge */}
        <div className="flex items-center gap-3">
          {/* Dual-Currency Switcher */}
          <div className="relative" ref={currencyRef}>
            <button
              type="button"
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-medium text-slate-700 transition-colors"
              aria-label="Switch currency"
            >
              <span className="font-semibold text-cobalt-600">
                {currency === "USD" ? "$" : "₹"}
              </span>
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("USD");
                    setIsCurrencyDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono transition-colors ${
                    currency === "USD"
                      ? "bg-cobalt-50 text-cobalt-900 font-bold"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span>USD ($)</span>
                  <span className="text-slate-400 text-[10px]">US Dollar</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("INR");
                    setIsCurrencyDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono transition-colors ${
                    currency === "INR"
                      ? "bg-cobalt-50 text-cobalt-900 font-bold"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span>INR (₹)</span>
                  <span className="text-slate-400 text-[10px]">Indian Rupee</span>
                </button>
              </div>
            )}
          </div>

          {/* Task Wallet Balance Badge with 1-Click Top-Up */}
          <button
            type="button"
            onClick={() => setIsTopUpOpen(true)}
            className="flex items-center gap-2 pl-2.5 pr-2 py-1 rounded-lg border border-cobalt-200 bg-cobalt-50/60 hover:bg-cobalt-100/80 text-cobalt-900 text-xs font-mono transition-colors group shadow-sm"
            title="Click for instant 1-click wallet top-up"
          >
            <Wallet className="w-3.5 h-3.5 text-cobalt-600" />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-900">
                {currency === "USD"
                  ? `$${walletBalanceUsd.toFixed(2)}`
                  : `₹${walletBalanceInr.toLocaleString("en-IN")}`}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                {currency === "USD"
                  ? `(₹${walletBalanceInr.toLocaleString("en-IN")})`
                  : `($${walletBalanceUsd.toFixed(2)})`}
              </span>
            </div>
            <div className="w-4 h-4 rounded bg-cobalt-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-3 h-3 stroke-[3]" />
            </div>
          </button>

          {/* Post Job / Deploy Agent CTA */}
          <Link
            href="/jobs/new"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Post Job</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
