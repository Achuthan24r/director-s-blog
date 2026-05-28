"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Menu, X, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/mail", label: "Newsletter" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on path change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-navbar py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3 focus:outline-none">
            <Film className="w-5 h-5 text-brand-gold group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-sans font-light text-base tracking-[0.25em] uppercase text-foreground group-hover:text-brand-gold transition-colors duration-300">
              Alistair Vance
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-2 font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Admin Access Indicator */}
            <Link
              href="/admin/dashboard"
              className="p-2 text-neutral-500 hover:text-brand-gold transition-colors duration-300"
              title="Admin Panel"
            >
              <ShieldAlert className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Hamburg Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-foreground focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xl uppercase tracking-[0.2em] font-light transition-colors duration-300",
                      isActive ? "text-brand-gold font-medium" : "text-neutral-400 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/admin/dashboard"
                className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-brand-gold transition-colors duration-300 pt-6 border-t border-white/5 w-24 text-center"
              >
                Admin
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
