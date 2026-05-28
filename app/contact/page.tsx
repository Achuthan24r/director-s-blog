import { Metadata } from "next";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn } from "@/components/animations/fade-in";
import { MapPin, Mail, Calendar, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Agency",
  description: "Securely send project briefs, booking requests, and representation inquiries to Alistair Vance.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="w-full flex-grow bg-black pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <FadeIn direction="up" className="max-w-2xl space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium block">
              BOOKINGS &amp; COLLABORATIONS
            </span>
            <h1 className="font-serif font-light text-4xl md:text-6xl tracking-wide leading-none text-white">
              Initiate <span className="italic font-normal">Contact</span>
            </h1>
            <p className="font-sans text-neutral-400 text-sm font-light leading-relaxed max-w-lg">
              Have a narrative feature script, high-concept commercial outline, or creative project proposal? Drop a secure line below.
            </p>
          </FadeIn>

          {/* Contact Layout Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Form Container (Left) */}
            <div className="lg:col-span-7 bg-[#050505] border border-white/5 p-8 md:p-10 rounded-none relative">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-[60px] pointer-events-none" />
              <ContactForm />
            </div>

            {/* Inquiries Specifications & Interactive Map Board (Right) */}
            <div className="lg:col-span-5 space-y-10">
              
              {/* Direct channels board */}
              <FadeIn direction="right" className="space-y-6">
                <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold pb-3 border-b border-white/5">
                  Direct Specifications
                </h3>
                
                <div className="space-y-5 font-sans text-sm">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs uppercase tracking-wider font-semibold">General Inquiries</h4>
                      <p className="text-xs text-neutral-400 font-light pt-1">inquiries@alistairvance.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Calendar className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs uppercase tracking-wider font-semibold">Global Booking Range</h4>
                      <p className="text-xs text-neutral-400 font-light pt-1">Current scheduling open for Q3-Q4 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Compass className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white text-xs uppercase tracking-wider font-semibold">Production Hubs</h4>
                      <p className="text-xs text-neutral-400 font-light pt-1">London | Paris | Los Angeles</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Styled Vector Map Board */}
              <FadeIn direction="right" delay={0.2} className="bg-[#080808] border border-white/5 p-8 rounded-none relative overflow-hidden aspect-[4/3] flex flex-col justify-between">
                {/* Visual grid gridlines background to evoke drafting/blueprint */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
                    STUDIO COORDINATES
                  </span>
                  <MapPin className="w-4 h-4 text-brand-gold" />
                </div>

                {/* Aesthetic Vector Map Representation */}
                <div className="relative w-full h-24 my-auto flex items-center justify-center">
                  {/* London Node */}
                  <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold ring-4 ring-brand-gold/20 animate-pulse" />
                    <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-400 pt-1">London</span>
                  </div>

                  {/* Connection Vector Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <line x1="25%" y1="33%" x2="70%" y2="50%" stroke="#c5a880" strokeWidth="1" strokeDasharray="3" />
                    <line x1="25%" y1="33%" x2="50%" y2="15%" stroke="#c5a880" strokeWidth="1" strokeDasharray="3" />
                  </svg>

                  {/* Paris Node */}
                  <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-white ring-4 ring-white/10" />
                    <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-400 pt-1">Paris</span>
                  </div>

                  {/* Edinburgh Node */}
                  <div className="absolute top-0 left-1/2 flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-white ring-4 ring-white/10" />
                    <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-400 pt-1">Edinburgh</span>
                  </div>
                </div>

                <div className="relative z-10 text-left">
                  <h4 className="font-sans text-xs text-white uppercase tracking-wider">Alistair Vance Studio</h4>
                  <p className="font-sans text-[10px] text-neutral-500 font-light pt-1">Soho Studio Complex, W1F 0AA, London</p>
                </div>
              </FadeIn>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
