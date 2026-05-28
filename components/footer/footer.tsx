"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Youtube } from "lucide-react";
import { subscribeNewsletter } from "@/lib/actions/forms";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setEmail("");
        setMessage("Thank you for subscribing.");
      } else {
        setStatus("error");
        setMessage(res.error || "Subscription failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Spec */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-sans text-lg tracking-[0.2em] uppercase text-brand-gold">
              Alistair Vance
            </h3>
            <p className="font-sans text-neutral-400 text-sm font-light max-w-sm leading-relaxed">
              Crafting premium cinematic experiences, narrative films, and iconic commercial campaigns. Available for worldwide bookings and creative direction.
            </p>
            <div className="flex items-center space-x-6 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-500 hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-500 hover:text-white transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-500 hover:text-white transition-colors duration-300 font-sans text-xs tracking-wider uppercase font-semibold"
              >
                Vimeo
              </a>
              <a
                href="https://imdb.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-500 hover:text-white transition-colors duration-300 font-sans text-xs tracking-wider uppercase font-semibold"
              >
                IMDb
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-neutral-500">
              Sitemap
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/projects" className="text-sm font-light text-neutral-400 hover:text-white transition-colors duration-300">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-light text-neutral-400 hover:text-white transition-colors duration-300">
                  About Biography
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-light text-neutral-400 hover:text-white transition-colors duration-300">
                  Contact Agency
                </Link>
              </li>
              <li>
                <Link href="/mail" className="text-sm font-light text-neutral-400 hover:text-white transition-colors duration-300">
                  Vance Club Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Box */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-neutral-500">
              Vance Club Room
            </h4>
            <p className="font-sans text-neutral-400 text-sm font-light leading-relaxed">
              Subscribe to receive private advance updates and cinematic releases.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/5 py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-brand-gold transition-colors duration-300 font-sans"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1.5 top-1.5 p-2 bg-transparent text-brand-gold hover:text-white transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                title="Submit Newsletter"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
            {message && (
              <p className={`text-xs ${status === "success" ? "text-green-500" : "text-red-500"} mt-2`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Horizontal Splitter */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="font-sans text-xs font-light text-neutral-600">
            &copy; {new Date().getFullYear()} ALISTAIR VANCE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-sans text-xs font-light text-neutral-600 tracking-wider">
            MADE WITH LUXURY CRAFTSMANSHIP
          </p>
        </div>
      </div>
    </footer>
  );
}
