"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/queries/projects";

interface FeaturedSliderProps {
  projects: Project[];
}

export function FeaturedSlider({ projects }: FeaturedSliderProps) {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollWidth - scrollLeft - clientWidth > 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      checkScroll();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [projects]);

  return (
    <div className="relative w-full">
      {/* Slider Viewport */}
      <div
        ref={sliderRef}
        className="flex space-x-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-6 md:px-12 py-10"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center snap-always relative aspect-[16/10] overflow-hidden group cursor-pointer border border-white/5 bg-[#0e0e0e]"
          >
            <Link href={`/projects/${project.slug}`}>
              {/* Media Thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Cinematic Shadow Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text Card overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 space-y-3 z-10">
                <div className="flex items-center space-x-3">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-gold">
                    {project.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="font-sans text-xs text-neutral-400 font-light tracking-widest">
                    {project.year}
                  </span>
                </div>
                <h3 className="font-serif font-light text-2xl md:text-3xl text-white tracking-wide transition-colors duration-300 group-hover:text-brand-gold">
                  {project.title}
                </h3>
                <p className="font-sans text-xs md:text-sm font-light text-neutral-300 line-clamp-2 max-w-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                  {project.description}
                </p>
              </div>

              {/* Frame Accent glow */}
              <div className="absolute inset-0 border border-transparent group-hover:border-brand-gold/30 transition-colors duration-500 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Left Chevron Trigger */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/80 backdrop-blur-md border border-white/5 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-none cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
      )}

      {/* Right Chevron Trigger */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/80 backdrop-blur-md border border-white/5 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 rounded-none cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      )}
    </div>
  );
}
