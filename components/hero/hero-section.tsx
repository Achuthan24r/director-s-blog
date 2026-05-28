"use client";

import * as React from "react";
import { Volume2, VolumeX, Play, Pause, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToContent = () => {
    const featuredSection = document.getElementById("featured-projects");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Autoplay Ambient Cinematic Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000 scale-[1.03]"
        src="https://assets.mixkit.co/videos/preview/mixkit-dramatic-dark-clouds-over-mountains-41761-large.mp4"
      />

      {/* Cinematic Radial Overlay to vignetting edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-brand-gold font-medium block">
            CINEMATIC FILMMAKER & DIRECTOR
          </span>
          <h1 className="font-serif font-light text-5xl md:text-8xl tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Capturing the <span className="italic font-normal">Soul</span> of light and space
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <button
            onClick={scrollToContent}
            className="group px-8 py-4 bg-transparent border border-white/20 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500 font-sans cursor-pointer"
          >
            Explore Selected Works
          </button>
        </motion.div>
      </div>

      {/* Hero Controls */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 flex items-center space-x-4">
        {/* Play/Pause control */}
        <button
          onClick={togglePlay}
          className="p-3 bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-foreground/80 hover:text-white transition-all duration-300 cursor-pointer"
          title={isPlaying ? "Pause Trailer" : "Play Trailer"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Volume controls */}
        <button
          onClick={toggleMute}
          className="p-3 bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-foreground/80 hover:text-white transition-all duration-300 cursor-pointer"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.button
          onClick={scrollToContent}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
          title="Scroll Down"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
}
