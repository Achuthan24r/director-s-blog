import { Metadata } from "next";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { MailForm } from "@/components/forms/mail-form";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "Vance Club Room",
  description: "Join Alistair Vance's private cinema collective to receive exclusive screenings, unreleased trailers, and private updates.",
};

export default function MailPage() {
  return (
    <>
      <Navbar />

      <main className="w-full flex-grow bg-black pt-40 pb-32 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Soft glowing ambient luxury background orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-neutral-900/30 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          <FadeIn direction="up" className="glass-panel p-8 md:p-12 text-center space-y-8 rounded-none relative">
            {/* Spec decorative top corner lines */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-gold/30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-gold/30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-gold/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-gold/30" />

            <div className="space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-brand-gold font-medium block">
                PRIVATE CINEMA COLLECTIVE
              </span>
              <h1 className="font-serif font-light text-3xl md:text-4xl tracking-wide text-white">
                Vance Club Room
              </h1>
              <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                Unlock early screeners, offline production dairies, camera test reels, and private screening invitations in London and Paris.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6">
              <MailForm />
            </div>

            <div className="pt-2">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-neutral-600 block">
                Zero spam. Instant revoke available.
              </span>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </>
  );
}
