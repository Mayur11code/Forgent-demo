"use client";

import React, { useState } from "react";
import { useCurrency } from "@/context/currency-context";
import { X, CheckCircle, Wallet, ArrowUpRight, ShieldCheck } from "lucide-react";

export function TopUpModal() {
  const {
    currency,
    isTopUpOpen,
    setIsTopUpOpen,
    walletBalanceUsd,
    walletBalanceInr,
    topUpWallet,
    exchangeRate,
  } = useCurrency();

  const [selectedAmountUsd, setSelectedAmountUsd] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

  if (!isTopUpOpen) return null;

  const usdPresets = [25, 50, 100, 250];

  const handleSelectPreset = (usd: number) => {
    setSelectedAmountUsd(usd);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      if (currency === "USD") {
        setSelectedAmountUsd(parsed);
      } else {
        setSelectedAmountUsd(parsed / exchangeRate);
      }
    }
  };

  const handleConfirm = () => {
    const finalAmountUsd = selectedAmountUsd;
    if (finalAmountUsd <= 0) return;

    topUpWallet(finalAmountUsd);
    setTxHash(`tx_sim_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString(36)}`);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsTopUpOpen(false);
    setIsSuccess(false);
    setCustomAmount("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="top-up-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900">
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-500">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 id="top-up-modal-title" className="text-lg font-semibold text-slate-900 tracking-tight">
                  Task Wallet Top-Up
                </h3>
                <p className="text-xs text-slate-500">
                  Simulated ledger replenishment for task execution settlement
                </p>
              </div>
            </div>

            <div className="bg-porcelain-100 border border-slate-200 rounded-xl p-3.5 mb-5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Current Available Balance
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                  {currency === "USD" ? `$${walletBalanceUsd.toFixed(2)}` : `₹${walletBalanceInr.toLocaleString("en-IN")}`}
                </div>
              </div>
              <div className="text-right text-xs font-mono text-slate-500">
                <div>Dual Rate:</div>
                <div className="text-slate-700 font-medium">1 USD = {exchangeRate} INR</div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Select Top-Up Amount ({currency})
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {usdPresets.map((usd) => {
                  const isSelected = selectedAmountUsd === usd && !customAmount;
                  const label = currency === "USD" ? `$${usd}` : `₹${(usd * exchangeRate).toLocaleString("en-IN")}`;
                  return (
                    <button
                      key={usd}
                      type="button"
                      onClick={() => handleSelectPreset(usd)}
                      className={`py-2 px-1 text-center font-mono text-sm font-semibold rounded-lg border transition-all ${
                        isSelected
                          ? "bg-cobalt-500 text-white border-cobalt-500 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-cobalt-300 hover:bg-slate-50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-slate-400">
                  {currency === "USD" ? "$" : "₹"}
                </span>
                <input
                  type="number"
                  placeholder={`Custom amount in ${currency}`}
                  value={customAmount}
                  onChange={handleCustomChange}
                  min="1"
                  step="1"
                  className="w-full pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cobalt-500 focus:border-transparent font-mono placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-xs mb-5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Simulated cryptographic ledger settlement. Zero credit card required.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2 text-sm font-semibold text-white bg-cobalt-500 hover:bg-cobalt-600 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Confirm Top-Up</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Wallet Credited Successfully
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Simulated settlement committed to the local ledger
            </p>

            <div className="bg-porcelain-100 border border-slate-200 rounded-xl p-3 text-left font-mono text-xs mb-5 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Added:</span>
                <span className="font-semibold text-slate-900">
                  {currency === "USD"
                    ? `+$${selectedAmountUsd.toFixed(2)}`
                    : `+₹${Math.round(selectedAmountUsd * exchangeRate).toLocaleString("en-IN")}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Updated Balance:</span>
                <span className="font-semibold text-emerald-700">
                  {currency === "USD"
                    ? `$${walletBalanceUsd.toFixed(2)}`
                    : `₹${walletBalanceInr.toLocaleString("en-IN")}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px] pt-1 border-t border-slate-200">
                <span>Ref Hash:</span>
                <span className="truncate max-w-[200px]">{txHash}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cobalt-500 hover:bg-cobalt-600 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
