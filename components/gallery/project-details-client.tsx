"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Share2, Check, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Project } from "@/lib/queries/projects";
import { FadeIn } from "@/components/animations/fade-in";

interface ProjectDetailsClientProps {
  project: Project;
  gallery: string[];
  nextProject: Project | null;
}

export function ProjectDetailsClient({ project, gallery, nextProject }: ProjectDetailsClientProps) {
  const [isCopied, setIsCopied] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const galleryRef = React.useRef<HTMLDivElement>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-black min-h-screen text-foreground relative pb-20">
      {/* 1. Fullscreen Cinematic Header Banner */}
      <section className="relative w-full h-[85vh] overflow-hidden flex items-end">
        {/* Background Image Banner */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.banner_url}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-[1.02]"
        />

        {/* Cinematic shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

        {/* Inner Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16 space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2.5 text-xs uppercase tracking-widest text-neutral-400 hover:text-brand-gold transition-colors duration-300 group focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to archive</span>
          </Link>

          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
              {project.category}
            </span>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS & CREDITS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 border-b border-white/5">
        {/* About project text */}
        <div className="lg:col-span-2 space-y-6">
          <FadeIn direction="up" className="space-y-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold">
              The Synopsis
            </h2>
            <p className="font-serif font-light text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-2xl italic">
              &ldquo;{project.description?.split(".")[0]}.&rdquo;
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className="font-sans font-light text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl space-y-4">
            <p>{project.description}</p>
          </FadeIn>
        </div>

        {/* Credits Specs Sidebar */}
        <FadeIn direction="right" className="bg-[#080808] border border-white/5 p-8 space-y-6 rounded-none">
          <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold pb-4 border-b border-white/5">
            Production Credits
          </h3>
          <div className="space-y-4 font-sans text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Year</span>
              <span className="text-neutral-200 uppercase tracking-widest">{project.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Category</span>
              <span className="text-neutral-200 uppercase tracking-widest">{project.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Client</span>
              <span className="text-neutral-200 uppercase tracking-widest">Aura Films Ltd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Role</span>
              <span className="text-neutral-200 uppercase tracking-widest">Director & Editor</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Lenses</span>
              <span className="text-neutral-200 uppercase tracking-widest">Anamorphic 35mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500 uppercase tracking-wider">Sound Mix</span>
              <span className="text-neutral-200 uppercase tracking-widest">Dolby Atmos 7.1</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors duration-300 text-xs uppercase tracking-widest font-sans cursor-pointer focus:outline-none"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500 animate-scale" />
                  <span className="text-green-500">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Work</span>
                </>
              )}
            </button>
          </div>
        </FadeIn>
      </section>

      {/* 3. CINEMATIC VIDEO TRAILER SECTION */}
      {project.video_url && (
        <section className="py-20 bg-[#030303] border-b border-white/5 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <FadeIn direction="up" className="space-y-2">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                SCREENING ROOM
              </span>
              <h2 className="font-serif font-light text-3xl md:text-4xl tracking-wide text-white">
                Official <span className="italic">Trailer</span>
              </h2>
            </FadeIn>

            {/* Premium Video Wrapper */}
            <FadeIn direction="up" className="relative w-full aspect-video bg-[#0a0a0a] overflow-hidden border border-white/5 group">
              <video
                ref={videoRef}
                className="w-full h-full object-cover scale-[1.005]"
                src={project.video_url}
                playsInline
                loop
                onClick={togglePlay}
              />

              {/* Central Large Play button trigger when paused */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-500 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="p-6 bg-brand-gold text-black rounded-full"
                  >
                    <Play className="w-8 h-8 fill-black" />
                  </motion.div>
                </div>
              )}

              {/* Controls bar inside video overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 glass-panel rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={togglePlay}
                  className="p-2 hover:bg-white/10 rounded-full text-foreground/80 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                
                <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 font-light">
                  {project.title} &mdash; Cinematic Trailer
                </span>

                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded-full text-foreground/80 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 4. PRODUCTION STILLS / GALLERY SECTION */}
      {gallery && gallery.length > 0 && (
        <section className="py-20 bg-black border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-8">
            <FadeIn direction="up" className="space-y-2">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand-gold font-medium">
                PRODUCTION STILLS
              </span>
              <h2 className="font-serif font-light text-3xl md:text-4xl tracking-wide text-white">
                Frame <span className="italic">Stills</span>
              </h2>
            </FadeIn>
            <div className="flex space-x-3">
              <button
                onClick={() => scrollGallery("left")}
                className="p-3 border border-white/10 hover:border-brand-gold text-neutral-400 hover:text-brand-gold transition-colors duration-300 rounded-none cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollGallery("right")}
                className="p-3 border border-white/10 hover:border-brand-gold text-neutral-400 hover:text-brand-gold transition-colors duration-300 rounded-none cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-6 px-6 md:px-12 py-4 snap-x snap-mandatory"
          >
            {gallery.map((imgUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setActiveImage(imgUrl)}
                className="flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[30vw] aspect-[16/10] bg-[#0c0c0c] border border-white/5 overflow-hidden group cursor-pointer snap-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={`Production frame ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. NEXT PROJECT TEASER PREVIEW */}
      {nextProject && (
        <section className="pt-24 pb-12 w-full text-center bg-[#050505]">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-semibold block">
              UP NEXT
            </span>
            <Link href={`/projects/${nextProject.slug}`} className="group inline-block space-y-4 focus:outline-none">
              <h2 className="font-serif font-light text-4xl md:text-7xl text-neutral-400 group-hover:text-brand-gold transition-colors duration-500 tracking-tight leading-none">
                {nextProject.title}
              </h2>
              <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors duration-300 font-sans">
                <span>View project case study</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* 6. LIGHTBOX MODAL DIALOG FOR STILLS */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveImage(null)}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-3 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
              title="Close Image Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage}
                alt="Production frame high res"
                className="max-w-full max-h-full object-contain shadow-2xl border border-white/5"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
