import { Metadata } from "next";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { FadeIn } from "@/components/animations/fade-in";
import { Award, ShieldCheck, Mail, Globe, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Biography",
  description: "Learn more about the artistic vision, creative philosophy, awards, and complete filmography of Alistair Vance.",
};

const TIMELINE_EVENTS = [
  {
    year: "2025",
    title: "Venice Grand Jury Prize",
    subtitle: "Feature Film 'The Last Horizon'",
    description: "Alistair's second feature film, 'The Last Horizon', was selected in official competition at the Venice Film Festival, taking home the prestigious Grand Jury Prize. Critically praised for its claustrophobic camera work and atmospheric depth.",
  },
  {
    year: "2023",
    title: "Clio Awards & Swiss Alps Shoot",
    subtitle: "Titanium Hypercar Campaign",
    description: "Directed the global launch campaign for the new carbon-composite hypercar, shot on location in the Swiss Alps. The commercial won Gold at the Clio Awards for Outstanding Cinematography and Sound Design.",
  },
  {
    year: "2021",
    title: "London Breakthrough Debut",
    subtitle: "National Film & TV School Graduate",
    description: "Graduated with first-class honors from the National Film and Television School (NFTS). His graduation film 'Shadows of the Deep' won Best Student Film at the British Film Guild, securing his first agency signing.",
  },
  {
    year: "2018",
    title: "Berlin Underground Years",
    subtitle: "Experimental Music Videos & Shadows",
    description: "Lived and worked in Berlin, directing micro-budget music videos and visual projects for underground techno labels. Here, Alistair perfected his signature low-light, high-grain 35mm anamorphic style.",
  }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="w-full flex-grow bg-black pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* 1. HERO PROFILE & BIO SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Bio Photo grid (Left) */}
            <div className="lg:col-span-5 relative aspect-[3/4] bg-[#0c0c0c] border border-white/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600"
                alt="Alistair Vance portrait"
                className="w-full h-full object-cover filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Creative Philosophy Text (Right) */}
            <div className="lg:col-span-7 space-y-8">
              <FadeIn direction="up" className="space-y-4">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                  BIOGRAPHY & VISION
                </span>
                <h1 className="font-serif font-light text-4xl md:text-6xl text-white tracking-wide leading-tight">
                  Seeking <span className="italic font-normal text-brand-gold">silence</span> in high-contrast frames.
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} className="font-sans font-light text-neutral-400 text-sm md:text-base leading-relaxed space-y-6 max-w-2xl">
                <p>
                  Alistair Vance is a director whose signature relies on what remains unsaid. Fascinatingly drawn to stories of solitude, human friction, and majestic architecture, Alistair constructs frames that are deliberate, stark, and deeply textured.
                </p>
                <p>
                  Born in Edinburgh and based between London and Paris, Alistair spent his early twenties shooting underground short films on super-8 and 16mm analog stocks. This tactile foundation continues to influence his large-format digital pipeline, blending film grain emulations, anamorphic distortion, and atmospheric natural lighting.
                </p>
                <p>
                  He believes that a film is not merely a collection of words and plots, but an environment of light, shadow, and heavy silence that must envelope the viewer entirely.
                </p>
              </FadeIn>
            </div>
          </section>

          {/* 2. CHRONOLOGICAL MILESTONES TIMELINE */}
          <section className="space-y-16 border-t border-white/5 pt-20">
            <FadeIn direction="up" className="max-w-xl space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                THE CHRONICLES
              </span>
              <h2 className="font-serif font-light text-3xl md:text-5xl text-white tracking-wide">
                Key <span className="italic">Milestones</span>
              </h2>
            </FadeIn>

            {/* Timeline Vertical Stack */}
            <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
              {TIMELINE_EVENTS.map((event, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12 group">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 -translate-x-[6.5px] w-3 h-3 bg-neutral-900 border border-white/20 group-hover:border-brand-gold group-hover:bg-brand-gold transition-colors duration-500 rounded-full" />
                  
                  {/* Content grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Year Label */}
                    <div className="md:col-span-2">
                      <span className="font-serif font-light text-3xl text-brand-gold block group-hover:scale-105 transition-transform duration-300">
                        {event.year}
                      </span>
                    </div>

                    {/* Description Details */}
                    <div className="md:col-span-10 space-y-2">
                      <FadeIn direction="up" className="space-y-1">
                        <h3 className="font-sans text-lg text-white font-medium tracking-wide">
                          {event.title}
                        </h3>
                        <p className="font-sans text-xs text-neutral-500 uppercase tracking-widest">
                          {event.subtitle}
                        </p>
                        <p className="font-sans font-light text-neutral-400 text-sm leading-relaxed max-w-2xl pt-2">
                          {event.description}
                        </p>
                      </FadeIn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. AWARDS & AGENCY REPRESENTATION */}
          <section className="border-t border-white/5 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Awards listing */}
            <div className="space-y-8">
              <FadeIn direction="up" className="space-y-2">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                  RECOGNITION
                </span>
                <h3 className="font-serif font-light text-2xl md:text-3xl text-white tracking-wide">
                  Awards &amp; <span className="italic">Honors</span>
                </h3>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} className="space-y-4">
                <div className="flex items-start space-x-4 p-5 glass-panel">
                  <Award className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-white tracking-wide">Grand Jury Prize &mdash; Venice Film Festival</h4>
                    <p className="font-sans text-xs text-neutral-500 font-light pt-1">Winner for &ldquo;The Last Horizon&rdquo; (2025)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-5 glass-panel">
                  <Award className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-white tracking-wide">Outstanding Cinematography &mdash; Clio Awards</h4>
                    <p className="font-sans text-xs text-neutral-500 font-light pt-1">Winner for Carbon-Composite Hypercar Campaign (2023)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-5 glass-panel">
                  <Award className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-white tracking-wide">Best Student Director &mdash; British Film Guild</h4>
                    <p className="font-sans text-xs text-neutral-500 font-light pt-1">Nominated &amp; Winner (2021)</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Agency Contact Roll */}
            <div className="space-y-8">
              <FadeIn direction="up" className="space-y-2">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                  REPRESENTATION
                </span>
                <h3 className="font-serif font-light text-2xl md:text-3xl text-white tracking-wide">
                  Global <span className="italic">Agents</span>
                </h3>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} className="space-y-6 font-sans text-sm">
                <div className="p-6 glass-panel space-y-4 rounded-none">
                  <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold text-brand-gold">
                    Commercials &mdash; Lux Artists
                  </h4>
                  <div className="space-y-2 text-xs text-neutral-400 font-light">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      <span>London &amp; Paris Agency Office</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-600" />
                      <span>commercials@luxartists.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-3.5 h-3.5 text-neutral-600" />
                      <span>luxartists.net</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 glass-panel space-y-4 rounded-none">
                  <h4 className="text-white text-xs uppercase tracking-[0.2em] font-bold text-brand-gold">
                    Narrative &mdash; United Agents
                  </h4>
                  <div className="space-y-2 text-xs text-neutral-400 font-light">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      <span>London Soho Office</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-600" />
                      <span>narratives@unitedagents.co.uk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-3.5 h-3.5 text-neutral-600" />
                      <span>unitedagents.co.uk</span>
                    </div>
                  </div>
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
