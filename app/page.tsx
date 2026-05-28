import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { HeroSection } from "@/components/hero/hero-section";
import { FeaturedSlider } from "@/components/cards/featured-slider";
import { getProjects } from "@/lib/queries/projects";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { Film, Award, Tv, Clapperboard } from "lucide-react";

export default async function HomePage() {
  const projects = await getProjects();
  
  // Get latest 4 featured projects for the slider
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="w-full flex-grow">
        {/* Fullscreen Video Hero */}
        <HeroSection />

        {/* Featured Projects Slider */}
        <section id="featured-projects" className="py-24 md:py-32 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
            <FadeIn direction="up" className="space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                SELECTED ARCHIVE
              </span>
              <h2 className="font-serif font-light text-4xl md:text-5xl tracking-wide">
                Featured <span className="italic">Works</span>
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <Link
                href="/projects"
                className="font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-brand-gold transition-colors duration-300 flex items-center space-x-2 group"
              >
                <span>View Full Catalog</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
                </span>
              </Link>
            </FadeIn>
          </div>

          <FeaturedSlider projects={featuredProjects} />
        </section>

        {/* Quick Bios / Cinematic Credo Block */}
        <section className="py-20 md:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
          {/* Subtle glowing radial background */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Artistic Bio Image Grid Frame */}
            <FadeIn direction="left" className="relative aspect-[4/5] bg-neutral-900 border border-white/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600"
                alt="Director Alistair Vance on set"
                className="w-full h-full object-cover opacity-75 filter grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              {/* Tiny specs label */}
              <div className="absolute bottom-6 left-6 font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Alistair Vance — On Set, Paris (2025)
              </div>
            </FadeIn>

            {/* Story Specs */}
            <div className="space-y-8">
              <FadeIn direction="up" className="space-y-4">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                  THE CREATIVE FORCE
                </span>
                <h2 className="font-serif font-light text-4xl md:text-5xl tracking-wide leading-tight text-white">
                  Crafting narrative weight and <span className="italic">visual depth</span>.
                </h2>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} className="space-y-6 text-neutral-400 font-sans font-light text-base leading-relaxed">
                <p>
                  Alistair Vance is an award-winning British director known for his minimalist, high-contrast visual framing and meticulous pacing. Over the past decade, his work has bridged the gap between raw, character-driven storytelling and large-scale cinematic sculpture.
                </p>
                <p>
                  Working worldwide across narrative features, high-end commercial campaigns, and music videos, Alistair leverages custom large-format anamorphic glass to evoke depth, silence, and immediate visceral weight.
                </p>
              </FadeIn>

              {/* Achievements Icons List */}
              <FadeIn direction="up" delay={0.3} className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="font-sans text-xs uppercase tracking-widest text-neutral-300">
                    Grand Prix Winner
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Film className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="font-sans text-xs uppercase tracking-widest text-neutral-300">
                    3 Feature Lengths
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Tv className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="font-sans text-xs uppercase tracking-widest text-neutral-300">
                    50+ Commercials
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clapperboard className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="font-sans text-xs uppercase tracking-widest text-neutral-300">
                    Paris Film Guild
                  </span>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4} className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-colors duration-300 group"
                >
                  <span>Read Full Filmography</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
