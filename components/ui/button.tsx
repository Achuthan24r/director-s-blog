import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-none font-sans font-medium tracking-wider uppercase transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          // Variants
          {
            "bg-foreground text-background hover:bg-neutral-200": variant === "primary",
            "bg-transparent text-foreground border border-foreground/30 hover:border-foreground hover:bg-foreground/5": variant === "secondary",
            "bg-white/5 backdrop-blur-md text-foreground border border-white/10 hover:bg-white/10 hover:border-white/20": variant === "glass",
            "border border-transparent bg-transparent text-foreground hover:text-white relative overflow-hidden before:absolute before:inset-0 before:translate-x-[-100%] before:bg-white/5 before:transition-transform before:duration-500 hover:before:translate-x-0": variant === "outline",
            "bg-transparent text-brand-gold border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5": variant === "gold",
          },
          // Sizes
          {
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
