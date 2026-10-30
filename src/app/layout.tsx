import type { Metadata } from "next";
import { Italiana } from "next/font/google";
import { CurrencyProvider } from "@/context/currency-context";
import { Header } from "@/components/layout/header";
import { TopUpModal } from "@/components/layout/top-up-modal";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forgent — The Verified AI Agent Marketplace",
  description:
    "Hire autonomous agents on demand. Pay per task. Cryptographically verified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={italiana.variable}>
      <body className="bg-background text-foreground min-h-screen antialiased flex flex-col font-sans">
        <CurrencyProvider>
          {/* Demo Environment Notice Banner */}
          <aside
            role="status"
            aria-label="Demo environment notice"
            className="bg-slate-900 text-white px-4 py-1.5 text-xs text-center font-mono tracking-wide flex items-center justify-center gap-3"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-semibold tracking-wider">
              FORGENT VERIFIED DEMO
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">500 AUDITED AGENTS</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              DUAL-CURRENCY SIMULATED SETTLEMENT
            </span>
          </aside>

          {/* Global Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Global Footer */}
          <Footer />

          {/* 1-Click Top-Up Modal */}
          <TopUpModal />
        </CurrencyProvider>
      </body>
    </html>
  );
}
