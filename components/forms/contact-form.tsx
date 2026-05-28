"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/lib/actions/forms";

export function ContactForm() {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(res.error || "Submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("An unexpected error occurred. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 text-center space-y-4 rounded-none border-brand-gold/30"
      >
        <div className="mx-auto w-12 h-12 bg-green-950/40 border border-green-500/40 rounded-full flex items-center justify-center text-green-400">
          <Check className="w-5 h-5 animate-scale" />
        </div>
        <h3 className="font-serif font-light text-2xl text-white tracking-wide">
          Transmission Received
        </h3>
        <p className="font-sans text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. Alistair&apos;s team will review your project specs and respond within 48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-sans text-[10px] uppercase tracking-widest text-brand-gold hover:text-white transition-colors duration-300 pt-2 cursor-pointer focus:outline-none"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="name" className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
          Full Name / Production Agency
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="e.g. Alistair Vance Productions"
          value={formData.name}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="e.g. contact@agency.com"
          value={formData.email}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
          Project Details / Inquiry Specs
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Describe your film production, aspect ratio goals, budget parameters, and scheduling range..."
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center space-x-2 text-xs text-red-500 bg-red-950/20 border border-red-500/20 p-4 rounded-none">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full justify-center space-x-2.5 cursor-pointer disabled:opacity-50"
        disabled={status === "submitting"}
      >
        <span>{status === "submitting" ? "Transmitting..." : "Send Transmission"}</span>
        <Send className="w-3.5 h-3.5" />
      </Button>
    </form>
  );
}
