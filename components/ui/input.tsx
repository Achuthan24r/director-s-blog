import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex w-full bg-neutral-950/40 border-b border-white/10 px-0 py-3 text-sm text-foreground placeholder:text-neutral-500 focus:border-brand-gold focus:outline-none transition-all duration-300 font-sans tracking-wide",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
