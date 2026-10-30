import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProofHire — Outcome-Driven AI Marketplace",
  description: "Outcome-driven marketplace for independent AI capabilities, automated auditions, and independent verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen antialiased flex flex-col">
        {/* Persistent Demo Environment Banner */}
        <aside
          role="status"
          aria-label="Demo environment notice"
          className="bg-surface-secondary/90 border-b border-border-subtle px-4 py-1.5 text-xs text-center font-mono tracking-wide flex items-center justify-center gap-3"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-status-warning animate-pulse" />
          <span className="text-status-warning font-semibold">DEMO ENVIRONMENT</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">SEEDED DATA ONLY</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">SIMULATED PAYMENTS & LEDGER</span>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
