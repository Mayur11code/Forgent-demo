import type { Metadata } from "next";
import { Italiana } from "next/font/google";
import { CurrencyProvider } from "@/context/currency-context";
import { AuthProvider } from "@/context/auth-context";
import { Header } from "@/components/layout/header";
import { TopUpModal } from "@/components/layout/top-up-modal";
import { AuthModal } from "@/components/auth/auth-modal";
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
          <AuthProvider>
            {/* Global Header (Notice Banner & TopNav, hidden on landing page) */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">{children}</main>

            {/* Global Footer */}
            <Footer />

            {/* Dual-Rail Wallet Top-Up Modal */}
            <TopUpModal />

            {/* Multi-Tenant Authentication Modal */}
            <AuthModal />
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
