import { Metadata } from "next";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { ProjectsCatalog } from "@/components/gallery/projects-catalog";
import { getProjects } from "@/lib/queries/projects";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "Works Archive",
  description: "Browse the selected filmography, high-end commercials, narrative features, and creative projects directed by Alistair Vance.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />

      <main className="w-full flex-grow bg-black pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header Typography */}
          <FadeIn direction="up" className="max-w-2xl space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium block">
              FILM CATALOGUE
            </span>
            <h1 className="font-serif font-light text-4xl md:text-6xl tracking-wide leading-none text-white">
              Selected <span className="italic">Productions</span>
            </h1>
            <p className="font-sans text-neutral-400 text-sm font-light leading-relaxed max-w-lg">
              Explore a curated selection of films, commercials, and visual expressions mapping the intersection of narrative composition and atmospheric silence.
            </p>
          </FadeIn>

          {/* Interactive Catalog */}
          <ProjectsCatalog initialProjects={projects} />
        </div>
      </main>

      <Footer />
    </>
  );
}
