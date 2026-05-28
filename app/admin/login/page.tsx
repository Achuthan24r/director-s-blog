import { Suspense } from "react";
import { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vance Control Gate",
  description: "Secure, authenticated gate access to Alistair Vance's director database control dashboard.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-between py-12 px-6 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Back */}
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center z-10">
        <Link href="/" className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-colors duration-300">
          &larr; Return to main site
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md mx-auto my-auto z-10">
        <div className="glass-panel p-8 md:p-12 space-y-8 rounded-none relative">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500/30" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500/30" />

          {/* Icon and Branding */}
          <div className="text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-gold mx-auto" />
            <h1 className="font-serif font-light text-2xl tracking-wide text-white">
              Vance Control Gate
            </h1>
            <p className="font-sans text-xs text-neutral-500 font-light">
              Authenticated administration access only. Public actions logged.
            </p>
          </div>

          {/* Suspended Client Form */}
          <Suspense
            fallback={
              <div className="text-center py-6 font-sans text-xs text-neutral-500 animate-pulse">
                Initializing Gate Protocols...
              </div>
            }
          >
            <LoginForm />
          </Suspense>

          {/* Sandbox evaluation alert note */}
          <div className="pt-2 border-t border-white/5 text-center">
            <span className="font-sans text-[9px] text-neutral-600 block leading-relaxed uppercase tracking-wider">
              Evaluation Credentials:
              <br />
              <span className="text-neutral-500 font-semibold lowercase">admin@alistairvance.com</span>
              &nbsp;/&nbsp;
              <span className="text-neutral-500 font-semibold lowercase">vancecinema2026</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center z-10">
        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-neutral-600">
          ALISTAIR VANCE SECURE NET &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
