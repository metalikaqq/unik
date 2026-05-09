import type { ButtonHTMLAttributes, Ref } from "react";

import { cn } from "@/lib/cn";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  ref?: Ref<HTMLButtonElement>;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-bg",
  secondary: "bg-bg text-fg border border-fg hover:bg-fg hover:text-bg",
  ghost: "bg-transparent text-fg hover:text-accent",
};

export function Button({
  size = "md",
  variant = "primary",
  type,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center font-display font-medium uppercase tracking-wide transition-colors",
        "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
