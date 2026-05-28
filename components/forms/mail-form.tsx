"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/lib/actions/forms";

export function MailForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(res.error || "Subscription failed. Please try again.");
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
        className="space-y-4 text-center py-6"
      >
        <div className="mx-auto w-12 h-12 bg-gold-950/20 border border-brand-gold/40 rounded-full flex items-center justify-center text-brand-gold">
          <Check className="w-5 h-5 animate-scale" />
        </div>
        <h3 className="font-serif font-light text-2xl text-white tracking-wide">
          Access Granted
        </h3>
        <p className="font-sans text-xs text-neutral-400 font-light max-w-xs mx-auto leading-relaxed">
          Welcome to the Club Room. A verification token has been logged to your address. You will receive Alistair&apos;s private updates.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="mail-email" className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 block">
          Enter email address
        </label>
        <Input
          id="mail-email"
          name="email"
          type="email"
          required
          placeholder="your.email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="text-center"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center justify-center space-x-2 text-xs text-red-500 bg-red-950/20 border border-red-500/20 p-4 rounded-none">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="gold"
        size="md"
        className="w-full justify-center space-x-2.5 cursor-pointer"
        disabled={status === "submitting"}
      >
        <span>{status === "submitting" ? "Requesting Access..." : "Request Access"}</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}
