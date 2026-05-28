"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Project } from "@/lib/queries/projects";

interface ProjectsCatalogProps {
  initialProjects: Project[];
}

const CATEGORIES = ["All", "Feature Film", "Commercial", "Documentary", "Music Video"];

export function ProjectsCatalog({ initialProjects }: ProjectsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  // Filters projects based on Category & Search
  const filteredProjects = React.useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-12">
      {/* Filtering Header Interface */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 space-x-6 md:space-x-8">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="relative py-2 font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer flex-shrink-0"
              >
                <span className={isSelected ? "text-brand-gold font-medium" : ""}>
                  {category}
                </span>
                {isSelected && (
                  <motion.span
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Minimal Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/5 py-2.5 pl-4 pr-10 text-xs tracking-wider text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-brand-gold transition-colors duration-300 font-sans"
          />
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-neutral-600 pointer-events-none" />
        </div>
      </div>

      {/* Projects Fluid Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isAnyHovered = hoveredId !== null;
            const isThisHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: isAnyHovered && !isThisHovered ? 0.35 : 1,
                  scale: 1,
                  filter: isAnyHovered && !isThisHovered ? "blur(3px)" : "blur(0px)"
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative aspect-[16/11] bg-[#0e0e0e] border border-white/5 overflow-hidden group cursor-pointer"
              >
                <Link href={`/projects/${project.slug}`}>
                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5 group-hover:via-black/40 transition-colors duration-300" />

                  {/* Dynamic Project Metadata */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end space-y-2 z-10">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-brand-gold">
                      {project.category}
                    </span>
                    <h3 className="font-serif font-light text-xl text-white tracking-wide group-hover:text-brand-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-t border-white/10 mt-1">
                      <span className="font-sans text-[10px] text-neutral-400 tracking-widest">
                        {project.year}
                      </span>
                      <span className="font-sans text-[10px] text-brand-gold uppercase tracking-[0.2em]">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Titanium border glow */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-brand-gold/20 transition-colors duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 text-center space-y-2"
          >
            <p className="font-serif italic text-lg text-neutral-400">
              No matching projects found
            </p>
            <p className="font-sans text-xs text-neutral-600 uppercase tracking-widest">
              Try adjusting your query or category filters
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
